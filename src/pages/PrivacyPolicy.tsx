
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300">Last updated: April 30, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            At NOISAI, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <p>We collect several types of information from and about users of our platform, including:</p>
          <ul className="list-disc pl-6 mt-2 mb-4 text-gray-300">
            <li>Personal identifiers (name, email address, phone number)</li>
            <li>Authentication information necessary for account creation</li>
            <li>Blockchain wallet addresses</li>
            <li>Transaction data related to energy trading and investments</li>
            <li>Usage data and analytics</li>
            <li>Device and browser information</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mt-2 mb-4 text-gray-300">
            <li>Provide, maintain, and improve our platform</li>
            <li>Process transactions and send related information</li>
            <li>Verify your identity and prevent fraud</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Blockchain Data</h2>
          <p>
            Please be aware that blockchain technology is inherently transparent. When you conduct transactions on the blockchain through our platform, certain information such as wallet addresses and transaction amounts will be publicly visible on the blockchain ledger. This information cannot be deleted once recorded.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mt-2 mb-4 text-gray-300">
            <li>Service providers who perform services on our behalf</li>
            <li>Business partners in connection with features and services</li>
            <li>Law enforcement or regulatory bodies when required by law</li>
            <li>Other users, as necessary for transactions you initiate</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Data Protection Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul className="list-disc pl-6 mt-2 mb-4 text-gray-300">
            <li>Access and receive a copy of your data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. International Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence, where data protection laws may differ from those of your country. We ensure appropriate safeguards are in place to protect your information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
            <br />
            <a href="mailto:privacy@noisai.tech" className="text-[#22C55E] hover:underline">
              privacy@noisai.tech
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
