import { FC } from "react";
import "swiper/css/bundle";
import { FetchCourseType } from "@/data/types";
import { Swiper, SwiperSlide } from "swiper/react";
import Card9 from "@/components/Card9/Card9";

interface CoursesSliderProps {
  products: FetchCourseType[];
}

const CoursesSlider: FC<CoursesSliderProps> = ({ products }) => {
  return (
    <div className="swiper-container md:hidden">
      <Swiper
        slidesPerView={1.3}
        spaceBetween="5%"
        className="h-[450px]"
        breakpoints={{
          320: {
            slidesPerView: 1.3,
          },
          480: {
            slidesPerView: 2,
          },
        }}
      >
        {products.map((product, i) => (
          <SwiperSlide key={i} className="w-100 bg-primary">
            <Card9
              kind="curso"
              post={product}
              className="h-[400px] ml-2"
              showDescription={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CoursesSlider;
