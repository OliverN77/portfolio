export const EMAILJS_CONFIG = {
  // Public Key 
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
  
  // Service ID
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  
  // Template ID
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
};

// Función auxiliar para verificar si EmailJS está configurado
export const isEmailJSConfigured = (): boolean => {
  return !!(
    EMAILJS_CONFIG.PUBLIC_KEY &&
    EMAILJS_CONFIG.SERVICE_ID &&
    EMAILJS_CONFIG.TEMPLATE_ID
  );
};