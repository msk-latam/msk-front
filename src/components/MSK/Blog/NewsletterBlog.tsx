"use client";
import React, { FC, useState } from "react";
import NcImage from "@/components/NcImage/NcImage";
import Badge from "@/components/Badge/Badge";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import NcModal from "@/components/NcModal/NcModal";
import FooterNewsletter from "@/components/Footer/Newsletter";
import { ArrowLongRightIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export interface NewsletterProps {
  className?: string;
}

const NewsletterBlog: FC<NewsletterProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const openModal = (e: any) => {
    e.preventDefault();
    setShow(true);
  };
  return (
    <div
      className={`nc-Newsletter relative flex flex-col lg:flex-row items-center ${className}`}
      data-nc-id="Newsletter"
    >
      <div className="flex-shrink-0 mb-2 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-[28px] sm:text-4xl">
          Disfruta nuestros contenidos
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Suscríbete al newsletter y accede con anticipación a materiales
          académicos 100% sin costo.
        </span>
        <ul className="space-y-2 mt-6">
          <li className="flex items-center space-x-2">
            <Badge color="indigo" name="01" className="rounded-3xl" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Guías profesionales
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <Badge color="indigo" name="02" className="rounded-3xl" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Webinars
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <Badge color="indigo" name="03" className="rounded-3xl" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Podcasts
            </span>
          </li>
        </ul>
        <form onSubmit={openModal} className="mt-6 relative max-w-sm">
          <Input
            required
            aria-required
            placeholder="Ingresar e-mail"
            className="rounded-lg w-full color-description-text-placeholder"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="newsletter-arrow-button nc-Button absolute h-[36px] w-[38px] inline-flex items-center justify-center transition-colors rounded text-sm sm:text-base font-medium ttnc-ButtonPrimary disabled:bg-grey-disabled bg-primary-6000 text-neutral-50 hover:bg-red-500 hover:text-neutral-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0" type="submit">
            <ArrowLongRightIcon style={{ width: 25, color: "white" }} />
          </button>
        </form>
      </div>
      <div className="flex-grow ">
        <div className="newsletter-doctors">
          <NcImage
            src={"/images/vectors/doctors_1.png"}
            width="1920"
            height="1080"
            alt=""
          />
        </div>
      </div>
      <NcModal
        isOpenProp={show}
        onCloseModal={() => {
          setShow(false);
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-screen-lg"
        renderContent={() => (
          <FooterNewsletter email={email} setShow={setShow} />
        )}
        modalTitle="Nuestro newsletter"
        modalSubtitle="Suscrí­bete para acceder a descuentos exclusivos, becas completas y contenido personalizado"
      />
    </div>
  );
};

export default NewsletterBlog;
