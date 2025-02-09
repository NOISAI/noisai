
import { useEffect, useState } from "react";

interface LogoProps {
  showRotation: boolean;
  showLogoText: boolean;
}

export const Logo = ({ showRotation, showLogoText }: LogoProps) => {
  return (
    <div className="absolute top-8 left-8">
      <div className="flex items-center gap-2">
        <div className={`transition-transform duration-1000 ${
          !showRotation ? '-rotate-90' : 'rotate-0'
        }`}>
          <img 
            src="/lovable-uploads/ca242ff0-731d-4f1b-9fc6-bad0a48ffed3.png" 
            alt="NOISAI Logo" 
            className="w-8 h-8"
          />
        </div>
        <span 
          className={`text-[#22C55E] text-2xl font-bold transition-opacity duration-500
            ${showLogoText ? 'opacity-100' : 'opacity-0'}`}
        >
          NOISAI
        </span>
      </div>
    </div>
  );
};
