import React, { FC, useEffect, useState } from "react";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BannerImg } from "models";
import api from "Services/api";
export interface LayoutPageProps {
  className?: string;
  heading: string;
  headingEmoji?: string;
  subHeading?: string;
  children: React.ReactNode;
}

const defaultImgs = [
  {
    imagen_desktop: { link: "/src/images/banners/tienda_desktop.jpg" },
    imagen_mobile: { link: "/src/images/banners/tienda_mobile.jpg" },
  },
];
const StoreLayout: FC<LayoutPageProps> = ({ className = "", children }) => {
  const [bannerImgs, setBannerImgs] = useState<BannerImg[]>(defaultImgs);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getWpImages("banners_shop");
        setBannerImgs(response);
      } catch (err) {
        console.log({ err });
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`nc-LayoutPage relative ${className}`}
      data-nc-id="LayoutPage"
    >
      <div className="container-fluid relative">
        {/* HEADER */}
        <header className="w-full">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            pagination={{ enabled: true, clickable: true }}
          >
            {bannerImgs.map((img, index) => (
              <SwiperSlide key={`img_${index}`}>
                <a href={img.url?.href ? img.url?.href : "#"}>
                  <img
                    src={img.imagen_desktop.link}
                    alt="hero"
                    className="store-banner-desktop hidden md:block w-full"
                  />
                  <img
                    src={img.imagen_mobile.link}
                    alt="hero"
                    className="store-banner-desktop block md:hidden w-full"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </header>

        {/* CONTENT */}
        <div className="p-5 mx-auto bg-white rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StoreLayout;
