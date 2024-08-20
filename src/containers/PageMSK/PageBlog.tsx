import React, { useContext, useEffect, useState } from "react";
import SectionSliderPosts from "./home/SectionSliderPosts";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import HomeExtraInfo from "containers/PageMSK/home/HomeExtraInfo";
import BlogSummary from "./home/BlogSummary";
import { TABS_BLOG } from "data/MSK/blog";
import WelcomeBlog from "./blog/WelcomeBlog";
import Newsletter from "./blog/Newsletter";
import { FetchPostType } from "data/types";
import { DataContext } from "context/data/DataContext";
import PageHead from "containers/Head/PageHead";

const PageBlog: React.FC = () => {
  const { state, loadingCourses, loadingPosts, loadingBestSellers } =
    useContext(DataContext);
  const { allCourses, allPosts, allBestSellers } = state;
  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setCourses(allCourses);
    setPosts(allPosts);
  }, [allCourses, allPosts, allBestSellers]);

  const welcomePosts = posts.filter((p: FetchPostType, i) => i < 4);

  return (
    <div className="nc-PageHome relative animate-fade-down">
      <PageHead title="Blog" />
      {/* ======== ALL SECTIONS ======== */}
      <div className="relative overflow-hidden">
        {/* ======== BG GLASS ======== */}
        {/* ======= START CONTAINER ============= */}
        <div className="container relative">
          {/* === SECTION  === */}
          <WelcomeBlog
            tabs={[]}
            heading=""
            posts={welcomePosts}
            loading={loadingPosts}
          />
          <BlogSummary
            posts={posts}
            tabs={TABS_BLOG}
            loading={loadingPosts}
            className="py-16 lg:py-28"
            heading=""
            desc=""
          />
          <HomeExtraInfo />
          {/* <Tendencies className="mt-24" /> */}
          <div className="relative py-16 my-12">
            <BackgroundSection />
            <SectionSliderPosts
              posts={courses}
              loading={loadingCourses}
              postCardName="card9"
              heading="¿Buscas capacitarte a distancia?"
              subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
              sliderStype="style2"
              uniqueSliderClass="pageHome-section6"
            />
          </div>
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default PageBlog;
