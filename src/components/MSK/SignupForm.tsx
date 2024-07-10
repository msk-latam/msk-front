"use client";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { Profession, Specialty } from "@/data/types";
import { getName } from "country-list";
import { CountryContext } from "@/context/country/CountryContext";
import { CountryCode } from "libphonenumber-js/types";
import { utmInitialState, utmReducer } from "@/context/utm/UTMReducer";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useYupValidation } from "@/hooks/useYupValidation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { DataContext } from "@/context/data/DataContext";
import api from "@/services/api";
import NcLink from "../NcLink/NcLink";
import { usePathname, useRouter } from "next/navigation";
import ButtonPrimary from "../Button/ButtonPrimary";
import { countries } from "@/data/countries";
interface SignupFormProps {
  hideHeader?: boolean;
  hideSideInfo?: boolean;
  productName?: string | undefined;
  isEbook?: boolean;
  resourceMedia?: string | boolean;
  hideContactPreference?: boolean;
  submitText?: string;
  isDownload?: boolean;
  updateFormSent?: (value: boolean, body: any) => void;
  submitReason?: string;
  submitEndpoint?: string;
}

const SignupForm: FC<SignupFormProps> = ({
  productName = "",
  isEbook = false,
  submitText = "Crear",
}) => {
  const router = useRouter();
  const { state: dataState } = useContext(DataContext);
  const { allProfessions, allSpecialties, allSpecialtiesGroups } = dataState;
  const { state } = useContext(CountryContext);
  const [defaultCountry, setDefaultCountry] = useState<CountryCode>(
    "" as CountryCode
  );
  useEffect(() => {
    setDefaultCountry(state.country?.toUpperCase() as CountryCode);
  }, [state]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [specialtiesGroup, setSpecialtiesGroup] = useState<Specialty[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [selectedOptionProfession, setSelectedOptionProfession] =
    useState<string>("");
  const [selectedProfessionId, setSelectedProfessionId] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<any>([]);
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] =
    useState<string>("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [formSent, setFormSent] = useState(false);
  const [studentInputs, setStudentInputs] = useState(false);
  const [formError, setFormError] = useState("");
  const [onRequest, setOnRequest] = useState(false);
  const [utmState, dispatchUTM] = useReducer(utmReducer, utmInitialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  let pathname = usePathname();
  const [urlOrigen, setUrlOrigen] = useState<string>(
    typeof window !== "undefined" ? window.location.href : ""
  );

  useEffect(() => {
    setProfessions(allProfessions);
    setSpecialties(allSpecialties);
    setSpecialtiesGroup(allSpecialtiesGroups);
  }, [allProfessions, allSpecialties]);

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }
    const token = await executeRecaptcha("yourAction");
  }, [executeRecaptcha]);

  const initialValues = {
    First_Name: "",
    Last_Name: "",
    Email: "",
    Profesion: "",
    Especialidad: "",
    Phone: "",
    Pais: "",
    Otra_profesion: "",
    Otra_especialidad: "",
    utm_source: utmState.utm_source,
    utm_medium: utmState.utm_medium,
    utm_campaign: utmState.utm_campaign,
    utm_content: utmState.utm_content,
    Terms_And_Conditions: false,
    year: "",
    career: "",
    URL_ORIGEN: urlOrigen,
    leadSource: "",
  };
  const handlePhoneChange = (value: string) => {
    if (typeof value !== "undefined") {
      const parsedPhoneNumber = parsePhoneNumber(value);
      if (parsedPhoneNumber?.country) {
        const country = getName(parsedPhoneNumber.country) as string;
        setSelectedCountry(country);
        setPhoneNumber(value);
        formik.setFieldValue("Pais", country);
      }
    }
  };
  const fullCountry = (country: string): string => {
    return (
      countries.find((c) => c.id === country.toLowerCase())?.name || country
    );
  };

  const handleOptionSpecialtyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedOptionSpecialty(value);
    formik.setFieldValue("Especialidad", value);
    setShowInputSpecialties(value === "Otra Especialidad");
  };

  const handleOptionCareerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    formik.values.career = value;
    setSelectedCareer(value);
  };

  const handleOptionProfessionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    if (value && value.length) {
      const values = value.split("/");
      const profession = values[0];
      const id = values[1];
      setSelectedOptionProfession(profession);
      formik.setFieldValue("Profesion", profession);
      setSelectedProfessionId(id);
      setShowInputProfession(profession === "Otra profesión");
      setStudentInputs(profession === "Estudiante");
      const groups =
        specialtiesGroup[parseInt(id) as keyof typeof specialtiesGroup];
      setCurrentGroup(groups);
    } else {
      setSelectedOptionProfession("");
      setSelectedProfessionId("");
    }
  };

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const { contactFormValidation } = useYupValidation();
  const formik = useFormik({
    initialValues,
    validationSchema: contactFormValidation,
    onSubmit: async (values: any) => {
      if (executeRecaptcha) {
        setOnRequest(true);
        const formData = {
          ...values,
          name: `${values.first_name} ${values.last_name}`,
          recaptcha_token: await executeRecaptcha("signup_form"),
          country: fullCountry(selectedCountry),
          utm_source: utmState.utm_source,
          utm_medium: utmState.utm_medium,
          utm_campaign: utmState.utm_campaign,
          utm_content: utmState.utm_content,
        };

        try {
          const res = await api.postSignUp(formData);
          if (res.status !== 200) {
            const errorMessages = Object.values(res.data.errors)
              .map((errorMessage) => `- ${errorMessage}`)
              .join("<br />");
            setFormError(
              "Hubo un error al enviar el formulario, revise los campos"
            );
          } else {
            setFormError("");
            setTimeout(() => {
              router.push("/correo-enviado");
            }, 1500);
          }
        } catch (error) {
          console.error("Error al ejecutar reCAPTCHA:", error);
        } finally {
          setOnRequest(false);
        }
      }
    },
  });

  const optionsArray = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="col-span-3" id="contactanos">
        <div>
          <div className="max-w-md mx-auto space-y-6">
            <FormikProvider value={formik}>
              <Form
                onSubmit={formik.handleSubmit}
                action="/leads"
                className=""
                autoComplete="off"
                ref={formRef}
              >
                <input
                  type="hidden"
                  name="Cursos_consultados"
                  id="Cursos_consultados"
                  value={productName}
                />

                <input
                  type="hidden"
                  name="Ebook_consultado"
                  id="Ebook_consultado"
                  value={productName}
                />

                <input
                  type="hidden"
                  name="URL_ORIGEN"
                  id="URL_ORIGEN"
                  value={urlOrigen}
                />

                <input
                  type="hidden"
                  name="leadSource"
                  id="leadSource"
                  value={isEbook ? "Descarga ebook" : ""}
                />
                <div>
                  <div className="form-input-std">
                    <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                      Nombre
                    </label>
                    <ErrorMessage
                      name="First_Name"
                      component="span"
                      className="error"
                    />
                    <Field
                      type="text"
                      name="First_Name"
                      placeholder="Ingresar nombre"
                    />
                  </div>
                  <div className="form-input-std">
                    <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                      Apellido
                    </label>
                    <ErrorMessage
                      className="error"
                      name="Last_Name"
                      component="span"
                    />
                    <Field
                      type="text"
                      name="Last_Name"
                      placeholder="Ingresar apellido"
                    />
                  </div>
                  <div className="form-input-std">
                    <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                      E-mail
                    </label>
                    <ErrorMessage
                      name="Email"
                      component="span"
                      className="error"
                    />
                    <Field
                      type="email"
                      name="Email"
                      placeholder="Ingresar e-mail"
                    />
                  </div>

                  <div className="form-input-std">
                    <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                      Teléfono
                    </label>
                    <Field name="Phone">
                      {({ field, form, meta }: any) => (
                        <div>
                          <ErrorMessage
                            name="Phone"
                            component="span"
                            className="error"
                          />
                          <PhoneInput
                            name="Phone"
                            id="Phone"
                            placeholder="Ingresar número telefónico"
                            defaultCountry={defaultCountry}
                            onChange={(value: any) => {
                              form.setFieldValue("Phone", value);
                              handlePhoneChange(value);
                            }}
                          />
                        </div>
                      )}
                    </Field>
                  </div>

                  <div className="form-select-std">
                    <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                      Profesión
                    </label>
                    <ErrorMessage
                      name="Profesion"
                      component="span"
                      className="error"
                    />
                    <Field
                      as="select"
                      name="Profesion"
                      onChange={handleOptionProfessionChange}
                      value={`${selectedOptionProfession}/${selectedProfessionId}`}
                    >
                      <option defaultValue="" value="">
                        Seleccionar profesión
                      </option>
                      {professions && professions.length
                        ? professions.map((p) => (
                            <option key={p.id} value={`${p.name}/${p.id}`}>
                              {p.name}
                            </option>
                          ))
                        : ""}
                    </Field>
                  </div>

                  {showInputProfession && (
                    <div className="form-input-std my-4">
                      <ErrorMessage
                        name="Otra_profesion"
                        component="span"
                        className="error"
                      />
                      <Field
                        type="text"
                        name="Otra_profesion"
                        placeholder="Ingresar profesion"
                      />
                    </div>
                  )}

                  {studentInputs ? (
                    <div className="col-xl-12 flex gap-2">
                      <div className="form-select-std w-1/2">
                        <ErrorMessage
                          name="year"
                          component="span"
                          className="error"
                        />
                        <Field as="select" name="year">
                          <option defaultValue="">Año</option>
                          {optionsArray.map((y) => (
                            <option key={`st_year_${y}`} defaultValue={y}>
                              {y}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="form-select-std w-full">
                        <ErrorMessage
                          name="career"
                          component="span"
                          className="error"
                        />
                        <Field
                          as="select"
                          name="career"
                          onChange={handleOptionCareerChange}
                          value={selectedCareer}
                        >
                          <option defaultValue="">Seleccionar carrera</option>
                          {currentGroup.map((s: any) => (
                            <option
                              key={`st_carrer_${s.id}`}
                              defaultValue={s.name}
                            >
                              {s.name}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={`col-xl-6 col-span-2 sm:col-span-1`}>
                        <div className="form-select-std">
                          <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                            Especialidad
                          </label>
                          <ErrorMessage
                            name="Especialidad"
                            component="span"
                            className="error"
                          />
                          <Field
                            as="select"
                            name="Especialidad"
                            onChange={handleOptionSpecialtyChange}
                            value={selectedOptionSpecialty}
                          >
                            <option defaultValue="">
                              Seleccionar especialidad
                            </option>
                            {selectedOptionProfession && currentGroup.length
                              ? currentGroup.map((s: any) => (
                                  <option
                                    key={`sp_group_${s.id}`}
                                    defaultValue={s.name}
                                  >
                                    {s.name}
                                  </option>
                                ))
                              : specialties?.map((s) => (
                                  <option
                                    key={`sp_${s.id}`}
                                    defaultValue={s.name}
                                  >
                                    {s.name}
                                  </option>
                                ))}
                          </Field>
                        </div>
                        {showInputSpecialties && (
                          <div className="form-input-std my-4">
                            <Field
                              type="text"
                              name="Otra_especialidad"
                              placeholder="Ingresar especialidad"
                            />
                            <ErrorMessage
                              name="Otra_especialidad"
                              component="div"
                              className="error"
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1 mt-2 mb-4 justify-center">
                      <div className="contact-checkbox">
                        <ErrorMessage
                          name="Terms_And_Conditions"
                          component="div"
                          className="error"
                        />
                        <div className="flex gap-2 center">
                          <Field
                            type="checkbox"
                            name="Terms_And_Conditions"
                            checked={formik.values.Terms_And_Conditions}
                            className="hidden-checkbox mt-1"
                          />
                          <label>
                            Acepto las{" "}
                            <NcLink
                              href="/politica-de-privacidad"
                              target="_blank"
                              className="text-primary underline"
                            >
                              políticas de privacidad
                            </NcLink>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2 mb-4">
                      <ButtonPrimary
                        type="submit"
                        className="w-full"
                        disabled={
                          !formik.values.Terms_And_Conditions || onRequest
                        }
                      >
                        {onRequest ? "Creando ..." : submitText}
                      </ButtonPrimary>
                    </div>
                    <p
                      className="text-red-500 font-bold"
                      style={{
                        visibility: formError ? "visible" : "hidden",
                      }}
                    >
                      {formError}
                    </p>
                    <p
                      className="success-message"
                      style={{
                        visibility: formSent ? "visible" : "hidden",
                      }}
                    >
                      Registrado correctamente!
                    </p>
                  </div>
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignupForm;
