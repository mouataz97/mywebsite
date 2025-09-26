import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Rate limiting store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(maxRequests: number = 5, windowMs: number = 15 * 60 * 1000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    
    const clientData = rateLimitStore.get(clientId);
    
    if (!clientData || now > clientData.resetTime) {
      rateLimitStore.set(clientId, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    if (clientData.count >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
      });
    }
    
    clientData.count++;
    next();
  };
}

// CAPTCHA verification (integrate with Google reCAPTCHA)
export async function verifyCaptcha(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY not configured, skipping verification');
    return true; // Skip in development
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    });

    const data = await response.json();
    return data.success && data.score > 0.5; // Adjust threshold as needed
  } catch (error) {
    console.error('CAPTCHA verification failed:', error);
    return false;
  }
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

// Spam detection
export function detectSpam(data: { name: string; email: string; message: string }): {
  isSpam: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  
  // Check for suspicious patterns
  const spamKeywords = [
    'viagra', 'casino', 'lottery', 'winner', 'congratulations',
    'click here', 'free money', 'guaranteed', 'no risk'
  ];
  
  const text = `${data.name} ${data.message}`.toLowerCase();
  
  // Keyword detection
  const foundSpamWords = spamKeywords.filter(keyword => text.includes(keyword));
  if (foundSpamWords.length > 0) {
    reasons.push(`Contains spam keywords: ${foundSpamWords.join(', ')}`);
  }
  
  // Excessive links
  const linkCount = (data.message.match(/https?:\/\/\S+/g) || []).length;
  if (linkCount > 3) {
    reasons.push('Too many links');
  }
  
  // Excessive caps
  const capsPercentage = (data.message.match(/[A-Z]/g) || []).length / data.message.length;
  if (capsPercentage > 0.5 && data.message.length > 20) {
    reasons.push('Excessive capital letters');
  }
  
  // Repeated characters
  if (/(.)\1{4,}/.test(data.message)) {
    reasons.push('Repeated characters');
  }
  
  // Email domain check
  const suspiciousDomains = ['tempmail', '10minutemail', 'guerrillamail'];
  if (suspiciousDomains.some(domain => data.email.includes(domain))) {
    reasons.push('Suspicious email domain');
  }
  
  return {
    isSpam: reasons.length > 0,
    reasons
  };
}

// Honeypot field validation
export function validateHoneypot(honeypotValue: any): boolean {
  // Honeypot should be empty (filled by bots)
  return !honeypotValue || honeypotValue === '';
}

// Enhanced validation schema with security
export const secureContactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s\-'\.]+$/, "Name contains invalid characters"),
  
  email: z.string()
    .email("Invalid email address")
    .max(254, "Email too long")
    .refine(email => !email.includes('+'), "Email aliases not allowed"),
  
  subject: z.string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject too long"),
  
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message too long"),
  
  // Optional honeypot field
  website: z.string().optional(),
  
  // Optional CAPTCHA token
  captchaToken: z.string().optional(),
});

// IP geolocation for additional context
export async function getLocationFromIP(ip: string): Promise<{
  country?: string;
  region?: string;
  city?: string;
}> {
  try {
    // Use a free IP geolocation service
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    
    if (data.status === 'success') {
      return {
        country: data.country,
        region: data.regionName,
        city: data.city
      };
    }
  } catch (error) {
    console.error('IP geolocation failed:', error);
  }
  
  return {};
}
