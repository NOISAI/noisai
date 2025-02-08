
import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { Motion, Text } from "@/components/ui/motion";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-primary-light to-white">
      <div className="absolute inset-0 z-0">
        <Spline 
          scene="https://prod.spline.design/rGP8VoiJZXNCrcRD/scene.splinecode"
          className="w-full h-full"
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 pt-20 sm:pt-32">
        <Motion
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <Text
            className="inline-block bg-secondary/10 px-4 py-1.5 mb-4 rounded-full text-sm font-medium tracking-wide"
          >
            Welcome to the Future
          </Text>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary">
            Create Something Amazing
          </h1>
          
          <p className="text-lg md:text-xl text-secondary-light max-w-2xl mx-auto mb-8">
            Experience the next generation of web design with our cutting-edge 3D interfaces and smooth animations.
          </p>
          
          <button className="glass-panel px-8 py-3 text-primary-dark font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary">
            Get Started
          </button>
        </Motion>
      </div>
    </div>
  );
};

export default Index;
