
import { ReactNode } from "react";

interface MotionProps {
  children: ReactNode;
  initial?: object;
  animate?: object;
  transition?: object;
  className?: string;
}

interface TextProps {
  children: ReactNode;
  className?: string;
}

export const Motion = ({ children, className = "", initial, animate, transition }: MotionProps) => {
  return (
    <div 
      className={`${className} fade-in`}
      style={{ 
        opacity: 0,
        transform: "translateY(20px)",
      }}
    >
      {children}
    </div>
  );
};

export const Text = ({ children, className = "" }: TextProps) => {
  return (
    <span className={`${className} fade-in-slow`}>
      {children}
    </span>
  );
};
