import Page404 from "@/components/Page404";

export async function generateMetadata() {
  return {
    title: "MSK | No encontrado",
    description: "Una propuesta moderna para expandir tus metas profesionales",
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function NotFound() {
  return <Page404 />;
}
