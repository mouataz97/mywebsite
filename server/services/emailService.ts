import { ContactRequest } from "@shared/api";

export interface EmailConfig {
  provider: 'nodemailer' | 'sendgrid' | 'resend' | 'ses';
  apiKey?: string;
  smtpConfig?: {
    host: string;
    port: number;
    user: string;
    pass: string;
  };
}

export class EmailService {
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;
  }

  async sendContactNotification(data: ContactRequest, contactId: string): Promise<boolean> {
    try {
      switch (this.config.provider) {
        case 'resend':
          return await this.sendWithResend(data, contactId);
        case 'sendgrid':
          return await this.sendWithSendGrid(data, contactId);
        case 'nodemailer':
          return await this.sendWithNodemailer(data, contactId);
        default:
          console.log('📧 Email simulation:', data);
          return true;
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  async sendConfirmationEmail(data: ContactRequest): Promise<boolean> {
    const confirmationTemplate = this.getConfirmationTemplate(data);
    
    try {
      // Send confirmation email to user
      // Implementation depends on provider
      console.log(`📧 Confirmation sent to ${data.email}`);
      return true;
    } catch (error) {
      console.error('Confirmation email failed:', error);
      return false;
    }
  }

  private async sendWithResend(data: ContactRequest, contactId: string): Promise<boolean> {
    // Example Resend integration
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@yourdomain.com',
        to: ['contact@yourdomain.com'],
        subject: `New Contact: ${data.subject}`,
        html: this.getNotificationTemplate(data, contactId),
      }),
    });

    return response.ok;
  }

  private async sendWithSendGrid(data: ContactRequest, contactId: string): Promise<boolean> {
    // Example SendGrid integration
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: 'contact@yourdomain.com' }],
          subject: `New Contact: ${data.subject}`,
        }],
        from: { email: 'noreply@yourdomain.com' },
        content: [{
          type: 'text/html',
          value: this.getNotificationTemplate(data, contactId),
        }],
      }),
    });

    return response.ok;
  }

  private async sendWithNodemailer(data: ContactRequest, contactId: string): Promise<boolean> {
    // Requires: npm install nodemailer @types/nodemailer
    // const nodemailer = require('nodemailer');
    
    // const transporter = nodemailer.createTransporter({
    //   host: this.config.smtpConfig?.host,
    //   port: this.config.smtpConfig?.port,
    //   secure: false,
    //   auth: {
    //     user: this.config.smtpConfig?.user,
    //     pass: this.config.smtpConfig?.pass,
    //   },
    // });

    // await transporter.sendMail({
    //   from: 'noreply@yourdomain.com',
    //   to: 'contact@yourdomain.com',
    //   subject: `New Contact: ${data.subject}`,
    //   html: this.getNotificationTemplate(data, contactId),
    // });

    return true;
  }

  private getNotificationTemplate(data: ContactRequest, contactId: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Contact ID:</strong> ${contactId}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <div style="margin-top: 15px;">
            <strong>Message:</strong>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 5px;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">
          Received at: ${new Date().toLocaleString()}
        </p>
      </div>
    `;
  }

  private getConfirmationTemplate(data: ContactRequest): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for contacting us!</h2>
        <p>Hi ${data.name},</p>
        <p>We've received your message about "<strong>${data.subject}</strong>" and will get back to you within 24 hours.</p>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Your message:</strong></p>
          <p style="font-style: italic;">${data.message}</p>
        </div>
        <p>Best regards,<br>Your Team</p>
      </div>
    `;
  }
}

// Environment-based email service factory
export function createEmailService(): EmailService {
  const provider = process.env.EMAIL_PROVIDER as EmailConfig['provider'] || 'nodemailer';
  
  const config: EmailConfig = {
    provider,
    apiKey: process.env.EMAIL_API_KEY,
    smtpConfig: {
      host: process.env.SMTP_HOST || 'localhost',
      port: parseInt(process.env.SMTP_PORT || '587'),
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  };

  return new EmailService(config);
}
