"use client";
import AccountHome from "@/components/MSK/account/AccountHome";
import { FC, useContext, useEffect, useState } from "react";
import { User } from "@/data/types";
import { AuthContext } from "@/context/user/AuthContext";
import api from "@/services/api";

export interface PageDashboardProps {
  className?: string;
}
const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    fetchUser();
  }, [state?.profile?.contact?.courses_progress]);

  const fetchUser = async () => {
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
    } else {
      // history.push("/iniciar-sesion");
    }
  };

  return (
    <div
      className={`nc-PageDashboard animate-fade-down ${className}`}
      data-nc-id="PageDashboard"
    >
      <AccountHome name={user?.contact?.name!} />
    </div>
  );
};

export default PageDashboard;
