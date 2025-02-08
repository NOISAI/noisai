
import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { Button } from "@/components/ui/button";
import { Motion } from "@/components/ui/motion";

export default function Index() {
  const [show3D, setShow3D] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    if (show3D) {
      // Hide the content immediately when 3D scene starts
      setShowContent(false);
      
      // Show the content again after 15 seconds
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [show3D]);

  return (
    <main className="w-screen h-screen bg-[#221F26]">
      {/* 3D Scene */}
      {show3D && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${showContent ? 'opacity-25' : 'opacity-100'}`}>
          <Spline
            scene="https://prod.spline.design/rGP8VoiJZXNCrcRD/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      )}

      {/* Content */}
      <div className={`absolute inset-0 transition-opacity duration-1000 
        ${show3D ? (showContent ? 'opacity-100' : 'opacity-0') : 'opacity-100'}
        ${show3D && !showContent ? 'pointer-events-none' : ''}`}>
        <div className="w-full h-full flex flex-col items-center justify-center px-4">
          <Motion className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-[#0EA5E9] mb-4">
              Sound Waves to Clean Energy
            </h1>
            <p className="text-[#8E9196] max-w-2xl mx-auto mb-8">
              Watch how sound waves can be transformed into clean, renewable energy. Experience the future of sustainable power generation.
            </p>
            {!show3D && (
              <Button 
                onClick={() => setShow3D(true)}
                className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white px-8 py-6 text-lg rounded-full"
              >
                Start Experience
              </Button>
            )}
          </Motion>
        </div>
      </div>
    </main>
  );
}
