
import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { Motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Github, Link } from "lucide-react";

export default function Index() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (hasInteracted) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 23000);

      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  const handleSceneClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <main className="w-screen h-screen bg-[#0B0F17]" onClick={handleSceneClick}>
      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 14C10.5 14 14.5 22 18 22C21.5 22 25.5 14 29 14" 
                    stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-[#22C55E] text-2xl font-bold">NOISAI</span>
        </div>
      </div>

      {/* 3D Scene */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${showContent ? 'opacity-0' : 'opacity-100'}`}>
        <Spline
          scene="https://prod.spline.design/rGP8VoiJZXNCrcRD/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className={`absolute inset-0 transition-opacity duration-1000 
        ${showContent ? 'opacity-100' : 'opacity-0'}
        ${!showContent ? 'pointer-events-none' : ''}`}>
        <div className="w-full h-full flex flex-col items-center justify-center px-4">
          <Motion className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-[#22C55E] mb-6 max-w-4xl mx-auto leading-tight">
              Sound Waves to Clean Energy
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Revolutionary technology that converts ambient sound into renewable electricity, powered by blockchain and AI
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white px-8 py-6 text-lg h-auto"
              >
                <Link className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg h-auto"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>
          </Motion>
        </div>
      </div>
    </main>
  );
}
