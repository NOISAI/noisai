
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Motion } from "@/components/ui/motion";
import { Mail, Wallet } from "lucide-react";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({
    google: false,
    wallet: false
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    setIsLoading({ ...isLoading, google: true });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Account created successfully",
        description: "Welcome to NOISAI investment platform!",
        variant: "default",
      });
      
      // Navigate to investor dashboard
      navigate("/investor-dashboard");
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "Unable to connect with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading({ ...isLoading, google: false });
    }
  };

  const handleWalletSignUp = async () => {
    setIsLoading({ ...isLoading, wallet: true });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Wallet connected",
        description: "Your account has been created successfully!",
        variant: "default",
      });
      
      // Navigate to investor dashboard
      navigate("/investor-dashboard");
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Unable to connect your Web3 wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading({ ...isLoading, wallet: false });
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <Motion className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center mb-8">
            <img 
              src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
              alt="NOISAI Logo" 
              className="w-8 h-8 mr-2"
            />
            <span className="text-[#22C55E] text-2xl font-bold">NOISAI</span>
          </Link>
          <h2 className="text-3xl font-bold text-white">Create your account</h2>
          <p className="mt-2 text-gray-400">
            Join NOISAI's innovative investment platform
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            onClick={handleGoogleSignUp}
            className="w-full bg-white hover:bg-gray-200 text-black py-6 h-14 flex items-center justify-center space-x-2"
            disabled={isLoading.google}
          >
            <Mail className="h-5 w-5" />
            <span>{isLoading.google ? "Connecting..." : "Sign up with Google"}</span>
          </Button>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-800"></div>
            <span className="flex-shrink mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-800"></div>
          </div>

          <Button
            onClick={handleWalletSignUp}
            className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-white py-6 h-14 flex items-center justify-center space-x-2"
            disabled={isLoading.wallet}
          >
            <Wallet className="h-5 w-5" />
            <span>{isLoading.wallet ? "Connecting..." : "Connect Web3 Wallet"}</span>
          </Button>
        </div>

        <div className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-[#22C55E] hover:text-[#22C55E]/80">
            Sign in
          </Link>
        </div>
      </Motion>

      <p className="mt-10 text-center text-sm text-gray-500">
        By continuing, you agree to NOISAI's{" "}
        <a href="#" className="text-[#22C55E] hover:text-[#22C55E]/80">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-[#22C55E] hover:text-[#22C55E]/80">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
