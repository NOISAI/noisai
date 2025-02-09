
import { useState, useEffect } from 'react';

interface FooterProps {
  showContent: boolean;
}

export const Footer = ({ showContent }: FooterProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 25000); // Show footer after 25 seconds
      return () => clearTimeout(timer);
    }
  }, [showContent]);

  if (!isVisible) return null;

  return (
    <footer className="w-full max-w-7xl mx-auto py-12 px-4 mt-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Join the Energy Revolution
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Be part of the future of sustainable energy. Together, we can create a cleaner, 
          more efficient world powered by innovative sound-to-energy technology.
        </p>
        <div className="mt-8">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full 
            transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </footer>
  );
};
