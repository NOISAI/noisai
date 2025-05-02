
import { Link } from "react-router-dom";
import { Motion } from "@/components/ui/motion";
import { NodeAuthWrapper } from "@/components/auth/NodeAuthWrapper";

export default function NodeSignUp() {
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
      
      <NodeAuthWrapper mode="signUp" />
      
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
