
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
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              Invest in NOISAI
            </button>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              View Whitepaper
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-green-500 font-bold text-xl">
              <img 
                src="/lovable-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
                alt="NOISAI Logo" 
                className="w-6 h-6 mr-2"
              />
              NOISAI
            </div>
            <nav className="flex gap-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Technology</a>
              <a href="#tokenomics" className="hover:text-white transition-colors">Tokenomics</a>
              <a href="#features" className="hover:text-white transition-colors">Governance</a>
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
