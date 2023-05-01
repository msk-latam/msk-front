import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { ComponentType, FC } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import AccountPayment from "./account/AccountPayment";
import AccountPersonalData from "./account/AccountPersonalData";
import AccountCourses from "./account/AccountCourses";
import AccountHome from "./account/AccountHome";
import { Helmet } from "react-helmet";

export interface PageDashboardProps {
  className?: string;
}

interface DashboardLocationState {
  "/inicio"?: {};
  "/cursos"?: {};
  "/perfil"?: {};
  "/metodo-pego"?: {};
  "/cerrar-sesion"?: {};
}

interface DashboardPage {
  sPath: keyof DashboardLocationState;
  exact?: boolean;
  component: ComponentType<Object>;
  icon: string;
  pageName: string;
}

const subPages: DashboardPage[] = [
  {
    sPath: "/inicio",
    exact: true,
    component: AccountHome,
    icon: "home",
    pageName: "Inicio",
  },
  {
    sPath: "/cursos",
    component: AccountCourses,
    icon: "file",
    pageName: "Mis cursos",
  },
  {
    sPath: "/perfil",
    component: AccountPersonalData,
    icon: "personal-data",
    pageName: "Datos personales",
  },
  {
    sPath: "/metodo-pego",
    component: AccountPayment,
    icon: "payment",
    pageName: "Método de pago",
  },
  {
    sPath: "/cerrar-sesion",
    component: AccountPayment,
    icon: "session",
    pageName: "Cerrar sesión",
  },
];

const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
  let { path, url } = useRouteMatch();

  return (
    <div className={`nc-PageDashboard ${className}`} data-nc-id="PageDashboard">
      <Helmet>
        <title>Mi cuenta</title>
      </Helmet>
      <LayoutPage
        heading="Mi cuenta"
        subHeading="Aquí podrás controlar todo lo referido a tus capacitaciones y tu perfil personal"
      >
        <div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
          {/* SIDEBAR */}

          <div className="flex-shrink-0 max-w-xl xl:w-80 xl:pr-8">
            <ul className="text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              {subPages.map(({ sPath, pageName, icon }, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      className="flex px-6 py-2.5 font-medium rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                      to={`${url}${sPath}`}
                      activeClassName="bg-red-400 dark:bg-neutral-800 text-neutral-100 dark:text-neutral-100 invert-image"
                    >
                      <img
                        src={`/src/images/icons/${icon}.svg`}
                        width="16"
                        className="mr-2"
                      />
                      {pageName}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border border-neutral-100 dark:border-neutral-800 md:hidden"></div>
          <div className="flex-grow">
            <Switch>
              {subPages.map(({ component, sPath, exact }, index) => {
                return (
                  <Route
                    key={index}
                    exact={exact}
                    component={component}
                    path={!!sPath ? `${path}${sPath}` : path}
                  />
                );
              })}
              <Redirect to={path + "/inicio"} />
            </Switch>
          </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageDashboard;