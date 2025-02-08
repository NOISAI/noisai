
import { useState } from "react";
import Spline from "@splinetool/react-spline";
import { Button } from "@/components/ui/button";
import { Motion } from "@/components/ui/motion";

export default function Index() {
  const [show3D, setShow3D] = useState(false);

  if (show3D) {
    return (
      <main className="w-screen h-screen">
        <Spline
          scene="https://prod.spline.design/rGP8VoiJZXNCrcRD/scene.splinecode"
          className="w-full h-full"
        />
      </main>
    );
  }

  return (
    <main className="w-screen h-screen bg-[#221F26] flex flex-col items-center justify-center px-4">
      <Motion className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-[#0EA5E9] mb-4">
          Sound Waves to Clean Energy
        </h1>
        <p className="text-[#8E9196] max-w-2xl mx-auto mb-8">
          Watch how sound waves can be transformed into clean, renewable energy. Experience the future of sustainable power generation.
        </p>
        <Button 
          onClick={() => setShow3D(true)}
          className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white px-8 py-6 text-lg rounded-full"
        >
          Start Experience
        </Button>
      </Motion>
    </main>
  );
}
