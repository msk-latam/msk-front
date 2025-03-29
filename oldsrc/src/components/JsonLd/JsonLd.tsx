import { FC } from "react";

interface JsonLdProps{
  content: string;
}

const JsonLd: FC<JsonLdProps> = ({ content }) => {
  return (
      <script type="application/ld+json">{content}</script>
  );
};

export default JsonLd;

