"use client";
import React, { useEffect, useRef, useState } from "react";
import LayoutPage from "@/components/MSK/LayoutPage";
import Link from "next/link";
import {
  isFormDisabled,
  setDependent,
  zsRegenerateCaptcha,
} from "@/components/Containers/profile/arrepentimientoCompra";

const argDocumentTypes = [
  {
    slug: "CÉDULA",
    title: "CÉDULA",
  },
  {
    slug: "Pasaporte",
    title: "Pasaporte",
  },
  {
    slug: "RUC",
    title: "RUC",
  },
];

export interface PageCancelSubscriptionProps {
  className?: string;
}

const PageCancelSubscription: React.FC<PageCancelSubscriptionProps> = ({
                                                                         className = "",
                                                                       }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formDisabled, setFormDisabled] = useState(true);

  useEffect(() => {
    setTimeout(() => zsRegenerateCaptcha(), 2000);
    const intervalId = setInterval(() => {
      setFormDisabled(isFormDisabled());
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className={`nc-PageCancelSubscription ${className} animate-fade-down`}
      data-nc-id="PageCancelSubscription"
    >
      <LayoutPage
        heading="Cancelar inscripción"
        subHeading="Puedes solicitar la cancelación de tu inscripción a un curso hasta 10 días hábiles luego de adquirido el mismo "
      >
        <p className="max-w-xl text-center mx-auto block text-sm mb-4 sm:text-base">
          A continuación, completa y envía el formulario y dentro de las
          próximas 48 horas te comunicaremos la resolución de tu solicitud vía
          e-mail.
        </p>
        <div className="max-w-md mx-auto space-y-6">
          <form
            method="POST"
            action="https://ayuda.msklatam.com/support/WebToCase"
            className=""
            autoComplete="off"
            ref={formRef}
            name="zsWebToCase_740111000002566679"
            id="zsWebToCase_740111000002566679"
          >
            <input
              type="hidden"
              name="xnQsjsdp"
              value="edbsn868ee7b090a02d9bf1e54e6366218f7f"
            />
            <input
              type="hidden"
              name="xmIwtLD"
              value="edbsn6f579a65860efd166106fe7021b1ed1245882888429e2804ceb3ca47fa09472b"
            />
            <input type="hidden" id="xJdfEaS" name="xJdfEaS" />
            <input type="hidden" name="actionType" value="Q2FzZXM=" />
            <input type="hidden" id="property(module)" value="Cases" />
            <input
              type="hidden"
              id="dependent_field_values_Cases"
              value='&#x7b;"JSON_VALUES"&#x3a;&#x7b;"CASECF1"&#x3a;&#x7b;"CASECF2"&#x3a;&#x7b;"Surinam"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Granada"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Bolivia"&#x3a;&#x5b;"Pasaporte"&#x5d;,"Paraguay"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Hait&iacute;"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Bahamas"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Costa&#x20;Rica"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Brasil"&#x3a;&#x5b;"Pasaporte"&#x5d;,"Trinidad&#x20;y&#x20;Tobago"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"El&#x20;Salvador"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Panam&aacute;"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"San&#x20;Vicente&#x20;y&#x20;las&#x20;Granadinas"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Guatemala"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Guyana"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Chile"&#x3a;&#x5b;"Pasaporte","RUT"&#x5d;,"Santa&#x20;Luc&iacute;a"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Colombia"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Ecuador"&#x3a;&#x5b;"C&Eacute;DULA","Pasaporte","RUC"&#x5d;,"Argentina"&#x3a;&#x5b;"DNI","CUIT","CUIL","C&Eacute;DULA","LE","LC","Pasaporte"&#x5d;,"Belice"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Uruguay"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Antigua&#x20;y&#x20;Barbuda"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"M&eacute;xico"&#x3a;&#x5b;"RFC"&#x5d;,"Estados&#x20;Unidos"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Rep&uacute;blica&#x20;Dominicana"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Canad&aacute;"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Cuba"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Venezuela"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Barbados"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Nicaragua"&#x3a;&#x5b;"--Ninguna--","DNI","CUIT","CUIL","C&Eacute;DULA","LE","LC","Pasaporte","RUC","RFC","RUT"&#x5d;,"Per&uacute;"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Honduras"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"San&#x20;Crist&oacute;bal&#x20;y&#x20;Nieves"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Jamaica"&#x3a;&#x5b;"--Ninguna--"&#x5d;,"Dominica"&#x3a;&#x5b;"--Ninguna--"&#x5d;&#x7d;&#x7d;&#x7d;,"JSON_SELECT_VALUES"&#x3a;&#x7b;"CASECF1"&#x3a;&#x5b;"--Ninguna--","Antigua&#x20;y&#x20;Barbuda","Argentina","Bahamas","Barbados","Belice","Bolivia","Brasil","Canad&aacute;","Chile","Colombia","Costa&#x20;Rica","Cuba","Dominica","Ecuador","El&#x20;Salvador","Estados&#x20;Unidos","Granada","Guatemala","Guyana","Hait&iacute;","Honduras","Jamaica","M&eacute;xico","Nicaragua","Panam&aacute;","Paraguay","Per&uacute;","Rep&uacute;blica&#x20;Dominicana","San&#x20;Crist&oacute;bal&#x20;y&#x20;Nieves","San&#x20;Vicente&#x20;y&#x20;las&#x20;Granadinas","Santa&#x20;Luc&iacute;a","Surinam","Trinidad&#x20;y&#x20;Tobago","Uruguay","Venezuela"&#x5d;,"CASECF2"&#x3a;&#x5b;"--Ninguna--","DNI","CUIT","CUIL","C&Eacute;DULA","LE","LC","Pasaporte","RUC","RFC","RUT"&#x5d;&#x7d;,"JSON_MAP_DEP_LABELS"&#x3a;&#x5b;"CASECF1"&#x5d;&#x7d;'
            />
            <input
              type="hidden"
              name="returnURL"
              value="https&#x3a;&#x2f;&#x2f;msklatam.com&#x2f;ec&#x2f;gracias"
            />
            <div className="form-input-std">
              <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                Nombre
              </label>

              <input
                type="text"
                name="First Name"
                placeholder="Ingresar nombre"
              />
            </div>
            <div className="form-input-std">
              <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                Apellidos
              </label>
              <input
                type="text"
                name="Contact Name"
                placeholder="Ingresar apellidos"
              />
            </div>
            <div className="form-input-std">
              <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                E-mail
              </label>
              <input type="text" name="Email" placeholder="Ingresar e-mail" />
            </div>
            <div style={{ display: "none" }}>
              <select
                name="País"
                value="Ecuador"
                onChange={() => setDependent(this, false)}
                id="CASECF1"
              >
                <option value="Ecuador">Ecuador</option>
              </select>
            </div>
            <div className="form-select-std w-full">
              <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                Tipo de documento
              </label>

              <select name="Tipo de Documento">
                <option defaultValue="">Seleccionar tipo de documento</option>
                {argDocumentTypes.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-input-std">
              <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                Identificación
              </label>

              <input
                type="text"
                name="Identificación"
                placeholder="Ingresar cédula, RUC o pasaporte"
              />
            </div>

            <div className="form-input-std">
              <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                Motivo de la solicitud
              </label>

              <input
                type="hidden"
                name="Subject"
                value="Solicitud de baja"
              ></input>
              <textarea
                name="Description"
                placeholder="Ingresar motivo de la solicitud"
              ></textarea>
            </div>

            <table>
              <tbody>
              <tr>
                <td>
                  <div className="grid grid-cols-2 items-center gap-4 justify-between">
                    <div id="zsCaptcha" className="form-input-std">
                      <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                        Captcha
                      </label>
                      <input type="hidden" name="zsCaptchaSrc" value="" />

                      <input
                        type="text"
                        name="zsWebFormCaptchaWord"
                        placeholder=""
                      />
                    </div>
                    <div className="grid grid-cols-1">
                      <img src="#" id="zsCaptchaUrl" />
                      <a
                        style={{
                          color: "#00a3fe",
                          cursor: "pointer",
                          marginLeft: "10px",
                          verticalAlign: "middle",
                          textDecoration: "none",
                        }}
                        className="zsFontClass text-right"
                        onClick={() => zsRegenerateCaptcha()}
                      >
                        Actualizar
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>

            <div className="flex flex-wrap gap-4 mt-4 ">
              <div className="contact-checkbox signup-checkbox">
                <div className="flex gap-2 center text-center">
                  <input
                    type="checkbox"
                    name="Terms_And_Conditions"
                    className="mt-0.5"
                  />
                  <label>
                    Acepto las{" "}
                    <Link
                      href="/politica-de-privacidad"
                      target="_blank"
                      className="text-primary underline"
                    >
                      politicas de privacidad
                    </Link>
                  </label>
                </div>
              </div>
            </div>

            <div
              className="flex flex-wrap gap-1 mt-2 mb-4"
              id="zsSubmitButton_740111000002566679"
            >
              <button
                disabled={formDisabled}
                className="nc-Button relative h-auto inline-flex items-center justify-center transition-colors rounded text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:cursor-not-allowed disabled:bg-grey-disabled bg-primary-6000 text-neutral-50 false w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                type="submit"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageCancelSubscription;
