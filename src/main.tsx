
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx'
import './index.css'
import { CLERK_CONFIG } from './config/apiKeys';

if (!CLERK_CONFIG.PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={CLERK_CONFIG.PUBLISHABLE_KEY}
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
