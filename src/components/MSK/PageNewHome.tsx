import React, { useContext, useEffect, useState } from "react";
import { TABS_HOME } from "data/MSK/courses";
import { TABS_BLOG } from "data/MSK/blog";
import { HOME_SPECIALTIES } from "data/MSK/specialties";
import { DataContext } from "context/data/DataContext";
import SectionSliderPosts from "./home/SectionSliderPosts";
import BlogSummary from "./home/BlogSummary";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import CoursesForYou from "./home/CoursesForYou";
import HomeExtraInfo from "./home/HomeExtraInfo";
import SectionHero from "components/SectionHero/SectionHero";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import BrandSlider from "components/BrandSlider/BrandSlider";
import ContactForm from "components/ContactForm/ContactForm";
import PageHead from "containers/Head/PageHead";
import { useHistory } from "react-router-dom";
import { AuthContext } from "context/user/AuthContext";
import useWpContent from "hooks/useWpContent";
import WelcomeBox from "components/WelcomeBox";
import Phrase from "components/Phrase";
import ContainerSecondary from "components/Container/ContainerSecondary";
import Questions from "components/Questions";
import ReferenceSlider from "components/Sliders/ReferenceSlider";
import ReferenceCard from "components/ReferenceCard";
import HomeSkeleton from "components/Skeleton/HomeSkeleton";

const PageNewHome: React.FC = () => {
  const history = useHistory()
  const { state, loadingCourses, loadingPosts, loadingBestSellers } =
    useContext(DataContext);
    const {state: authState} = useContext(AuthContext)
  const { allCourses, allPosts, allBestSellers } = state;
  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);

  const { content, loading, error} = useWpContent("/home-msk")

  useEffect(() => {
    const redirectToTrial = localStorage.getItem("trialURL")

    if(redirectToTrial && authState.isAuthenticated){
      history.push(redirectToTrial)
    }

  }, []);

  useEffect(() => {
    const onlyCourses = allCourses.filter((course: any) => course.father_post_type === "course")
    setCourses(onlyCourses);
    setPosts(allPosts);
    setBestSeller(allBestSellers);
  }, [allCourses, allPosts, allBestSellers]);

  return (
    <div className="nc-PageNewHome relative animate-fade-down">
      {/* === SEO === */}
      <PageHead
        title="Cursos de medicina para expandir tus metas profesionales"
        description="Cursos de medicina para expandir tus metas profesionales"
        schemaJson={"WebSite"}
      />
      {/* === END SEO === */}
      <div className="relative overflow-hidden">
        {(loading ) ? (
                <HomeSkeleton />
            ) : (
                <section className="md:container">
                {(content != null && typeof content !== 'undefined') && (
                    <>
                     <div className="container relative">
                        <SectionHero
                            rightImg={content?.header.imagen as string}
                            className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
                            btnText="Comienza tu experiencia"
                            btnOnClick={() => history.push("/tienda")}
                            heading={content?.header.cabecera}
                        />
                    </div>

                    <WelcomeBox content={content} />
                    
                    <div className="container relative">
                        <BrandSlider />
                        <Phrase content={content?.cedentes.texto as string}/>

                        <SectionGridCategoryBox
                            headingCenter={false}
                            categories={HOME_SPECIALTIES.filter((_, i) => i < 4)}
                            categoryCardType="card2"
                            className="pb-16 lg:pb-28"
                        />
                        
                        <HomeExtraInfo />
                        </div>

                       <ContainerSecondary contentAttribute={content?.recomendaciones} >
                        <div className="flex flex-col  lg:grid lg:grid-cols-[30%_65%] lg:gap-x-8 lg:items-stretch justify-center mt-12">
                            
                            <div className="flex justify-center items-center flex-col bg-[#F6F7F8] border border-[#6474A6] rounded-xl py-4 px-4 mb-8 md:mb-0">
                                {content?.recomendaciones.items_1.map( (cri, index) => (
                                    <div key={index} className="mb-6">
                                        <h4 className="font-lora-italic text-[36px] text-[#392C35]">{cri.titulo}</h4>
                                        <p className="text-[18px] text-[#8D929E] max-w-[228px]">{cri.parrafo}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
                                {content?.recomendaciones.items_2.map((cri, index) => ( <ReferenceCard key={index} reference={cri} /> ))}
                            </div>

                            <ReferenceSlider references={content?.recomendaciones.items_2} />
                            
                        </div>
                       </ContainerSecondary>

                      <div className="container relative">
                        {/* === SECTION 3 === */}
                        <CoursesForYou
                            courses={courses}
                            bestSeller={bestSeller}
                            tabs={TABS_HOME}
                            loading={loadingCourses}
                            className="mb-[96px]"
                            heading="Oportunidades para ti"
                            desc="Cursos destacados para realizar a distancia"
                        />
                        <BlogSummary
                            posts={posts}
                            tabs={TABS_BLOG}
                            loading={loadingPosts}
                            heading="Blog"
                            className="mb-[96px]"
                            desc="Recursos para informarte y aprender de distintas maneras"
                            showTitle
                        />

                        <Questions content={content.preguntas_frecuentes} />
                        {/* === SECTION 6 === */}
                    </div>
                        <div className="rounded-[40px] bg-neutral-100 dark:bg-black dark:bg-opacity-20 relative py-16 mb-[96px] w-full px-14">
                            {/* <BackgroundSection /> */}
                            <SectionSliderPosts
                              posts={bestSeller}
                              loading={loadingBestSellers}
                              className="w-full"
                              postCardName="card9"
                              heading="Nuestros cursos más elegidos"
                              subHeading="Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!"
                              sliderStype="style2"
                              uniqueSliderClass="pageNewHome-section6"
                              />
                        </div>
                    </>
                )}
                </section>
        )}
        {/* ======= END CONTAINER ============= */}
        {/* === SECTION  === */}
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-4 my-16">
          <ContactForm />
        </div>
        {/* ======= END ALL SECTIONS ============= */}
      </div>
    </div>
  );
};

export default PageNewHome;
