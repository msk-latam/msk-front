import React, { FC } from "react";
import CardAuthor2 from "@/components/CardAuthor2/CardAuthor2";
import NoteAuthors from "@/components/SingleProductDetail/NoteAuthors";
import NoteExtraData from "./NoteExtraData";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import { slugify } from "@/lib/Slugify";
import SingleContentSidebarFixedItem from "./SingleContentSidebarFixedItem";
import PostHtmlArticles from "./PostHtmlArticles";
import { SinglePageType } from "@/data/types";

export interface SingleContentProps {
  data: SinglePageType;
  sources?: { fuente: string }[];
  bestSellers?: any[];
  fiveSpecialtiesGroup?: any[];
}

const SingleContent: FC<SingleContentProps> = ({
  data,
  sources,
  bestSellers,
  fiveSpecialtiesGroup,
}) => {
  const { author, date, reading_time, articles } = data;
  const [noteIntroduction, ...noteArticles] = articles;

  return (
    <div className="container nc-SingleContent  relative space-y-10 mb-16">
      <div className="container grid grid-cols-12 gap-4">
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
                        className="text-primary text-lg"
                        href={`#${slugify(art.title)}`}
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
            <PostHtmlArticles
              articles={noteArticles}
              featured_text_field={data.featured_text_field}
            />
            <NoteExtraData suggest_content={data.suggest_content} />
            <div>
              <h4 className="source-title font-poppins">Fuente/s:</h4>
              {sources && sources.length > 0
                ? sources.map((source, index) => {
                    return (
                      <p
                        key={`source_${index}`}
                        className="source-content lg:pr-20 break-words font-poppins"
                      >
                        {source.fuente}
                      </p>
                    );
                  })
                : null}
            </div>
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
          <SingleContentSidebarFixedItem
            articles={data.articles}
            the_most_read={data.the_most_read}
            fiveSpecialtiesGroup={fiveSpecialtiesGroup}
          />
        </div>
      </div>
      <div className="container relative py-16">
        <BackgroundSection />
        <SectionSliderPosts
          posts={bestSellers}
          postCardName="card9"
          heading="Nuestros cursos más elegidos"
          subHeading="Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!"
          sliderStype="style2"
          uniqueSliderClass="article-most-picked-courses"
        />
      </div>
    </div>
  );
};

export default SingleContent;
