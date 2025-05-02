
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx'
import './index.css'
import { CLERK_CONFIG } from './config/apiKeys';

// Validate that we have a Clerk publishable key
if (!CLERK_CONFIG.PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in your environment or check the apiKeys.ts file.");
}

// We'll use the NODE_PUBLISHABLE_KEY if it exists, otherwise fall back to the regular PUBLISHABLE_KEY
const publishableKey = CLERK_CONFIG.NODE_PUBLISHABLE_KEY || CLERK_CONFIG.PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={publishableKey}
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
    <App />
  </ClerkProvider>
);
