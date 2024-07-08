import React, { FC, ReactNode, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import PrevBtn from "@/components/NextPrev/PrevBtn";
import NextBtn from "@/components/NextPrev/NextBtn";
import ImageSkeleton from "./MSK/ImageSkeleton";

export interface MySliderProps<T> {
  className?: string;
  itemPerRow?: number;
  data: T[];
  renderItem?: (item: T, indx: number) => ReactNode;
  arrowBtnClass?: string;
  loading?: boolean;
  maxWidth?: string;
}

export default function MySlider<T>({
  className = "",
  itemPerRow = 5,
  data,
  renderItem = () => <div></div>,
  arrowBtnClass = "top-1/2 -translate-y-1/2",
  loading,
  maxWidth,
}: MySliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfitem] = useState(0);

  const windowWidth = useWindowSize().width;
  useEffect(() => {
    if (windowWidth <= 320) {
      return setNumberOfitem(1);
    }
    if (windowWidth < 500) {
      return setNumberOfitem(itemPerRow - 3 || 2);
    }
    if (windowWidth < 1024) {
      return setNumberOfitem(itemPerRow - 2 || 3);
    }
    if (windowWidth < 1280) {
      return setNumberOfitem(itemPerRow - 1);
    }

    setNumberOfitem(itemPerRow);
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal: number) {
    newVal = Math.max(0, Math.min(newVal, data.length - numberOfItems + 1));
    if (newVal == 0) {
      newVal = data.length - numberOfItems;
    } else if (newVal == data.length - numberOfItems + 1) {
      newVal = 0;
    }
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < data?.length - 1) {
        changeItemId(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1);
      }
    },
    trackMouse: true,
  });

  if (!data.length) {
    return <div></div>;
  }

  return (
    <>
      <div className={`nc-MySlider ${className}`}>
        <MotionConfig
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <div
            className={`relative flow-root sm:max-w-[${maxWidth}] mx-auto`}
            {...handlers}
          >
            <div className={`flow-root overflow-hidden rounded-xl`}>
              <motion.ul
                initial={false}
                className="relative whitespace-nowrap -mx-2 xl:-mx-4 "
              >
                {data && data.length > 0 && (
                  <AnimatePresence initial={false} custom={direction}>
                    {data.map((item, indx) => (
                      <motion.li
                        className={`relative inline-block px-2 xl:px-4 whitespace-normal`}
                        custom={direction}
                        initial={{
                          x: `${(currentIndex - 1) * -100}%`,
                        }}
                        animate={{
                          x: `${currentIndex * -100}%`,
                        }}
                        variants={variants(200, 1)}
                        key={indx}
                        style={{
                          width: `calc(${
                            numberOfItems > 1 ? 1 / numberOfItems : "1"
                          } * 100%)`,
                        }}
                      >
                        {renderItem(item, indx)}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                )}
              </motion.ul>
            </div>

            {numberOfItems > 3 && (
              <div className="flex gap-2 justify-center mt-16">
                <PrevBtn
                  onClick={() => changeItemId(currentIndex - 1)}
                  className={`w-12 h-12 xl:w-12 xl:h-12 text-lg z-[1] ${arrowBtnClass}`}
                />
                <NextBtn
                  onClick={() => changeItemId(currentIndex + 1)}
                  className={`w-12 h-12 xl:w-12 xl:h-12 text-lg z-[1] ${arrowBtnClass}`}
                />
              </div>
            )}
          </div>
        </MotionConfig>
      </div>
    </>
  );
}
