import { RequestHandler } from "express";
import { ContactRequest, ContactResponse } from "@shared/api";
import { z } from "zod";

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
    const validatedData = contactSchema.parse(req.body);
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email to user
    
    // For demo purposes, we'll simulate processing
    const contactId = `contact_${Date.now()}`;
    
    // Simulate email sending (replace with actual email service)
    await simulateEmailSending(validatedData);
    
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

// Simulate email sending - replace with actual email service
async function simulateEmailSending(data: ContactRequest): Promise<void> {
  // In a real application, you would use services like:
  // - Nodemailer with SMTP
  // - SendGrid
  // - AWS SES
  // - Mailgun
  // - Resend
  
  console.log("📧 Simulating email send:");
  console.log(`From: ${data.name} <${data.email}>`);
  console.log(`Subject: ${data.subject}`);
  console.log(`Message: ${data.message}`);
  
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
}
