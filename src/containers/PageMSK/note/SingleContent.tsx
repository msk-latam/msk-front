import React, { FC, useEffect, useRef, useState } from "react";
import { SinglePageType, ThemesToSeeType } from "../PageMission";
import { useLocation } from "react-router";
import CardAuthor2 from "components/CardAuthor2/CardAuthor2";
import { Link } from "react-router-dom";
import NcImage from "components/NcImage/NcImage";
import NoteAuthors from "../../../components/SingleProductDetail/NoteAuthors";
import NoteExtraData from "components/NoteExtraData/NoteExtraData";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderPosts from "../home/SectionSliderPosts";
import useBestSellers from "hooks/useBestSellers";
import useSpecialitiesPosts from "hooks/useSpecialitiesPosts";
import NcModal from "components/NcModal/NcModal";
import SpecialtiesModal from "./SpecialtiesModal";
import { slugify, slugifySpecialty } from "lib/Slugify";
import { parseHtml } from "utils/parseHTML";

export interface SingleContentProps {
  data: SinglePageType;
  sources?: string[];
}

const SingleContent: FC<SingleContentProps> = ({ data, sources }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [bottomDistance, setBottomDistance] = useState(0);
  const [showSpecialties, setShowSpecialties] = useState(false);
  const { courses, loading: loadingBestSellers } = useBestSellers();

  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const { author, date, reading_time, articles } = data;
  const [noteIntroduction, ...noteArticles] = articles;
  const commentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { fiveSpecialtiesGroups } = useSpecialitiesPosts();

  useEffect(() => {
    const courseList = data.the_most_read.map((course: any) => {
      var urlParts = course.link.split("/");
      return { ...course, slug: urlParts[urlParts.length - 2] };
    });
    setRecommendedCourses(courseList);
  }, [data]);

  useEffect(() => {
    if (location.hash !== "#comment") {
      return;
    }
    if (location.hash === "#comment") {
      setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.scrollIntoView();
        }
      }, 500);
    }
  }, [location]);

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

  const scrollToContainer = (id: string) => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="nc-SingleContent space-y-10 ">
      {/* ENTRY CONTENT */}
      <div className="grid grid-cols-12 gap-4">
        <div className="content-container col-span-12 lg:col-span-8 animate-fade-down">
          <CardAuthor2
            className="relative my-4"
            date={date}
            author={author}
            readingTime={Number(reading_time)}
          />
          <div
            id="single-entry-content"
            className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
          >
            {Array.from(articles).length > 1 && (
              <>
                <h2>Qué temas verás</h2>
                <ul className="pr-5">
                  {articles.map((art, index) => (
                    <li key={`${art.title}_${index}`}>
                      <a
                        className="text-primary text-lg "
                        //href={`#${slugify(art.title)}`}
                        onClick={() => scrollToContainer(`${slugify(art.title)}`)}
                      >
                        {art.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div
              className="text-xl font-lora font-normal lg:pr-20 "
              dangerouslySetInnerHTML={{
                __html: noteIntroduction?.content as string,
              }}
            />
            {/* <NoteExtraData excerpt={data.excerpt} /> */}
            <ul className="themes-to-see">
              {noteArticles?.map((art, index) => {
                return (
                  <li
                    key={`content_${slugify(art.title)}_${index}`}
                    className="p-0 md:p-0"
                  >
                    <h3
                      id={slugify(art.title)}
                      className="text-3xl md:text-3xl"
                    >
                      {art.title}
                    </h3>
                    {
                      <div
                        className="font-lora text-xl lg:pr-20"
                        dangerouslySetInnerHTML={{
                          __html: parseHtml(art.content),
                        }}
                      />
                    }
                    {index == 0 && (
                      <NoteExtraData featured_text={data.featured_text_field} />
                    )}
                  </li>
                );
              })}
            </ul>
            {/* <p className="font-lora text-slate-500 text-xl">
              ¿Te gustaría alcanzar nuevos objetivos y obtener un mayor
              reconocimiento en tu profesión?
            </p> */}
            <NoteExtraData suggest_content={data.suggest_content} />
            {sources && sources.length > 0 ?
              <div>
                <h4 className="source-title">Fuente/s:</h4>
                {sources.map((source, index) => {
                  return (
                    <p
                      key={`source_${index}`}
                      className="source-content lg:pr-20 break-words"
                    >
                      {source}
                    </p>
                  );
                })
                }
              </div> : null
            }

            {data.authors && data.authors.length > 0
              ? data.authors?.map((currentAuthor, index) => {
                return (
                  <NoteAuthors
                    key={`note_author_${index}`}
                    instructor={currentAuthor}
                  />
                );
              })
              : null}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 relative course-video-widget z-50">
          <div
            className={`${isFixed &&
              bottomDistance == 0 &&
              "col-span-12 lg:col-span-4 post-side-data lg:fixed lg:max-w-[330px] xl:max-w-[420px]"
              } ${bottomDistance != 0 ? "absolute bottom-0" : ""}`}
          >
            <div className="side-content rounded-2xl ">
              <div className="flex w-full">
                <h5 className="side-content-header p-2.5">🎯 Los más leídos</h5>
                <Link
                  to={`/archivo`}
                  className="course-network text-primary font-semibold text-sm my-auto ml-auto mr-4"
                >
                  Ver todos
                </Link>
              </div>
              {recommendedCourses.map((course: any, index: number) => (
                <Link
                  to={`/blog/${course.slug}`}
                  key={`rc_${index}`}
                  className="side-content-course"
                >
                  <NcImage
                    containerClassName="flex-shrink-0 h-8 w-8 rounded-lg overflow-hidden lg:h-10 lg:w-10"
                    src={course.image}
                  />
                  <p>
                    <span className="category">{course.category}</span>
                    <span>{course.title}</span>
                  </p>
                </Link>
              ))}
            </div>
            <div className="side-content rounded-2xl ">
              <div className="flex w-full">
                <h5 className="side-content-header p-2.5">
                  💼 Especialidades{" "}
                </h5>
                <a
                  href="#"
                  onClick={() => setShowSpecialties(true)}
                  className="course-network text-primary font-semibold text-sm my-auto ml-auto mr-4 pointer"
                >
                  Ver todas
                </a>
              </div>
              {fiveSpecialtiesGroups.map(
                ({ speciality_name, image, articles }, index) => (
                  <Link
                    to={`/archivo?especialidad=${slugifySpecialty(
                      speciality_name
                    )}`}
                    key={`rc_${index}`}
                    className="side-content-course"
                  >
                    <NcImage
                      containerClassName="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden lg:h-10 lg:w-10"
                      src={image}
                    />
                    <p>
                      <span> {speciality_name ?? "Otras"}</span>
                      <span className="category">{articles} artículos</span>
                    </p>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
     
      <div className="container relative py-16 my-32">
        <BackgroundSection />
        <SectionSliderPosts
          posts={courses}
          loading={loadingBestSellers}
          postCardName="card9"
          heading="Nuestros cursos más elegidos"
          subHeading="Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!"
          sliderStype="style2"
          uniqueSliderClass="pageHome-section6"
        />
      </div>
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

export default SingleContent;
