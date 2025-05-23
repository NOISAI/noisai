
import { 
  SignIn as ClerkSignIn, 
  SignUp as ClerkSignUp, 
  useAuth,
  useUser
} from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface AuthWrapperProps {
  mode: "signIn" | "signUp";
}

export function AuthWrapper({ mode }: AuthWrapperProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  
  useEffect(() => {
    if (isSignedIn && user) {
      // Get the redirect URL from the location state or default to investor dashboard
      const redirectTo = location.state?.from || "/investor-dashboard";
      
      // For regular sign-in, redirect to the specified page or investor dashboard
      navigate(redirectTo);
    }
  }, [isSignedIn, navigate, user, location.state]);

  // Add a listener for Clerk's Web3 authentication events
  useEffect(() => {
    const checkForWeb3Events = () => {
      // Force MetaMask to initialize on page load
      if (window.ethereum) {
        console.log("MetaMask is available");
        // Just accessing window.ethereum might help kickstart MetaMask
      } else {
        console.log("MetaMask not detected");
      }
    };
    
    checkForWeb3Events();
  }, []);

  return (
    <div className="w-full max-w-md">      
      {mode === "signIn" ? (
        <ClerkSignIn 
          appearance={{
            elements: {
              rootBox: "w-full max-w-md",
              card: "bg-gray-900 border border-gray-800 rounded-lg shadow-xl",
              headerTitle: "text-3xl font-bold text-white",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton: "bg-white hover:bg-gray-200 text-black py-6 h-14 flex items-center justify-center space-x-2 rounded-md border border-gray-700",
              socialButtonsBlockButtonText: "font-medium",
              dividerLine: "bg-gray-800",
              dividerText: "text-gray-500",
              formButtonPrimary: "bg-[#22C55E] hover:bg-[#22C55E]/90 text-white py-6 h-14 flex items-center justify-center space-x-2 rounded-md",
              footerAction: "text-gray-400",
              footerActionLink: "text-[#22C55E] hover:text-[#22C55E]/80",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-[#22C55E]",
              formFieldLabel: "text-gray-300",
              formFieldInput: "bg-gray-800 border-gray-700 text-white",
            }
          }}
          signUpUrl="/sign-up"
        />
      ) : (
        <ClerkSignUp 
          appearance={{
            elements: {
              rootBox: "w-full max-w-md",
              card: "bg-gray-900 border border-gray-800 rounded-lg shadow-xl",
              headerTitle: "text-3xl font-bold text-white",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton: "bg-white hover:bg-gray-200 text-black py-6 h-14 flex items-center justify-center space-x-2 rounded-md border border-gray-700",
              socialButtonsBlockButtonText: "font-medium",
              dividerLine: "bg-gray-800",
              dividerText: "text-gray-500",
              formButtonPrimary: "bg-[#22C55E] hover:bg-[#22C55E]/90 text-white py-6 h-14 flex items-center justify-center space-x-2 rounded-md",
              footerAction: "text-gray-400",
              footerActionLink: "text-[#22C55E] hover:text-[#22C55E]/80",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-[#22C55E]",
              formFieldLabel: "text-gray-300",
              formFieldInput: "bg-gray-800 border-gray-700 text-white",
            }
          }}
          signInUrl="/sign-in"
        />
      )}
    </div>
  );
}
