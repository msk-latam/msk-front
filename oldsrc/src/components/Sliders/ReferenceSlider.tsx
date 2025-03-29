import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css/bundle";
import ReferenceCard from "components/ReferenceCard";


interface ReferenceSliderProps{
    references: any[];
}

const ReferenceSlider: FC<ReferenceSliderProps> = ({references}) => {

  return (
    <div className="swiper-container lg:hidden">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween= '5%'
        loop={true}
        autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
        className="h-[220px]"
      >
        {references.map((reference, i) => (
          <SwiperSlide key={i} className="w-100 bg-primary mt-8">
            <ReferenceCard key={i} reference={reference} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReferenceSlider;
