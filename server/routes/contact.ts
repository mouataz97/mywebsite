import { RequestHandler } from "express";
import { ContactRequest, ContactResponse } from "@shared/api";
import { z } from "zod";
import { emailService } from "../services/emailService";

// Validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

export const handleContact: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const validatedData = contactSchema.parse(req.body) as ContactRequest;
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email to user
    
    // For demo purposes, we'll simulate processing
    const contactId = `contact_${Date.now()}`;
    
    // Send actual email using email service
    await emailService.sendContactEmail(validatedData);
    
    const response: ContactResponse = {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      id: contactId,
    };
    
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Validation error
      const response: ContactResponse = {
        success: false,
        message: error.errors.map(e => e.message).join(", "),
      };
      res.status(400).json(response);
    } else {
      // Server error
      console.error("Contact form error:", error);
      const response: ContactResponse = {
        success: false,
        message: "Sorry, there was an error processing your message. Please try again later.",
      };
      res.status(500).json(response);
    }
  }
};

