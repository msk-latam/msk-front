import React, { FC, useEffect } from "react";
import Heading from "components/Heading/Heading";
import Card4 from "components/Card4/Card4";
import Card7 from "components/Card7/Card7";
import Glide from "@glidejs/glide";
import Card9 from "components/Card9/Card9";
import NextPrev from "components/NextPrev/NextPrev";
import Card10 from "components/Card10/Card10";
import Card11 from "components/Card11/Card11";
import Card10V2 from "components/Card10/Card10V2";
import ncNanoId from "utils/ncNanoId";
import Card3 from "components/Card3/Card3";
import Card2 from "components/Card2/Card2";
import Card1 from "components/Card1/Card1";
import Card5 from "components/Card5/Card5";
import Card6 from "components/Card6/Card6";
import Card12 from "components/Card12/Card12";
import Card13 from "components/Card13/Card13";
import Card14 from "components/Card14/Card14";
import Card18 from "components/Card18/Card18";
import Card19 from "components/Card19/Card19";
import Card20 from "components/Card20/Card20";
import ImageSkeleton from "components/Skeleton/ImageSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";

export interface SectionSliderPostsProps {
  className?: string;
  heading?: string;
  subHeading?: string;
  posts: any;
  postCardName?:
    | "card1"
    | "card2"
    | "card3"
    | "card4"
    | "card5"
    | "card6"
    | "card7"
    | "card9"
    | "card10"
    | "card10V2"
    | "card11"
    | "card12"
    | "card13"
    | "card14"
    | "card18"
    | "card19"
    | "card20";
  sliderStype?: "style1" | "style2";
  perView?: 2 | 3 | 4;
  uniqueSliderClass: string;
  loading?: boolean;
}

const SectionSliderPosts: FC<SectionSliderPostsProps> = ({
  heading,
  subHeading,
  className = "",
  posts,
  postCardName = "card4",
  sliderStype = "style1",
  perView = 4,
  uniqueSliderClass,
  loading,
}) => {
  const UNIQUE_CLASS = "SectionSliderPosts_" + ncNanoId(uniqueSliderClass);
  // const top_picks = posts.sort((a: any, b: any) => b.viewdCount - a.viewdCount);

  const MY_GLIDE = new Glide(`.${UNIQUE_CLASS}`, {
    // @ts-ignore
    direction:
      document.querySelector("html")?.getAttribute("dir") === "rtl"
        ? "rtl"
        : "ltr",
    perView: perView,
    gap: 32,
    bound: true,
    breakpoints: {
      1280: {
        perView: perView - 1,
      },
      1023: {
        perView: perView - 2 || 1.2,
        gap: 20,
      },
      767: {
        perView: perView - 2 || 1.2,
        gap: 20,
      },
      639: {
        perView: 1.2,
        gap: 20,
      },
    },
  });

  useEffect(() => {
    if (!MY_GLIDE) return;
    MY_GLIDE.mount();
  }, [MY_GLIDE]);

  const getPostComponent = () => {
    switch (postCardName) {
      case "card1":
        return Card1;
      case "card2":
        return Card2;
      case "card3":
        return Card3;
      case "card4":
        return Card4;
      case "card5":
        return Card5;
      case "card6":
        return Card6;
      case "card7":
        return Card7;
      case "card9":
        return Card9;
      case "card10":
        return Card10;
      case "card10V2":
        return Card10V2;
      case "card11":
        return Card11;
      case "card12":
        return Card12;
      case "card13":
        return Card13;
      case "card14":
        return Card14;
      case "card18":
        return Card18;
      case "card19":
        return Card19;
      case "card20":
        return Card20;

      default:
        return Card4;
    }
  };

  const renderHeading = () => {
    if (!heading) return null;
    if (sliderStype === "style1") {
      return (
        <Heading desc={subHeading} hasNextPrev>
          {heading}
        </Heading>
      );
    } else {
      return (
        <Heading desc={subHeading} isCenter>
          {heading}
        </Heading>
      );
    }
  };


  const CardName = getPostComponent();
  return (
    <div className={`nc-SectionSliderPosts ${className}`}>
      <div className={`${UNIQUE_CLASS} sm:block hidden`}>
        {renderHeading()}
        <div className="glide__track" data-glide-el="track">
          {loading ? (
            <>
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-5 mb-16">
                <ImageSkeleton height="200px" />
                <ImageSkeleton height="200px" />
                <ImageSkeleton height="200px" />
                <ImageSkeleton height="200px" />
              </div>
            </>
          ) : (
            <ul className="glide__slides">
              {posts?.map((item: any, index: number) => (
                <li
                  key={index}
                  className={`glide__slide h-auto relative ${
                    sliderStype === "style2" ? "pb-8 xl:pb-10" : ""
                  }`}
                >
                  <CardName
                    post={item}
                    index={index}
                    showDescription
                    kind="curso"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        {sliderStype === "style2" && (
          <NextPrev
            btnClassName="w-12 h-12"
            containerClassName="justify-center"
          />
        )}
      </div>
      <div className="block sm:hidden">
        {renderHeading()}
        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          pagination={{ enabled: true, clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }} // Configuración de navegación
        >
          {posts?.map((item: any, index: number) => (
            <SwiperSlide key={`section_slider_${index}`}>
              <CardName
                post={item}
                index={index}
                showDescription
                kind="curso"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex gap-8 justify-center mt-12">
          <div className="swiper-button-prev">
            <button
              className="w-10 h-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300"
              title="Prev"
              data-glide-dir="<"
            >
              <i className="las la-angle-left text-black"></i>
            </button>
          </div>
          <div className="swiper-button-next">
            <button
              className="w-10 h-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300"
              title="Next"
              data-glide-dir=">"
            >
              <i className="las la-angle-right text-black"></i>
            </button>
          </div>
        </div>
        {/* <NextPrev
          btnClassName="w-12 h-12"
          containerClassName="justify-center"
        /> */}
      </div>
    </div>
  );
};

export default SectionSliderPosts;
