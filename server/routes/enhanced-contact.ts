import { RequestHandler } from "express";
import { ContactRequest, ContactResponse } from "@shared/api";
import { ContactService } from "../services/contactService";
import { createEmailService } from "../services/emailService";
import { 
  rateLimit, 
  secureContactSchema, 
  detectSpam, 
  validateHoneypot,
  sanitizeInput,
  getLocationFromIP
} from "../middleware/security";

// Apply rate limiting: 5 requests per 15 minutes
export const contactRateLimit = rateLimit(5, 15 * 60 * 1000);

export const handleEnhancedContact: RequestHandler = async (req, res) => {
  try {
    // Validate request body with enhanced schema
    const validatedData = secureContactSchema.parse(req.body);
    
    // Check honeypot field
    if (!validateHoneypot(validatedData.website)) {
      console.warn('Honeypot triggered - possible bot submission');
      return res.status(400).json({
        success: false,
        message: "Invalid submission detected."
      } as ContactResponse);
    }

    // Sanitize inputs
    const sanitizedData: ContactRequest = {
      name: sanitizeInput(validatedData.name),
      email: sanitizeInput(validatedData.email),
      subject: sanitizeInput(validatedData.subject),
      message: sanitizeInput(validatedData.message),
    };

    // Spam detection
    const spamCheck = detectSpam(sanitizedData);
    if (spamCheck.isSpam) {
      console.warn('Spam detected:', spamCheck.reasons);
      
      // Still save to database but mark as spam
      await ContactService.saveContact(sanitizedData, {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        source: 'website_spam'
      });

      // Return success to avoid revealing spam detection
      return res.status(200).json({
        success: true,
        message: "Thank you for your message! We'll review it shortly."
      } as ContactResponse);
    }

    // Get additional metadata
    const location = await getLocationFromIP(req.ip || '');
    
    // Save to database
    const submission = await ContactService.saveContact(sanitizedData, {
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      source: 'website',
      ...location
    });

    // Send email notifications
    const emailService = createEmailService();
    
    // Send notification to admin (don't wait for it)
    emailService.sendContactNotification(sanitizedData, submission.id)
      .catch(error => console.error('Admin notification failed:', error));
    
    // Send confirmation to user (don't wait for it)
    emailService.sendConfirmationEmail(sanitizedData)
      .catch(error => console.error('User confirmation failed:', error));

    // Log successful submission
    console.log(`📧 Contact received from ${sanitizedData.name} (${sanitizedData.email}) - ID: ${submission.id}`);

    const response: ContactResponse = {
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
      id: submission.id,
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error("Enhanced contact form error:", error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      // Validation error
      const response: ContactResponse = {
        success: false,
        message: "Please check your input and try again.",
      };
      res.status(400).json(response);
    } else {
      // Server error
      const response: ContactResponse = {
        success: false,
        message: "Sorry, there was an error processing your message. Please try again later.",
      };
      res.status(500).json(response);
    }
  }
};

// Admin endpoint to view contact submissions
export const getContactSubmissions: RequestHandler = async (req, res) => {
  try {
    const { status, priority, limit } = req.query;
    
    const submissions = await ContactService.getContacts({
      status: status as any,
      priority: priority as any,
      limit: limit ? parseInt(limit as string) : undefined
    });

    res.json({
      success: true,
      data: submissions,
      stats: ContactService.getStats()
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact submissions"
    });
  }
};

// Admin endpoint to update contact status
export const updateContactStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updated = await ContactService.updateContactStatus(id, status);
    
    if (updated) {
      res.json({ success: true, message: "Status updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Contact not found" });
    }
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update contact status"
    });
  }
};
