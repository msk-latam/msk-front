import LayoutPage from "components/LayoutPage/LayoutPage";
import { ComponentType, FC, useContext, useEffect, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import AccountPersonalData from "./account/AccountPersonalData";
import AccountCourses from "./account/AccountCourses";
import AccountHome from "./account/AccountHome";
import { Helmet } from "react-helmet";
import { User, UserCourseProgress } from "data/types";
import api from "Services/api";
import { useHistory } from "react-router-dom";
import LoadingText from "components/Loader/Text";
import ModalSignOut from "components/Modal/SignOut";
import { getUserCourses } from "Services/user";
import { AuthContext } from "context/user/AuthContext";
import { DataContext } from "context/data/DataContext";
import PageHead from "containers/Head/PageHead";

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

const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const { state: dataState } = useContext(DataContext);
  const { allCourses, allProductsMX } = dataState;
  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState<User>({} as User);
  const [courses, setCourses] = useState<UserCourseProgress[]>(
    [] as UserCourseProgress[]
  );
  const [isLoading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //setCourses(allProductsMX);
    fetchUser();
  }, [allProductsMX, state?.profile?.contact?.courses_progress]);

  const handleModalLogout = () => {
    setIsModalOpen(!isModalOpen);
  };

  const subPages: DashboardPage[] = [
    {
      sPath: "/inicio",
      exact: true,
      component: () => <AccountHome name={user?.contact?.name!} />,
      icon: "home",
      pageName: "Inicio",
    },
    {
      sPath: "/cursos",
      component: () => (
        <AccountCourses courses={courses} email={user?.contact?.email!} />
      ),
      icon: "file",
      pageName: "Mis cursos",
    },
    {
      sPath: "/perfil",
      component: () => <AccountPersonalData user={user} setUser={setUser} />,
      icon: "personal-data",
      pageName: "Datos personales",
    },
  ];

  const fetchUser = async () => {
    setLoading(true);

    const res = await api.getUserData();
    if (!res.message) {
      if (!res.contact.state) res.contact.state = "";
      setUser(res);
      dispatch({
        type: "FRESH",
        payload: {
          user: { name: res.name, speciality: res.contact.speciality },
        },
      });
      let coursesList = getUserCourses(res, allProductsMX);
      setCourses(coursesList);
      setLoading(false);
    } else {
      history.push("/iniciar-sesion");
    }
  };

  return (
    <div
      className={`nc-PageDashboard animate-fade-down ${className}`}
      data-nc-id="PageDashboard"
    >
      <PageHead title="Mi cuenta" />
      <LayoutPage
        heading="Mi cuenta"
        subHeading="Aquí podrás controlar todo lo referido a tus capacitaciones y tu perfil personal"
      >
        <div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
          {/* SIDEBAR */}

          <div className="flex-shrink-0 w-100 xl:w-80 xl:pr-8">
            <ul className="text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              {subPages.map(({ sPath, pageName, icon }, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      className="flex px-6 py-2.5 rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 account-menu-item"
                      to={`${url}${sPath}`}
                      activeClassName="bg-red-400 dark:bg-neutral-800 text-neutral-100 dark:text-neutral-100 invert-image active-account-menu-item"
                    >
                      <img
                        src={`/images/icons/${icon}.svg`}
                        width="16"
                        className="mr-2 menu-profile-icon"
                      />
                      {pageName}
                    </NavLink>
                  </li>
                );
              })}
              <li className="cursor-pointer">
                <a href="https://ayuda.msklatam.com/" target="_blank">
                  <span className="flex px-6 py-2.5 rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100">
                    <img
                      src={`/images/icons/faq.svg`}
                      width="16"
                      className="mr-2"
                    />
                    Centro de ayuda
                  </span>
                </a>
              </li>
              <li className="cursor-pointer" onClick={handleModalLogout}>
                <span className="flex px-6 py-2.5 rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100">
                  <img
                    src={`/images/icons/session.svg`}
                    width="16"
                    className="mr-2"
                  />
                  Cerrar Sesión
                </span>
              </li>
            </ul>
          </div>
          <div className="border border-neutral-100 dark:border-neutral-800 md:hidden"></div>
          <div className="flex-grow">
            {isLoading ? (
              <div className="border-2 border-grey-300 p-6 rounded-md">
                <LoadingText />
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </LayoutPage>
      <ModalSignOut open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PageDashboard;
