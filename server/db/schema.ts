// Database schema for contact submissions
// You can use this with Prisma, Drizzle, or any ORM

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  source?: string; // 'website', 'mobile', etc.
}

// Example Prisma schema (add to prisma/schema.prisma):
/*
model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String   @db.Text
  status    ContactStatus @default(NEW)
  priority  Priority @default(MEDIUM)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  source    String?

  @@map("contact_submissions")
}

enum ContactStatus {
  NEW
  READ
  REPLIED
  CLOSED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
*/
