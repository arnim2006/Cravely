// Centralized backend API configuration
// In local development, it defaults to port 3000.
// During deployment (Vercel/Netlify), define VITE_API_URL in the dashboard env variables.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
