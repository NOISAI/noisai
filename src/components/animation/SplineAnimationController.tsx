
import { useState, useEffect } from "react";
import { getRandomChange } from "@/utils/statsCalculations";

interface SplineAnimationControllerProps {
  isLoaded: boolean;
  spline: any;
  isAnimating: boolean;
  hasStarted: boolean;
  onAnimationComplete: () => void;
  onSplineLoad: (splineApp: any) => void;
}

export const SplineAnimationController = ({
  isLoaded,
  spline,
  isAnimating,
  hasStarted,
  onAnimationComplete,
  onSplineLoad
}: SplineAnimationControllerProps) => {
  const handleStart = () => {
    if (isLoaded && spline && !isAnimating && !hasStarted) {
      try {
        console.log("Starting animation");
        spline.emitEvent('mouseDown');

        const timer = setTimeout(() => {
          console.log("25 seconds elapsed, showing content");
          onAnimationComplete();
        }, 25000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error starting animation:", error);
        onAnimationComplete();
      }
    }
  };

  return (
    <div 
      className="relative w-screen min-h-screen bg-black"
      onClick={handleStart}
    />
  );
};
