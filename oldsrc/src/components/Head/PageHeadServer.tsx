import { getDescriptionContent } from "@/lib/pageHeadUtils";
import { generateSchemaJson } from "@/lib/pageSchemaJson";
import { FC } from "react";

interface PageHeadServerProps {
  title: string;
  description?: string;
  prioryTitle?: string;
  customDescription?: string;
  schemaJson?: string;
  schemaJsonData?: any | null;
}

const PageHeadServer: FC<PageHeadServerProps> = ({
  title,
  description,
  prioryTitle,
  customDescription,
  schemaJson = "",
  schemaJsonData = null,
}) => {
  const descriptionContent = getDescriptionContent(
    false,
    customDescription,
    description
  );

  const schema = generateSchemaJson(schemaJson, schemaJsonData);
  return (
    <Head>
      <title>{`${prioryTitle || title} | MSK`}</title>
      <meta name="description" content={descriptionContent} />
      <meta name="theme-color" content="#008f68" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Head>
  );
};
export default PageHeadServer;
