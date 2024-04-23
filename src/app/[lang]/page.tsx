import { TABS_HOME } from "@/data/MSK/courses";
import { TABS_BLOG } from "@/data/MSK/blog";
import { HOME_SPECIALTIES } from "@/data/MSK/specialties";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import BlogSummary from "@/components/MSK/BlogSummary";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import CoursesForYou from "@/components/MSK/CoursesForYou";
import HomeExtraInfo from "@/components/MSK/HomeExtraInfo";
import SectionHero from "@/components/SectionHero/SectionHero";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import BrandSlider from "@/components/MSK/BrandSlider";
import { cookies } from "next/headers";
import ssr from "../../../Services/ssr";
import {
  getAllBestSellers,
  getAllCourses,
  getAllPosts,
  isLoadingBestSellers,
  isLoadingCourses,
  setAllBestSellers,
  setAllCourses,
  setAllPosts,
  setPageHomeWpContent,
  pageHomeWpContent,
} from "@/lib/allData";
import ContactForm from "@/components/MSK/ContactForm";
import { generateSchemaJson } from "@/lib/pageSchemaJson";
import Script from "next/script";
import { removeFirstSubdomain } from "@/utils/removeFirstSubdomain";
import WelcomeBox from "@/components/WelcomeBox/WelcomeBox";
import {FetchCourseType, WpContentData} from "@/data/types";
import Phrase from "@/components/Phrase/Phrase";
import CommentReferences from "@/components/CommentReferences";
import Questions from "@/components/Questions/Questions";

interface PageProps {
  params: any;
}

export interface FAQS{ texto: string; items: { titulo: string; parrafo: string;}[];}

const PageHome: React.FC<PageProps> = async ({ params }) => {
  const currentCountry = params.lang || cookies().get("country")?.value;

  if (!getAllCourses().length) {
    const fetchedCourses = await ssr.getAllCourses(currentCountry);
    setAllCourses(fetchedCourses);
  }
  if (!getAllBestSellers().length) {
    const fetchedBestSellers = await ssr.getBestSellers(currentCountry);
    setAllBestSellers(fetchedBestSellers);
  }
  if (!getAllPosts() || !getAllPosts().length) {
    const fetchedPosts = await ssr.getPosts(currentCountry);
    setAllPosts(fetchedPosts);
  }

  const fetchedContent = await ssr.getWpContent("/home-msk",currentCountry);
  setPageHomeWpContent(fetchedContent);


  const jsonLd = generateSchemaJson("WebSite");
  const heroTitle = pageHomeWpContent?.header.cabecera || ''
  const heroImage = pageHomeWpContent?.header.imagen || ''

  return (
      <div className="nc-PageHome relative animate-fade-down">
        <Script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>

        <div className="relative overflow-hidden">
          <div className="container relative">
            <SectionHero
                rightImg={removeFirstSubdomain(heroImage)}
                className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
                btnText="Comienza tu experiencia"
                redirectUrl="/tienda"
                heading={heroTitle}
            />
          </div>
          <WelcomeBox content={pageHomeWpContent as WpContentData}/>

          <div className="container relative">
            <BrandSlider/>
            <Phrase content={pageHomeWpContent?.cedentes.texto as string}/>
            <SectionGridCategoryBox
                headingCenter={false}
                categories={HOME_SPECIALTIES.filter((_, i) => i < 4)}
                categoryCardType="card2"
                className="pb-16 lg:pb-28"
            />

            <HomeExtraInfo country={currentCountry}/>
          </div>
          <CommentReferences content={pageHomeWpContent as WpContentData}/>
          <div className="container relative">
            <CoursesForYou
                courses={getAllCourses().filter((course: FetchCourseType) => course.father_post_type === 'course')}
                bestSeller={getAllBestSellers()}
                tabs={TABS_HOME}
                className="py-16"
                heading="Oportunidades para ti"
                desc="Cursos destacados para realizar a distancia"
                loading={isLoadingCourses() || isLoadingBestSellers()}
            />
            <BlogSummary
                posts={getAllPosts()}
                tabs={TABS_BLOG}
                className="py-16 "
                heading=""
                desc="Recursos para informarte y aprender de distintas maneras"
                showTitle
                forSingleNote={false}
            />

            <Questions content={pageHomeWpContent?.preguntas_frecuentes as FAQS}/>


          </div>
          <div className="relative py-16 px-6">
            <BackgroundSection/>
            <SectionSliderPosts
                posts={getAllBestSellers()}
                postCardName="card9"
                heading="Nuestros cursos más elegidos"
                subHeading="Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!"
                sliderStype="style2"
                uniqueSliderClass="pageHome-section6"
            />
          </div>
          <div className="container grid grid-cols-1 md:grid-cols-3 gap-4 my-16">
            <ContactForm/>
          </div>
        </div>
      </div>
  );
};

export default PageHome;
