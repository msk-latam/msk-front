"use client";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import Logo from "@/components/Logo/Logo";
import MenuBar from "@/components/MenuBar/MenuBar";
import Navigation from "@/components/Navigation/Navigation";
import NavigationUser from "@/components/Navigation/NavigationUser";
import { AuthContext } from "@/context/user/AuthContext";
import {
  NAVIGATION_MSK,
  NAVIGATION_BLOG_MSK,
  NAVIGATION_ARCHIVE_MSK,
} from "@/data/navigation";
import React, { FC, useContext, useEffect, useState } from "react";
import SearchProducts from "./SearchProducts";
import ModalSignOut from "@/components/Modal/SignOut";
import { usePathname } from "next/navigation";
import { useCurrentLocale } from "next-i18n-router/client";
// @ts-ignore
import i18nConfig from "@/i18nConfig";

const MainNav2: FC = () => {
  const locale = useCurrentLocale(i18nConfig);

  const { state } = useContext(AuthContext);
  const [isOnBlog, setIsOnBlog] = useState(false);
  const [isOnArchive, setIsOnArchive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);

  const handleModalLogout = () => {
    setIsModalOpen(!isModalOpen);
  };

  const pathName = usePathname();

  useEffect(() => {
    setIsOnBlog(pathName.includes("blog"));
    setIsOnArchive(pathName.includes("archivo"));
    setInitialLoad(true);
    console.log('USE EFFECT RUN');
  }, []);
  
  return (
    <div className={`nc-MainNav nc-MainNav2 relative z-10 container`}>
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo isOnBlog={isOnBlog} />
          <div className="hidden sm:block flex-grow max-w-xs">
            <SearchProducts />
          </div>
        </div>
        {initialLoad && (
          <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
            <div className={"hidden items-center xl:flex space-x-2"}>
              {isOnBlog && (
                <>
                  <Navigation navigations={NAVIGATION_BLOG_MSK} />
                </>
              )}
              {isOnArchive && (
                <>
                  <Navigation navigations={NAVIGATION_ARCHIVE_MSK} />
                </>
              )}
              {!isOnBlog && !isOnArchive && (
                <>
                  <Navigation navigations={NAVIGATION_MSK} />
                </>
              )}
              {state.isAuthenticated ? (
                <>
                  <ButtonSecondary
                    onClick={() => handleModalLogout()}
                    sizeClass="px-4 py-2 sm:px-5"
                    className="border-solid border-1 border-neutral-200"
                    bordered
                  >
                    Cerrar sesión
                  </ButtonSecondary>
                  <NavigationUser />
                </>
              ) : (
                <>
                  <div className="hidden sm:block h-10 border-l border-neutral-300 dark:border-neutral-6000 pr-5"></div>
                  <ButtonSecondary
                    href="/iniciar-sesion"
                    locale={locale}
                    sizeClass="px-4 py-2 sm:px-5"
                    className="border-solid border-1 border-neutral-200 text-neutral-500"
                    bordered
                  >
                    Iniciar sesión
                  </ButtonSecondary>
                  <ButtonPrimary
                    href={`/crear-cuenta`}
                    sizeClass="px-4 py-2 sm:px-5"
                    className="font-semibold"
                  >
                    Crear cuenta
                  </ButtonPrimary>
                </>
              )}
            </div>
            <div className="flex items-center space-x-4 xl:hidden">
              <NavigationUser />
              <MenuBar />
            </div>
          </div>
        )}
      </div>
      <ModalSignOut open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MainNav2;
