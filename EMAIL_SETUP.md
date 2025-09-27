# 📧 Email Configuration Guide

Your contact form is now configured to send real emails! Follow these steps to set it up:

## 🚀 Quick Setup

### Step 1: Configure Your Email Settings

Edit the `.env` file and replace the placeholder values:

```env
# Your email address (where you want to receive contact messages)
ADMIN_EMAIL=your-actual-email@gmail.com

# SMTP Settings (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-actual-email@gmail.com
SMTP_PASS=your-app-password
```

### Step 2: Gmail Setup (Recommended)

If you're using Gmail, you need to create an **App Password**:

1. **Enable 2-Factor Authentication** on your Gmail account
2. Go to [Google Account Settings](https://myaccount.google.com/)
3. Navigate to **Security** → **2-Step Verification** → **App passwords**
4. Generate a new app password for "Mail"
5. Use this 16-character password in `SMTP_PASS`

### Step 3: Alternative Email Providers

#### **Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

#### **Yahoo:**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

#### **Custom SMTP:**
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=contact@yourdomain.com
SMTP_PASS=your-password
```

## 🧪 Testing

1. **Restart your development server:**
   ```bash
   # Stop the current server (Ctrl+C)
   pnpm dev
   ```

2. **Submit a test message** through your contact form

3. **Check your email** - you should receive a beautifully formatted email!

## 📧 What You'll Receive

When someone submits the contact form, you'll get an email with:

- ✅ **Sender's name and email**
- ✅ **Subject line**
- ✅ **Full message content**
- ✅ **Timestamp**
- ✅ **Reply-to functionality** (click reply to respond directly)
- ✅ **Beautiful HTML formatting**

## 🔧 Troubleshooting

### Common Issues:

1. **"SMTP connection failed"**
   - Check your email credentials
   - Ensure 2FA is enabled for Gmail
   - Verify the SMTP settings

2. **"Authentication failed"**
   - Use App Password instead of regular password
   - Double-check username/password

3. **"Connection timeout"**
   - Check firewall settings
   - Try different SMTP ports (465 for SSL)

### Test Connection:

The system will automatically test the SMTP connection when starting. Look for:
- ✅ `SMTP connection verified successfully`
- ❌ `SMTP connection failed: [error details]`

## 🔒 Security Notes

- ✅ **App passwords** are more secure than regular passwords
- ✅ **Environment variables** keep credentials safe
- ✅ **Reply-to headers** allow direct responses
- ✅ **HTML sanitization** prevents injection attacks

## 🎯 Production Deployment

For production, consider:

1. **SendGrid** or **Mailgun** for better deliverability
2. **Rate limiting** to prevent spam
3. **CAPTCHA** for additional protection
4. **Database logging** of all submissions

Your contact form is now ready to receive real emails! 🎉
