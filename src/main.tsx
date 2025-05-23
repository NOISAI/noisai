
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx'
import './index.css'
import { CLERK_CONFIG } from './config/apiKeys';
import { ThemeProvider } from './context/ThemeContext';

// Validate that we have a Clerk publishable key
if (!CLERK_CONFIG.PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in your environment or check the apiKeys.ts file.");
}

// Use the NODE_PUBLISHABLE_KEY if available, otherwise fall back to the regular PUBLISHABLE_KEY
const clerkPublishableKey = CLERK_CONFIG.NODE_PUBLISHABLE_KEY || CLERK_CONFIG.PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={clerkPublishableKey}
    appearance={{
      baseTheme: undefined,
      variables: {
        colorPrimary: "#22C55E"
      },
      elements: {
        // Ensure web3 buttons are styled consistently
        socialButtonsBlockButton: "hover:bg-gray-200 text-black flex items-center justify-center",
        socialButtonsBlockButtonText: "font-medium",
      }
    }}
  >
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ClerkProvider>
);
