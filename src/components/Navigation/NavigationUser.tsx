import { Popover, Transition } from "@headlessui/react";
import Avatar from "@/components/Avatar/Avatar";
import ModalSignOut from "@/components/Modal/SignOut";
import { AuthContext } from "@/context/user/AuthContext";
import {Fragment, useContext, useEffect, useState} from "react";
import NcLink from "../NcLink/NcLink";
import NcImage from "../NcImage/NcImage";
import { CountryContext } from "@/context/country/CountryContext";

const NavigationUser = () => {
  const { state } = useContext(AuthContext);
  const { countryState: countryState } = useContext(CountryContext);
  const { dispatch } = useContext(AuthContext);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalLogout = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePopoverOpen = () => {
    setPopoverOpen((prev) => !prev);
  };

  const urlPre = countryState.country ? `/${countryState.country}` : "";

  useEffect(() => {
    const handleScroll = () => {
      // Verificar si el Popover está abierto y se ha hecho scroll
      if (popoverOpen) {
        // Cerrar el Popover al hacer scroll
        setPopoverOpen(false);
      }
    };

    // Agregar el evento de scroll al componente de nivel superior (puede ser <body> o <html>)
    document.addEventListener("scroll", handleScroll);

    // Limpiar el efecto cuando el componente se desmonte
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [popoverOpen]);

  return (
    <>
      {state.isAuthenticated ? (
        <div className="AvatarDropdown">
          <Popover className="relative">
            <>
              <Popover.Button
                className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                onClick={() => handlePopoverOpen()}
              >
                <NcImage
                  src={"/images/icons/profile.svg"}
                  alt="Profile icon"
                  className="ml-4 mt-2"
                  width="25"
                  height="25"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
                show={popoverOpen}
              >
                <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3 -right-10 sm:right-0 sm:px-0">
                  {({ close }) => (
                    <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                        <div className="flex items-center space-x-3">
                          <Avatar
                            containerClassName="dark:ring-0 shadow-2xl"
                            userName={state?.user?.name}
                            sizeClass="w-12 h-12"
                            radius="rounded-full"
                          />
                          <div className="flex-grow">
                            <h4 className="font-semibold">
                              {state?.user?.name || "-"}
                            </h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {state?.user?.speciality || "-"}
                            </p>
                          </div>
                        </div>

                        <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                        {/* ------------------ 1 --------------------- */}
                        <NcLink
                          onClick={() => handlePopoverOpen()}
                          href={`${urlPre}/mi-perfil`}
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300 w-[20px]">
                            <NcImage
                              src={"/images/icons/profile.svg"}
                              alt="Profile Icon"
                              width="20"
                              height="20"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-neutral-500">
                              {"Mi Perfil"}
                            </p>
                          </div>
                        </NcLink>

                        {/* ------------------ 2 --------------------- */}

                        <NcLink
                          onClick={ () => handlePopoverOpen()}
                          href={`${urlPre}/mi-cuenta/inicio`}
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <NcImage
                              src={"/images/icons/config-account.svg"}
                              alt="config account icon"
                              width="20"
                              height="20"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-neutral-500">
                              {"Configurar mi cuenta"}
                            </p>
                          </div>
                        </NcLink>

                        <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                        {/* ------------------ 2 --------------------- */}
                        <button
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          onClick={handleModalLogout}
                        >
                          <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                            <NcImage
                              src={"/images/icons/logout.svg"}
                              alt="Logout icon"
                              width="20"
                              height="20"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium">Cerrar Sesión</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </Popover.Panel>
              </Transition>
              <ModalSignOut
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </>
          </Popover>
        </div>
      ) : null}
    </>
  );
};

export default NavigationUser;
