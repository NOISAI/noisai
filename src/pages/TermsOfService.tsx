
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-[#22C55E] mb-4">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center mb-6">
            <img 
              src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
              alt="NOISAI Logo" 
              className="w-8 h-8 mr-2" 
            />
            <h1 className="text-3xl font-bold">Terms of Service</h1>
          </div>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300">Last updated: April 30, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using NOISAI's platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p>
            NOISAI provides a decentralized energy marketplace platform that connects renewable energy producers with consumers using blockchain technology. Our services include but are not limited to tokenized energy trading, investment opportunities in renewable energy projects, and carbon footprint tracking.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <p>
            To access certain features of our platform, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify NOISAI immediately of any unauthorized use of your account.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Blockchain Transactions</h2>
          <p>
            Our platform utilizes blockchain technology for transactions. You acknowledge that blockchain transactions are irreversible and NOISAI has no ability to reverse any transactions. You are solely responsible for the accuracy of wallet addresses and transaction details.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Investment Risks</h2>
          <p>
            Investments in renewable energy projects and tokens involve significant risk, including the possible loss of principal. Past performance is not indicative of future results. You should carefully consider your investment objectives, risk tolerance, and financial circumstances before investing.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
          <p>
            All content, features, and functionality of our platform, including but not limited to text, graphics, logos, icons, and software, are the exclusive property of NOISAI and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
          <p>
            NOISAI shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from your use or inability to use the service or for the cost of procurement of substitute services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which NOISAI is established, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
          <p>
            NOISAI reserves the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on our platform. Your continued use of the platform after changes constitutes your acceptance of the new Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            <a href="mailto:info@noisai.tech" className="text-[#22C55E] hover:underline">
              info@noisai.tech
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
