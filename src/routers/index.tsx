import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Page404 from "containers/Page404/Page404";
import PageProfile from "containers/PageMSK/PageProfile";
import PageAccount from "containers/PageMSK/PageAccount";
import PageLogin from "containers/PageMSK/PageLogin";
import PageSignUp from "containers/PageMSK/PageSignUp";
import PageForgotPass from "containers/PageMSK/PageForgotPass";
import HeaderContainer from "containers/HeaderContainer/HeaderContainer";
import MediaRunningContainer from "containers/MediaRunningContainer/MediaRunningContainer";
import PageHome from "containers/PageMSK/PageHome";
import PageContact from "containers/PageMSK/PageContact";
import FooterEduman from "components/Footer/FooterMSK";
import PageStore from "containers/PageMSK/PageStore";
import PageSingleProduct from "containers/PageSingleProduct/PageSingleProduct";
import PageMission from "containers/PageMSK/PageMission";
import PageBlog from "containers/PageMSK/PageBlog";
import PageThankYou from "containers/PageMSK/PageThankYou";
import PageNota from "containers/PageMSK/PageNota";
import { CountryContext } from "context/country/CountryContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/user/AuthContext";
import PageArchive from "containers/PageMSK/blog/Archive";
import PageEmailSent from "containers/PageMSK/PageEmailSent";
import PageNewPassword from "containers/PageMSK/PageNewPassword";
import PagePoliticsPrivacy from "containers/PageMSK/PagePoliticsPrivacy";
import PageTyC from "containers/PageMSK/PageTyC";
import PageCookies from "containers/PageMSK/PageCookies";
import PageContractConditions from "containers/PageMSK/PageContractConditions";
import PageCancelSubscription from "containers/PageMSK/profile/PageCancelSubscription";
import PageNewsletter from "containers/PageMSK/PageNewsletter";
import PageTrial from "containers/PageMSK/PageTrial";
import PageTrialSuscribe from "containers/PageMSK/PageTrialSuscribe";
import PageNewHome from "containers/PageMSK/PageNewHome";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageNewHome, auth: false },
  { path: "/#", exact: true, component: PageNewHome, auth: false },
  { path: "/mision", component: PageMission, auth: false },
  { path: "/quienes-somos", component: PageMission, auth: false },
  { path: "/tienda", component: PageStore, auth: false },
  { path: "/contacto", component: PageContact, auth: false },
  { path: "/newsletter", component: PageNewsletter, auth: false },
  { path: "/trial/:slug", component: PageTrial, auth: false },
  { path: "/suscribe/:slug", component: PageTrialSuscribe, auth: true },
  { path: "/curso/:slug", component: PageSingleProduct, auth: false },
  // { path: "/page404", component: Page404, auth: false },
  { path: "/blog", exact: true, component: PageBlog, auth: false },
  { path: "/blog/:slug", component: PageNota, auth: false },
  { path: "/archivo", component: PageArchive, auth: false },
  { path: "/iniciar-sesion", component: PageLogin, auth: false },
  { path: "/crear-cuenta", component: PageSignUp, auth: false },
  { path: "/cancelar-suscripcion", component: PageCancelSubscription, auth: false },
  { path: "/recuperar", component: PageForgotPass, auth: false },
  { path: "/change-pass/:token", component: PageNewPassword, auth: false },
  { path: "/correo-enviado", component: PageEmailSent, auth: false },
  { path: "/mi-cuenta", component: PageAccount, auth: true },
  { path: "/mi-perfil", component: PageProfile, auth: true },
  { path: "/gracias", component: PageThankYou, auth: false },
  {
    path: "/politica-de-privacidad",
    component: PagePoliticsPrivacy,
    auth: false,
  },
  { path: "/bases-promocionales", component: PageTyC, auth: false },
  { path: "/politica-de-cookies", component: PageCookies, auth: false },
  {
    path: "/terminos-y-condiciones",
    component: PageContractConditions,
    auth: false,
  },
];

const Routes = () => {
  const { state } = useContext(CountryContext);
  const authContext = useContext(AuthContext);
  const [country, setCountry] = useState(state.country);
  const { isAuthenticated } = authContext.state;
  const location = window.location;

  const authenticatedRoutes = pages.filter((page) => {
    if (page.auth && isAuthenticated) {
      return true;
    }
    if (!page.auth) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    setCountry(state.country);
    if (
      (location.pathname.includes("mi-perfil") ||
        location.pathname.includes("mi-cuenta") || 
        location.pathname.includes("suscribe")) &&
      !isAuthenticated &&
      !localStorage.getItem("token")
    ) {
      window.location.href = "/" + state.country + "/iniciar-sesion";
    }
  }, [state.country]);

  return (
    <BrowserRouter basename={`/${country}`}>
      <MediaRunningContainer />
      <ScrollToTop />
      <HeaderContainer />
      <Switch>
        {authenticatedRoutes.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
      <FooterEduman />
    </BrowserRouter>
  );
};

export default Routes;
