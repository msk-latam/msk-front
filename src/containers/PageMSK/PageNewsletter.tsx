import LayoutPage from "components/LayoutPage/LayoutPage";
import { FC } from "react";
import FooterNewsletter from "components/Footer/Newsletter";
import PageHead from "containers/Head/PageHead";

export interface PageProps {
  className?: string;
}

const PageNewsletter: FC<PageProps> = ({ className = "" }) => {

  return (
    <div
      className={`nc-PageDashboard ${className} animate-fade-down`}
      data-nc-id="PageDashboard"
    >
      <PageHead title="Nuestro Newsletter" />
      <LayoutPage
        heading="Nuestro Newsletter"
        subHeading="Suscrí­bete para acceder a descuentos exclusivos, becas completas y contenido personalizado"
      >
        <FooterNewsletter email="" setShow={() => true} />
      </LayoutPage>
    </div>
  );
};

export default PageNewsletter;
