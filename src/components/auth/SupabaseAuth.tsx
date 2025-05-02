
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";

interface SupabaseAuthProps {
  mode: "signIn" | "signUp";
}

export function SupabaseAuth({ mode }: SupabaseAuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signUp") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Account created successfully",
          description: "Please check your email for verification instructions.",
        });
      } else {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Determine where to redirect the user based on their email
        if (email === "info@noisai.tech") {
          navigate("/node-admin");
        } else {
          // Get the redirect URL from location state or default to node dashboard
          navigate("/node-dashboard");
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleAuth} className="space-y-6 w-full">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">Email</Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 text-white bg-gray-800 border-gray-700"
          />
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 pr-10 text-white bg-gray-800 border-gray-700"
          />
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90"
        disabled={loading}
      >
        {loading ? "Processing..." : mode === "signIn" ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
};
