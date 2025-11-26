import * as React from "react";
import { cn } from "@/lib/utils";
import { sanitizeText } from "@/lib/security";

export interface SecureTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  sanitize?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

const SecureTextarea = React.forwardRef<HTMLTextAreaElement, SecureTextareaProps>(
  ({ className, sanitize = true, maxLength, showCharCount = false, onChange, value, ...props }, ref) => {
    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
      let newValue = event.target.value;
      
      // Apply sanitization
      if (sanitize) {
        newValue = sanitizeText(newValue);
      }
      
      // Apply max length
      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.substring(0, maxLength);
      }
      
      // Create new event with sanitized value
      const sanitizedEvent = {
        ...event,
        target: {
          ...event.target,
          value: newValue
        }
      };
      
      onChange?.(sanitizedEvent);
    }, [maxLength, onChange, sanitize]);

    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="space-y-1">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
        {showCharCount && maxLength && (
          <p className={cn(
            "text-xs",
            currentLength > maxLength * 0.9 ? "text-warning" : "text-muted-foreground"
          )}>
            {currentLength}/{maxLength} characters
          </p>
        )}
      </div>
    );
  }
);

SecureTextarea.displayName = "SecureTextarea";

export { SecureTextarea };