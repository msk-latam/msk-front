// components/GradientBackground.tsx
import React from "react";
import Image from "next/image";

interface GradientBackgroundProps {
  children?: React.ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
  return (
    <div className="relative w-full h-full min-h-[980px] overflow-hidden md:-mt-0 -mt-40 z-[5]">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(360deg, rgba(0, 0, 0, 0) 43.69%, rgba(0, 0, 0, 0.2) 100%),
            linear-gradient(180deg, rgba(0, 0, 0, 0) 32.33%, rgba(0, 0, 0, 0.4) 88.46%),
            linear-gradient(88.91deg, #9200AD -50.32%, #7B8CC3 -22.16%, #700084 11.93%,
              #B814D6 41.89%, #4D005B 100.59%, #3B476C 124.96%, #9200AD 246.09%)
          `,
        }}
      />

      {/* Image */}
      <div className="absolute inset-0 z-[5]">
        <div className="relative w-full h-full">
          <Image
            src="/images/productpage/comunity-bg.svg"
            alt="Community background"
            fill
            className="scale-150 translate-x-20 pt-44 object-center md:object-fill md:scale-1 md:object-top  md:translate-x-1/3 md:pb-96"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;
