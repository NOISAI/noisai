
import Spline from "@splinetool/react-spline";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0">
        <Spline 
          scene="https://prod.spline.design/rGP8VoiJZXNCrcRD/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Index;
