
import { Link2, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full bg-black mt-32 py-16 transition-opacity duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Join the Energy Revolution</h2>
          <p className="text-gray-300 text-lg max-w-2xl">
            Invest now in NOISAI vision. Participate in our decentralized energy marketplace and be part of NOISAI green energy innovation
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <Link to="/sign-in" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Link2 className="w-5 h-5" />
              Invest in NOISAI
            </Link>
            <a 
              href="https://noisai.gitbook.io/noisai-whitepaper" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Eye className="w-5 h-5" />
              View Whitepaper
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-green-500 font-bold text-xl">
              <img 
                src="/noisai-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
                alt="NOISAI Logo" 
                className="w-6 h-6 mr-2"
              />
              NOISAI
            </div>
            <nav className="flex flex-wrap gap-x-8 gap-y-2 text-gray-400 justify-center">
              <a href="#" className="hover:text-white transition-colors">Technology</a>
              <a href="#tokenomics" className="hover:text-white transition-colors">Tokenomics</a>
              <a href="#features" className="hover:text-white transition-colors">Governance</a>
              <Link to="/node-dashboard" className="hover:text-white transition-colors">Nodes</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <a href="mailto:info@noisai.tech" className="hover:text-white transition-colors">Contact</a>
            </nav>
          </div>
          <div className="text-center text-gray-500 mt-8">
            © 2025 NOISAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
