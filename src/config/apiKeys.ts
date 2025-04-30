
// API Keys Configuration
// Note: These are public keys intended for client-side use only.
// These keys are safe to include in the frontend code as they are:
// 1. Already restricted by domain on the respective service dashboards
// 2. Only usable for specific client-side operations
// 3. Not capable of accessing sensitive data or performing privileged operations

// Import Vite environment variables
// This allows overriding these values in different environments
// via import.meta.env.VITE_*

// EmailJS Configuration
export const EMAIL_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_noisai',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_investment',
  USER_ID: import.meta.env.VITE_EMAILJS_USER_ID || 'Du9xFraDxhJYnMU_I',
};

// Clerk Configuration
export const CLERK_CONFIG = {
  PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Z3JlYXQtbWFybW9zZXQtMTYuY2xlcmsuYWNjb3VudHMuZGV2JA",
};
