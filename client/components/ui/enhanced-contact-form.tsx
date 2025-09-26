import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedContactFormProps {
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
}

export function EnhancedContactForm({ 
  onSubmit, 
  isSubmitting, 
  submitSuccess, 
  submitError 
}: EnhancedContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot field
  });
  
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [charCounts, setCharCounts] = useState({ subject: 0, message: 0 });
  const formRef = useRef<HTMLFormElement>(null);

  // Real-time validation
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 100) return 'Name is too long';
        if (!/^[a-zA-Z\s\-'\.]+$/.test(value)) return 'Name contains invalid characters';
        return '';
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
        if (value.length > 254) return 'Email is too long';
        return '';
      case 'subject':
        if (value.length < 5) return 'Subject must be at least 5 characters';
        if (value.length > 200) return 'Subject is too long';
        return '';
      case 'message':
        if (value.length < 10) return 'Message must be at least 10 characters';
        if (value.length > 2000) return 'Message is too long';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update character counts
    if (name === 'subject' || name === 'message') {
      setCharCounts(prev => ({ ...prev, [name]: value.length }));
    }
    
    // Real-time validation
    const error = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'website') { // Skip honeypot
        const error = validateField(key, value);
        if (error) errors[key] = error;
      }
    });

    // Check honeypot
    if (formData.website) {
      console.warn('Honeypot triggered - possible bot submission');
      return;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    await onSubmit(formData);
    
    if (submitSuccess) {
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      setCharCounts({ subject: 0, message: 0 });
      setFieldErrors({});
    }
  };

  const isFormValid = Object.values(fieldErrors).every(error => !error) &&
    formData.name && formData.email && formData.subject && formData.message;

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <div className={cn("w-2 h-2 rounded-full", 
          formData.name && formData.email ? "bg-green-500" : "bg-gray-300"
        )} />
        <span>Contact Info</span>
        <div className={cn("w-2 h-2 rounded-full", 
          formData.subject ? "bg-green-500" : "bg-gray-300"
        )} />
        <span>Subject</span>
        <div className={cn("w-2 h-2 rounded-full", 
          formData.message.length >= 10 ? "bg-green-500" : "bg-gray-300"
        )} />
        <span>Message</span>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Status Messages */}
        {submitSuccess && (
          <div className="flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <span>Thank you! Your message has been sent successfully.</span>
          </div>
        )}

        {submitError && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Form Fields */}
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            label="Name"
            name="name"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            error={fieldErrors.name}
            required
            disabled={isSubmitting}
            placeholder="John Doe"
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            error={fieldErrors.email}
            required
            disabled={isSubmitting}
            placeholder="john@company.com"
          />
        </div>

        <FormField
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={(value) => handleInputChange('subject', value)}
          error={fieldErrors.subject}
          required
          disabled={isSubmitting}
          placeholder="What can we help you with?"
          maxLength={200}
          showCharCount
          charCount={charCounts.subject}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-foreground/80">
              Message <span className="text-red-500">*</span>
            </label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="text-xs"
            >
              {showPreview ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>

          {showPreview ? (
            <div className="min-h-[120px] p-4 border rounded-lg bg-muted/50">
              <div className="whitespace-pre-wrap text-sm">
                {formData.message || 'Your message will appear here...'}
              </div>
            </div>
          ) : (
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              disabled={isSubmitting}
              className={cn(
                "w-full min-h-[120px] rounded-lg border border-border bg-background/80",
                "focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors",
                "disabled:opacity-60 disabled:cursor-not-allowed px-4 py-3",
                fieldErrors.message && "border-red-500"
              )}
              placeholder="Tell us about your project, requirements, timeline, etc..."
              maxLength={2000}
            />
          )}

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{fieldErrors.message}</span>
            <span>{charCounts.message}/2000</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-4">
          <div className="text-xs text-muted-foreground">
            We'll respond within 24 hours
          </div>
          
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="min-w-[140px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Reusable form field component
interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  showCharCount?: boolean;
  charCount?: number;
}

function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required,
  disabled,
  placeholder,
  maxLength,
  showCharCount,
  charCount
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-foreground/80">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cn(
          "w-full rounded-lg border border-border bg-background/80 px-4 py-2.5",
          "focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          error && "border-red-500"
        )}
      />
      
      <div className="flex justify-between text-xs">
        <span className="text-red-500">{error}</span>
        {showCharCount && maxLength && (
          <span className="text-muted-foreground">{charCount}/{maxLength}</span>
        )}
      </div>
    </div>
  );
}
