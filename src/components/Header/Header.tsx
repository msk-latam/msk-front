"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import MainNav2 from "./MainNav2";

export interface HeaderProps {}

let MAIN_MENU_HEIGHT = 0;
let WIN_PREV_POSITION = 0;

const Header: FC<HeaderProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainMenuRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isSingleHeaderShowing, setIsSingleHeaderShowing] = useState(false);

  useEffect(() => {
    if (mainMenuRef.current) {
      MAIN_MENU_HEIGHT = mainMenuRef.current.offsetHeight;
    }
  }, []);

  const showHideHeaderMenu = () => {
    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current || !mainMenuRef.current) return;

    if (Math.abs(WIN_PREV_POSITION - currentScrollPos) <= 50) {
      return;
    }

    let showClass = "scrolled";
    // SHOW _ HIDE MAIN MENU
    if (WIN_PREV_POSITION > currentScrollPos) {
      containerRef.current.style.top = "0";
      containerRef.current.classList.remove(showClass);
    } else {
      containerRef.current.style.top = `-${MAIN_MENU_HEIGHT + 2}px`;
      //Add class "scrolled" to .nc-header
      containerRef.current.classList.add(showClass);
    }

    WIN_PREV_POSITION = currentScrollPos;
  };

  useEffect(() => {
    const handleShowHideHeaderMenuEvent = () => {
      window.requestAnimationFrame(showHideHeaderMenu);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleShowHideHeaderMenuEvent);
      return () => {
        window.removeEventListener("scroll", handleShowHideHeaderMenuEvent);
      };
    }
  }, []);

  return (
    <div
      className="nc-Header sticky top-0 w-full left-0 right-0 z-40 transition-all "
      ref={containerRef}
    >
      {/* RENDER MAIN NAVIGATION */}
      <div className={`bg-white dark:bg-neutral-900`} ref={mainMenuRef}>
        <MainNav2 />
      </div>
    </div>
  );
};

export default Header;
