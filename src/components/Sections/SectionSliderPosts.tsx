"use client";
import {FC, useEffect, useState} from "react";
import Heading from "@/components/Heading/Heading";
import Card4 from "@/components/Card4/Card4";
import Card7 from "@/components/Card7/Card7";

import Glide from "@glidejs/glide";

import Card9 from "@/components/Card9/Card9";
import NextPrev from "@/components/NextPrev/NextPrev";
import Card10 from "@/components/Card10/Card10";
import Card11 from "@/components/Card11/Card11";
import Card10V2 from "@/components/Card10/Card10V2";
import Card3 from "@/components/Card3/Card3";
import Card2 from "@/components/Card2/Card2";
import Card5 from "@/components/Card5/Card5";
import Card6 from "@/components/Card6/Card6";
import Card12 from "@/components/Card12/Card12";
import Card13 from "@/components/Card13/Card13";
import Card14 from "@/components/Card14/Card14";
import Card18 from "@/components/Card18/Card18";
import Card19 from "@/components/Card19/Card19";
import Card20 from "@/components/Card20/Card20";
import ImageSkeleton from "@/components/Skeleton/ImageSkeleton";

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
  perView?:1 | 2 | 3 | 4;
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
  const [slidesCount, setSlidesCount] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const UNIQUE_CLASS = "SectionSliderPosts_" + uniqueSliderClass;
  // const top_picks = posts.sort((a: any, b: any) => b.viewdCount - a.viewdCount);

  const MY_GLIDE = new Glide(`.${UNIQUE_CLASS}`, {
    direction: "ltr",
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
        perView: 1,
        gap: 20,
      },
    },
  });

  useEffect(() => {
    if (!MY_GLIDE) return;
    if (document.getElementsByClassName(UNIQUE_CLASS).length){
      MY_GLIDE.mount();
    }
    setSlidesCount(posts.length);
  }, [MY_GLIDE]);


  useEffect(() => {
    // Function to handle resize events
    const handleResize = () => {
      setShowArrows(
        (sliderStype === "style2" && window.innerWidth < 768) ||  (sliderStype === "style2" && slidesCount > perView)
      );
    };

    // Execute handleResize initially and on every window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sliderStype, slidesCount, perView]);

  const getPostComponent = () => {
    switch (postCardName) {
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
      <div className={`${UNIQUE_CLASS}`}>
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
        {showArrows && (
          <NextPrev
            btnClassName="w-12 h-12"
            containerClassName="justify-center"
          />
        )}
      </div>
    </div>
  );
};

export default SectionSliderPosts;