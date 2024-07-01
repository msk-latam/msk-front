"use client";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css/bundle";
import ReferenceCard from "@/components/Reference/RefereceCard";

interface ReferenceSliderProps {
  references: any[];
}

const ReferenceSlider: FC<ReferenceSliderProps> = ({ references }) => {
  //if screen is mobile, set height to 200px, else set height to 325px
  let screenWidth = typeof window !== undefined ? window.innerWidth : 1024;
  let heightClass = "max-h-[350px] " + (screenWidth < 1024 ? " h-[200px] " : " h-[325px] ");

  return (
    <div className="swiper-container h-full lg:hidden">
      <Swiper
        slidesPerView={1}
        spaceBetween="5%"
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        className={heightClass}
      >
        {references.map((reference, i) => (
          <SwiperSlide key={i} className="w-100 bg-primary mt-2 sm:mt-8">
            <ReferenceCard
              key={i}
              reference={reference}
              className="shadow-lg mx-4"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReferenceSlider;
