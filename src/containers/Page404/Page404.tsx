import ButtonPrimary from "components/Button/ButtonPrimary";
import { useState, useEffect, useContext } from "react";
import ImageSkeleton from "components/Skeleton/ImageSkeleton";
import TitleSkeleton from "components/Skeleton/TitleSkeleton";
import notFoundImg from "/images/404-msk.png";
import PageHead from "../../containers/Head/PageHead";
import { AuthContext } from "context/user/AuthContext";
import { isNull } from "lodash";
import { useHistory } from "react-router-dom";

const Page404 = () => {
  const {state} = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean | null>(true);
  const history = useHistory();
  
  useEffect(() => {
    let counterIntents = 0;

    const timeout = setTimeout(() => {
      counterIntents++;

    if(Boolean(state.onRequest) == false && !isNull(state.onRequest)){
      setLoading(false);
    }

    if(!state.isAuthenticated && (state.onRequest != null && !Boolean(state.onRequest))){
      setLoading(false);
      history.push("/iniciar-sesion")
    }

    if(counterIntents >= 3){
      setLoading(false);
    }

    }, 1500); 
    

    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <>
      {loading ? (
        <div className="container text-center">
          <div className="py-16">
            <TitleSkeleton className="mb-10" />
            <ImageSkeleton height="300px" />
          </div>
        </div>
      ) : (
        <div className="nc-Page404 animate-fade-down">
          <PageHead title="No encontrado" />
          <div className="container relative py-16 lg:py-20">
            {/* HEADER */}
            <header className="text-center max-w-2xl mx-auto space-y-7">
              <img
                src={notFoundImg}
                alt="No encontrado"
                className="object-center mx-auto"
              />
              <h6 className="text-md font-medium font-inter tracking-widest text-violet-wash">
                Ha habido un error
              </h6>
              <h1 className="block text-3xl text-neutral-800 whitespace-pre-wrap dark:text-neutral-200 tracking-wider font-bold">
                En estos momentos no se <br /> puede abrir esta página
              </h1>
              <ButtonPrimary
                href="/"
                className="mt-4 mr-3 border border-solid border-violet-custom hover:border-red-500"
              >
                Volver al inicio
              </ButtonPrimary>

              <ButtonPrimary
                onClick={() => window.history.back()}
                className="mt-4 px-5 text-violet-custom bg-transparent border border-solid border-violet-custom hover:border-red-500"
              >
                Atrás
              </ButtonPrimary>
            </header>
          </div>
        </div>
      )}
    </>
  );
};

export default Page404;
