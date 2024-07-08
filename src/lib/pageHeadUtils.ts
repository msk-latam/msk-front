export const getDescriptionContent = (
  isProd: boolean,
  customDesc?: string,
  desc?: string
) => {
  const text = customDesc || desc || "";

  return isProd ? stripHtmlTags(text) || "" : "";
};

import cheerio from 'cheerio';

export const stripHtmlTags = (html: string) => {
  const $ = cheerio.load(html);
  return $('body').text();
};