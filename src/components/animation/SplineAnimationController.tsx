
import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { WelcomeVoice } from "../audio/WelcomeVoice";

interface SplineAnimationControllerProps {
  onLoadComplete: (splineApp: any) => void;
  onAnimationComplete: () => void;
  showContent: boolean;
}

export const SplineAnimationController = ({
  onLoadComplete,
  onAnimationComplete,
  showContent
}: SplineAnimationControllerProps) => {
  const [spline, setSpline] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const onSplineLoad = (splineApp: any) => {
    console.log("Spline loaded");
    setSpline(splineApp);
    setIsLoaded(true);
    onLoadComplete(splineApp);
  };

  const handleStart = () => {
    if (isLoaded && spline && !isAnimating && !hasStarted) {
      setHasStarted(true);
      try {
        console.log("Starting animation");
        spline.emitEvent('mouseDown');
        setIsAnimating(true);

        const timer = setTimeout(() => {
          console.log("25 seconds elapsed, showing content");
          onAnimationComplete();
          setIsAnimating(false);
        }, 25000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error starting animation:", error);
        onAnimationComplete();
        setIsAnimating(false);
      }
    }
  };

  useEffect(() => {
    const handleClick = () => {
      handleStart();
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isLoaded, spline, isAnimating, hasStarted]);

  return (
    <>
      <WelcomeVoice isLoaded={isLoaded} hasStarted={hasStarted} />
      {!showContent && (
        <div className="fixed inset-0">
          <Spline
            scene="https://prod.spline.design/rGP8VoiJZXNCrcRD/scene.splinecode"
            className="w-full h-full"
            onLoad={onSplineLoad}
          />
        </div>
      )}
    </>
  );
};
