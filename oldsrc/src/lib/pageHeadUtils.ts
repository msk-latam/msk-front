export const getDescriptionContent = (
  isProd: boolean,
  customDesc?: string,
  desc?: string,
) => {
  const text = customDesc || desc || '';

  return isProd ? stripHtmlTags(text) || '' : '';
};

export const stripHtmlTags = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};
