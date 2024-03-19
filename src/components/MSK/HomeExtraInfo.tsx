"use client";
import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BannerImg } from "@/data/types";
import api from "../../../Services/api";

export interface SectionAdsProps {
  className?: string;
  imgAds?: string;
  country?: string;
  btnOnClick?: () => void;
}

const defaultImgs = [
  {
    imagen_desktop: { link: "/images/banners/promo-home_desktop.png" },
    imagen_mobile: { link: "/images/banners/promo-home_mobile.png" },
  },
];
const SectionAds: FC<SectionAdsProps> = ({ country, btnOnClick }) => {
  const [bannerImgs, setBannerImgs] = useState<BannerImg[]>(defaultImgs);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getWpImages("banners_home", country);
        setBannerImgs(response);
      } catch (err) {
        console.log({ err });
      }
    };

    fetchData();
  }, []);
  return (
    <div
      onClick={() => (btnOnClick ? btnOnClick() : "")}
      className="cursor-pointer"
    >
      <Swiper
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
    </div>
  );
};

export default SectionAds;
