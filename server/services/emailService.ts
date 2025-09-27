import nodemailer from 'nodemailer';
import { ContactRequest } from '@shared/api';

// Email service configuration
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create transporter with SMTP configuration
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // For Gmail, you might need these additional settings
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  // Send contact form email
  async sendContactEmail(data: ContactRequest): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
      throw new Error('ADMIN_EMAIL environment variable is not set');
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('SMTP credentials are not configured');
    }

    // Email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            📧 New Contact Form Submission
          </h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #555; margin-bottom: 10px;">Contact Details:</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #007bff;">${data.email}</a></p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; border-radius: 5px;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This email was sent from your website contact form at ${new Date().toLocaleString()}</p>
            <p>Website: ${process.env.WEBSITE_URL || 'localhost'}</p>
          </div>
        </div>
      </div>
    `;

    const textContent = `
New Contact Form Submission

Contact Details:
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This email was sent from your website contact form at ${new Date().toLocaleString()}
Website: ${process.env.WEBSITE_URL || 'localhost'}
    `;

    // Send email
    await this.transporter.sendMail({
      from: `"${data.name}" <${process.env.SMTP_USER}>`, // sender address
      to: adminEmail, // your email address
      replyTo: data.email, // reply to the person who sent the message
      subject: `🌐 ${data.subject}`, // subject line
      text: textContent, // plain text body
      html: htmlContent, // html body
    });

    console.log(`✅ Email sent successfully to ${adminEmail}`);
  }

  // Test email configuration
  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('✅ SMTP connection verified successfully');
      return true;
    } catch (error) {
      console.error('❌ SMTP connection failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
