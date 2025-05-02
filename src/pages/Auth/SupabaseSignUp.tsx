
import { Link } from "react-router-dom";
import { SupabaseAuth } from "@/components/auth/SupabaseAuth";
import { Motion } from "@/components/ui/motion";

export default function SupabaseSignUp() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <Motion className="w-full max-w-md space-y-8 mb-8 mt-16">
        <div className="text-center inline-flex items-center">
          <img 
            src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
            alt="NOISAI Logo" 
            className="w-8 h-8 mr-2"
          />
          <span className="text-[#22C55E] text-2xl font-bold">NOISAI NODE</span>
        </div>
      </Motion>
      
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 mb-6">Join the NOISAI Node network</p>
          <SupabaseAuth mode="signUp" />
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/node-sign-in" className="text-[#22C55E] hover:text-[#22C55E]/80">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      
      <p className="mt-10 text-center text-sm text-gray-500">
        By continuing, you agree to NOISAI's{" "}
        <Link to="/terms-of-service" className="text-[#22C55E] hover:text-[#22C55E]/80">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy-policy" className="text-[#22C55E] hover:text-[#22C55E]/80">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
