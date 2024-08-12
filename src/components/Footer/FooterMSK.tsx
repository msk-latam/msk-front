import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import bts from "../../styles/bts.module.css";
import NcModal from "components/NcModal/NcModal";
import FooterNewsletter from "./Newsletter";
import { CountryContext } from "context/country/CountryContext";

const FooterEduman = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [isOnBlog, setIsOnBlog] = useState(false);
  const { state } = useContext(CountryContext);
 
  const scrollToContactForm = () => {
    const contactForm = document.getElementById("contactanos");
    if (contactForm) {
      window.scrollTo({
        top: document.getElementById("contactanos")!.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const openModal = (e: any) => {
    e.preventDefault();
    setShow(true);
  };

  const location = useLocation();

  useEffect(() => {
    setIsOnBlog(location.pathname == "/blog");
  }, [location.pathname]);

  return (
    <footer>
      <div className="footer-area">
        <div className={bts.container}>
          {isOnBlog ? null : (
            <div className="copyright-area grid grid-cols-1 md:grid-cols-6 items-center sm:gap-1 mb-6">
              <div className="footer-column col-span-6 md:mx-auto text-center md:text-left lg:col-span-1">
                <div className="copyright-text">
                  <p>Nuestro newsletter</p>
                </div>
              </div>
              <div className="footer-column col-span-6 mx-auto lg:col-span-2">
                <div className="divisor" />
                <p className="discounts md:mx-auto text-center md:text-left text-[16px] sm:text-[18px] leading-5 sm:leading-6">
                  Descuentos exclusivos y becas completas solo con tu
                  suscripción
                </p>
                <div className="divisor" />
              </div>
              <div className="footer-column col-span-6 md:mx-auto text-center md:text-left lg:col-span-3">
                <div className="copyright-subcribe ">
                  <form
                    onSubmit={openModal}
                    method="post"
                    className="widget__subscribe"
                  >
                    <div className="field ">
                      <input
                        type="email"
                        name="Email"
                        placeholder="Ingresar e-mail"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button type="submit" disabled={show} className="disabled:bg-grey-disabled">
                      Suscribirme
                      <img src="/images/icons/plane.svg" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className="footer-main">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className={`col-span-1 footer-col-1`}>
                <div className="footer-widget f-w1 mb-20">
                  <div className="footer-img grid-cols-1 align-center content-center">
                    <Link to="/">
                      <img
                        src="/images/msk-logo-light.svg"
                        alt="footer-logo"
                        width="150"
                      />
                    </Link>
                    <p className="footer-copyright">
                      Una propuesta moderna que desafía a expandir las metas
                      profesionales
                    </p>
                    <p>© 2024 • Medical&Scientific Knowledge S.L.</p>
                  </div>
                  <div className="footer-icon ml-auto">
                    <a
                      href="https://www.facebook.com/msk.online.learning"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/images/icons/fb.svg" />
                    </a>
                    <a
                      href="https://www.instagram.com/msk.latam"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/images/icons/ig.svg" />
                    </a>
                    <a
                      href="https://www.youtube.com/@msk.online.learning"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/images/icons/yt.svg" className="pt-0.5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/msk-online-learning/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/images/icons/in.svg" />
                    </a>
                  </div>
                </div>
              </div>
              <div className={`grid grid-cols-2 col-span-2`}>
                <div className={`col-span-1`}>
                  <div className="footer-widget f-w3 mt-6">
                    <ul className="text-sm md:text-base">
                      <li>
                        <Link to="/mision">Nuestra misión</Link>
                      </li>
                     {/*  <li>
                        <Link to="/partners">Conviértete en Partner</Link>
                      </li> */}

                      <li>
                        <Link to="/quienes-somos">Quiénes somos</Link>
                      </li>
                      <li>
                        <a href="https://ayuda.msklatam.com/" target="_blank">
                          Centro de ayuda
                        </a>
                      </li>
                      {/* <li>
                        <Link to="/convenios">Convenios</Link>
                      </li> */}

                      {state.country.includes("ec") && (
                        <li>
                          <Link to="/cancelar-suscripcion">
                            Arrepentimiento de compra
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className={`col-span-1`}>
                  <div className="footer-widget f-w4 mt-6">
                    <ul className="text-sm md:text-base">
                      <li>
                        <Link to="/contacto">Contacto</Link>
                      </li>
                      <li>
                        <Link to="/bases-promocionales">
                          Bases promocionales
                        </Link>
                      </li>
                      <li>
                        <Link to="/politica-de-privacidad">
                          Política de privacidad
                        </Link>
                      </li>
                      <li>
                        <Link to="/politica-de-cookies">
                          Política de cookies
                        </Link>
                      </li>
                      <li>
                        <Link to="/terminos-y-condiciones">
                          Términos y condiciones
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NcModal
        isOpenProp={show}
        onCloseModal={() => {
          setShow(false);
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-screen-lg"
        renderContent={() => (
          <FooterNewsletter email={email} setShow={setShow} />
        )}
        modalTitle="Nuestro Newsletter"
        modalSubtitle="Suscrí­bete para acceder a descuentos exclusivos, becas completas y contenido personalizado"
      />
    </footer>
  );
};

export default FooterEduman;
