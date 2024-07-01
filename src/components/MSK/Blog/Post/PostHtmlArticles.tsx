"use client";
import React, { FC } from "react";
import NoteExtraData from "./NoteExtraData";
import { slugify } from "@/lib/Slugify";
import { parseHtml } from "@/utils/parseHTML";

export interface PostHtmlArticlesProps {
  articles: { title: string | null; content: string }[];
  featured_text_field?: string;
}

const PostHtmlArticles: FC<PostHtmlArticlesProps> = ({
  articles,
  featured_text_field,
}) => {
  return (
    <ul className="themes-to-see">
      {articles?.map((art, index) => {
        return (
          <li
            key={`content_${slugify(art.title)}_${index}`}
            className="p-0 md:p-0"
          >
            <h3 id={slugify(art.title)} className="text-3xl md:text-3xl">
              {art.title}
            </h3>
            {
              <div
                key={index}
                className="font-lora text-xl lg:pr-20"
                dangerouslySetInnerHTML={{ __html: parseHtml(art.content) }}
              />
            }
            {index == 0 && (
              <NoteExtraData featured_text={featured_text_field} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default PostHtmlArticles;
