import { ContactRequest, ContactResponse } from "@shared/api";
import { ContactSubmission } from "../db/schema";

// Enhanced contact service with database integration
export class ContactService {
  // In-memory storage for demo (replace with actual database)
  private static submissions: ContactSubmission[] = [];

  static async saveContact(data: ContactRequest, metadata: {
    ipAddress?: string;
    userAgent?: string;
    source?: string;
  }): Promise<ContactSubmission> {
    const submission: ContactSubmission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'new',
      priority: this.determinePriority(data),
      createdAt: new Date(),
      updatedAt: new Date(),
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
      source: metadata.source || 'website',
    };

    // Save to database (replace with actual DB call)
    this.submissions.push(submission);
    
    return submission;
  }

  static async getContacts(filters?: {
    status?: ContactSubmission['status'];
    priority?: ContactSubmission['priority'];
    limit?: number;
  }): Promise<ContactSubmission[]> {
    let filtered = [...this.submissions];

    if (filters?.status) {
      filtered = filtered.filter(s => s.status === filters.status);
    }
    if (filters?.priority) {
      filtered = filtered.filter(s => s.priority === filters.priority);
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (filters?.limit) {
      filtered = filtered.slice(0, filters.limit);
    }

    return filtered;
  }

  static async updateContactStatus(id: string, status: ContactSubmission['status']): Promise<boolean> {
    const submission = this.submissions.find(s => s.id === id);
    if (submission) {
      submission.status = status;
      submission.updatedAt = new Date();
      return true;
    }
    return false;
  }

  private static determinePriority(data: ContactRequest): ContactSubmission['priority'] {
    const urgentKeywords = ['urgent', 'asap', 'emergency', 'critical', 'important'];
    const highValueKeywords = ['enterprise', 'large', 'million', 'budget'];
    
    const text = `${data.subject} ${data.message}`.toLowerCase();
    
    if (urgentKeywords.some(keyword => text.includes(keyword))) {
      return 'high';
    }
    if (highValueKeywords.some(keyword => text.includes(keyword))) {
      return 'high';
    }
    
    return 'medium';
  }

  static getStats() {
    const total = this.submissions.length;
    const byStatus = this.submissions.reduce((acc, sub) => {
      acc[sub.status] = (acc[sub.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const recent = this.submissions.filter(
      s => s.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length;

    return { total, byStatus, recent };
  }
}
