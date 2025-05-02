
import { 
  SignIn as ClerkSignIn, 
  SignUp as ClerkSignUp, 
  useAuth,
  useUser
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface NodeAuthWrapperProps {
  mode: "signIn" | "signUp";
}

export function NodeAuthWrapper({ mode }: NodeAuthWrapperProps) {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  
  useEffect(() => {
    if (isSignedIn && user) {
      // Redirect to node dashboard when authenticated
      navigate("/node-dashboard");
    }
  }, [isSignedIn, navigate, user]);

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
          signUpUrl="/node-signup"
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
          signInUrl="/node-signin"
        />
      )}
    </div>
  );
}
