import * as React from "react";
import { cn } from "@/lib/utils";
import { sanitizeText } from "@/lib/security";

export interface SecureInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  sanitize?: boolean;
  maxLength?: number;
  allowedChars?: RegExp;
}

const SecureInput = React.forwardRef<HTMLInputElement, SecureInputProps>(
  ({ className, type, sanitize = true, allowedChars, onChange, ...props }, ref) => {
    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      
      // Apply character restrictions
      if (allowedChars) {
        value = value.replace(allowedChars, '');
      }
      
      // Apply sanitization
      if (sanitize && type !== 'password') {
        value = sanitizeText(value);
      }
      
      // Create new event with sanitized value
      const sanitizedEvent = {
        ...event,
        target: {
          ...event.target,
          value
        }
      };
      
      onChange?.(sanitizedEvent);
    }, [allowedChars, onChange, sanitize, type]);

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        onChange={handleChange}
        autoComplete={type === 'password' ? 'current-password' : undefined}
        spellCheck={type === 'password' ? false : undefined}
        {...props}
      />
    );
  }
);

SecureInput.displayName = "SecureInput";

export { SecureInput };