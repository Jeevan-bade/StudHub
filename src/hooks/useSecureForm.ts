import { useState, useCallback } from 'react';
import { z } from 'zod';
import { sanitizeText, formSubmissionLimiter } from '@/lib/security';
import { useToast } from '@/hooks/use-toast';

export interface UseSecureFormOptions<T> {
  schema: z.ZodSchema<T>;
  rateLimitKey: string;
  onSubmit: (data: T) => void | Promise<void>;
  sanitizeFields?: (keyof T)[];
}

export function useSecureForm<T extends Record<string, any>>({
  schema,
  rateLimitKey,
  onSubmit,
  sanitizeFields = []
}: UseSecureFormOptions<T>) {
  const [data, setData] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateField = useCallback((field: keyof T, value: any) => {
    setData(prev => ({
      ...prev,
      [field]: sanitizeFields.includes(field) ? sanitizeText(String(value)) : value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  }, [errors, sanitizeFields]);

  const validate = useCallback(() => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof T, string>> = {};
        error.errors.forEach(err => {
          if (err.path.length > 0) {
            const field = err.path[0] as keyof T;
            fieldErrors[field] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  }, [data, schema]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    // Rate limiting check
    if (!formSubmissionLimiter.isAllowed(rateLimitKey)) {
      toast({
        title: "Too Many Attempts",
        description: "Please wait before submitting again.",
        variant: "destructive"
      });
      return;
    }

    if (!validate()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(data as T);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while submitting the form.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [data, onSubmit, rateLimitKey, toast, validate]);

  const reset = useCallback(() => {
    setData({});
    setErrors({});
    setIsSubmitting(false);
  }, []);

  return {
    data,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
    validate,
    reset
  };
}