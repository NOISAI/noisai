
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Motion } from "@/components/ui/motion";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demonstration purposes, we'll simulate a successful login
    // In a real app, this would connect to your authentication backend
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Signed in successfully",
        description: "Welcome back to NOISAI!",
        variant: "default", // Changed from "success" to "default"
      });
      
      // Navigate to investor dashboard (to be created)
      navigate("/investor-dashboard");
    } catch (error) {
      toast({
        title: "Error signing in",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
          <h2 className="text-3xl font-bold text-white">Sign in to your account</h2>
          <p className="mt-2 text-gray-400">
            Access your NOISAI investor dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-800 text-white"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-gray-900 border-gray-800 text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="text-[#22C55E] hover:text-[#22C55E]/80">
                Forgot your password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-white py-2 h-12"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="text-center mt-4 text-gray-400">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-[#22C55E] hover:text-[#22C55E]/80">
              Sign up
            </Link>
          </div>
        </form>
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
