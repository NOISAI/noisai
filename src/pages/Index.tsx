
import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { Motion } from "@/components/ui/motion";

export default function Index() {
  const [show3D, setShow3D] = useState(true); // Start with 3D scene visible
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // After 20 seconds, show the website content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []); // Only run once on mount

  return (
    <main className="w-screen h-screen bg-[#221F26]">
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
          <Motion className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-[#0EA5E9] mb-4">
              Sound Waves to Clean Energy
            </h1>
            <p className="text-[#8E9196] max-w-2xl mx-auto mb-8">
              Watch how sound waves can be transformed into clean, renewable energy. Experience the future of sustainable power generation.
            </p>
          </Motion>
        </div>
      </div>
    </main>
  );
}
