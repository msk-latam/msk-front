"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { slugifySpecialty } from "@/lib/Slugify";
import Link from "next/link";
import NcModal from "@/components/NcModal/NcModal";
import SpecialtiesModal from "./SpecialtiesModal";
import NcLink from "@/components/NcLink/NcLink";

export interface SingleContentSidebarFixedItemProps {
  articles: any[];
  the_most_read: any[];
  fiveSpecialtiesGroup?: any[];
}

const SingleContentSidebarFixedItem: FC<SingleContentSidebarFixedItemProps> = ({
  articles,
  the_most_read,
  fiveSpecialtiesGroup,
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const [bottomDistance, setBottomDistance] = useState(0);
  const [showSpecialties, setShowSpecialties] = useState(false);

  const [recommendedCourses, setRecommendedCourses] = useState<any>([]);
  useEffect(() => {
    const courseList = the_most_read.map((course: any) => {
      var urlParts = course.link.split("/");
      return { ...course, slug: urlParts[urlParts.length - 2] };
    });
    setRecommendedCourses(courseList);
  }, [the_most_read]);

  let scrollPosition = 0;

  const calculateDistanceToBottom = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    return documentHeight - (scrollPosition + windowHeight);
  };

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 900;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsFixed(scrollTop > threshold);
      const distanceToBottom = calculateDistanceToBottom();
      const auxDistance = scrollPosition - distanceToBottom - 100;
      setBottomDistance(distanceToBottom < 1200 ? auxDistance / 3 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isFixed &&
        bottomDistance == 0 &&
        "col-span-12 lg:col-span-4 post-side-data lg:fixed lg:max-w-[330px] xl:max-w-[420px]"
      } ${bottomDistance != 0 ? "absolute bottom-0" : ""}`}
    >
      <div className="side-content rounded-2xl mb-2">
        <div className="flex w-full">
          <h5 className="side-content-header p-2.5">🎯 Los más leídos</h5>
          <Link
            href={`/archivo`}
            className="course-network text-primary font-semibold text-sm my-auto ml-auto mr-4"
          >
            Ver todos
          </Link>
        </div>
        {recommendedCourses.map((course: any, index: number) => (
          <Link
            href={`/blog/${course.slug}`}
            key={`rc_${index}`}
            className="side-content-course"
          >
            <NcImage
              containerClassName="flex-shrink-0 h-8 w-8 rounded-lg overflow-hidden lg:h-10 lg:w-10"
              src={course.image}
              alt=""
              width="100"
              height="100"
            />
            <p>
              <span className="category">{course.category}</span>
              <span>{course.title}</span>
            </p>
          </Link>
        ))}
      </div>
      {/*<div className="side-content rounded-2xl ">
        <div className="flex w-full">
          <h5 className="side-content-header p-2.5">💼 Especialidades </h5>
          <button
            onClick={() => setShowSpecialties(true)}
            className="course-network text-primary font-semibold text-sm my-auto ml-auto mr-4 pointer"
          >
            Ver todas
          </button>
        </div>
        {fiveSpecialtiesGroup?.map(
          ({ speciality_name, image, articles }, index) => (
            <Link
              href={`/archivo?especialidad=${slugifySpecialty(
                speciality_name
              )}`}
              key={`rc_${index}`}
              className="side-content-course"
            >
              <NcImage
                containerClassName="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden lg:h-10 lg:w-10"
                src={image}
                alt=""
                width="100"
                height="100"
              />
              <p>
                <span> {speciality_name ?? "Otras"}</span>
                <span className="category">{articles} artículos</span>
              </p>
            </Link>
          )
        )}
      </div>*/}
      <NcModal
        isOpenProp={showSpecialties}
        onCloseModal={() => {
          setShowSpecialties(false);
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-screen-lg"
        renderContent={() => <SpecialtiesModal setShow={setShowSpecialties} />}
        modalTitle="Especialidades"
        modalSubtitle=""
        centerTitle
      />
    </div>
  );
};

export default SingleContentSidebarFixedItem;
