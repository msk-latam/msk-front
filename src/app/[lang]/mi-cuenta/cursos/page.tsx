"use client";
import AccountCourses from "@/components/MSK/account/AccountCourses";
import { ComponentType, FC, useContext, useEffect, useState } from "react";
import { User, UserCourseProgress } from "@/data/types";
import { AuthContext } from "@/context/user/AuthContext";
import api from "@/services/api";
import { getUserCourses } from "@/services/user";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import {CountryContext} from "@/context/country/CountryContext";

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

  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState<User>({} as User);
  const { countryState: countryState } = useContext(CountryContext);

  const [courses, setCourses] = useState<UserCourseProgress[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [state?.profile]);

  const fetchUser = async () => {
    setLoading(true);
    const res = await api.getUserData();
    const coursesList = await api.getAllCourses(countryState.country);
    if (!res.message) {
      if (!res.contact.state) res.contact.state = "";
      setUser(res);
      dispatch({
        type: "FRESH",
        payload: {
          user: { name: res.name, speciality: res.contact.speciality },
        },
      });
      let userCoursesList = getUserCourses(res, coursesList);
      setCourses(userCoursesList);
      setLoading(false);
    } else {
      // history.push("/iniciar-sesion");
    }
  };

  return (
    <div
      className={`nc-PageDashboard animate-fade-down ${className}`}
      data-nc-id="PageDashboard"
    >
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <AccountCourses courses={courses} email={user?.contact?.email!} />
      )}
    </div>
  );
};

export default PageDashboard;
