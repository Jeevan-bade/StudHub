import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateCSRFToken } from '@/lib/security';

interface SecurityContextType {
  csrfToken: string;
  refreshCSRFToken: () => void;
  isSecureContext: boolean;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [csrfToken, setCSRFToken] = useState<string>('');
  const [isSecureContext, setIsSecureContext] = useState<boolean>(false);

  const refreshCSRFToken = () => {
    setCSRFToken(generateCSRFToken());
  };

  useEffect(() => {
    // Generate initial CSRF token
    refreshCSRFToken();
    
    // Check if we're in a secure context (HTTPS)
    setIsSecureContext(window.location.protocol === 'https:' || window.location.hostname === 'localhost');
    
    // Refresh CSRF token periodically
    const interval = setInterval(refreshCSRFToken, 30 * 60 * 1000); // Every 30 minutes
    
    return () => clearInterval(interval);
  }, []);

  const value = {
    csrfToken,
    refreshCSRFToken,
    isSecureContext
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}