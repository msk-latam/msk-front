import React, { FC, useContext, useReducer, useRef, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import ButtonPrimary from "components/Button/ButtonPrimary";
import api from "../../Services/api";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import { Link, useHistory } from "react-router-dom";
import { utmInitialState, utmReducer } from "context/utm/UTMReducer";
import useProfessions from "hooks/useProfessions";
import useSpecialties from "hooks/useSpecialties";
import { countries } from "data/countries";
import { CountryContext } from "context/country/CountryContext";
import { CountryCode } from "libphonenumber-js/types";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import PageHead from "containers/Head/PageHead";
import ShowErrorMessage from "components/ShowErrorMessage";
export interface PageSignUpProps {
  className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] = useState("");
  const [selectedOptionProfession, setSelectedOptionProfession] = useState("");
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedProfessionId, setSelectedProfessionId] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<any>([]);
  const [studentInputs, setStudentInputs] = useState(false);
  const [onRequest, setOnRequest] = useState<boolean>(false);
  const [selectedCareer, setSelectedCareer] = useState("");
  const history = useHistory();
  const [utmState, dispatchUTM] = useReducer(utmReducer, utmInitialState);
  const formRef = useRef<HTMLFormElement>(null);
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    profession: "",
    speciality: "",
    Otra_profesion: "",
    Otra_especialidad: "",
    Career: "",
    Year: "",
    country: "",
    Terms_And_Conditions: false,
  };
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("El nombre es requerido"),
    last_name: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es requerido"),
    phone: Yup.string().required("El teléfono es requerido"),
    profession: Yup.string().required("La profesión es requerida"),
    speciality: Yup.string().required("La especialidad es requerida"),
    country: Yup.string(),
    Terms_And_Conditions: Yup.boolean().oneOf(
      [true],
      "Debes aceptar los términos y condiciones"
    ),
    // Otra_profesion: Yup.string().when("profession", {
    //   is: (val: string) => val === "Otra profesión",
    //   then: Yup.string().required("La profesión es requerida"),
    // })
    // Otra_especialidad: Yup.string().when("speciality", {
    //   is: (val: string) => val === "Otra especialidad",
    //   then: Yup.string().required("La especialidad es requerida"),
    // }),
    // Career: Yup.string().when("profession", {
    //   is: (val: string) => val === "Estudiante",
    //   then: Yup.string().required("La carrera es requerida"),
    // }),
    // Year: Yup.string().when("profession", {
    //   is: (val: string) => val === "Estudiante",
    //   then: Yup.string().required("El año es requerido"),
    // }),
  });
  const { state } = useContext(CountryContext);
  const { professions } = useProfessions();
  const { specialties, specialtiesGroup } = useSpecialties();

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    if (typeof value !== "undefined") {
      const parsedPhoneNumber = parsePhoneNumber(value);
      if (parsedPhoneNumber?.country) {
        setSelectedCountry(parsedPhoneNumber.country);
      }
    }
  };

  const handleOptionSpecialtyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedOptionSpecialty(value);
    setShowInputSpecialties(value === "Otra Especialidad");
    formik.setFieldValue("speciality", value);
  };

  const handleOptionCareerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    formik.setFieldValue("Career", value);
    formik.setFieldValue("speciality", value);
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
      setSelectedProfessionId(id);
      setShowInputProfession(profession === "Otra profesión");
      setStudentInputs(profession === "Estudiante");
      formik.setFieldValue("profession", profession);

      const groups =
        specialtiesGroup[parseInt(id) as keyof typeof specialtiesGroup];
      setCurrentGroup([]);
      setCurrentGroup(groups);
    } else {
      setSelectedOptionProfession("");
      setSelectedProfessionId("");
    }
  };

  const fullCountry = (country: string): string => {
    return (
      countries.find((c) => c.id === country.toLowerCase())?.name || country
    );
  };

  const optionsArray = [1, 2, 3, 4, 5];

  const formik = useFormik({
    initialValues,
    validationSchema,
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
            setSuccess(false);
            const errorMessages = Object.values(res.data.errors)
              .map((errorMessage) => `- ${errorMessage}`)
              .join("<br />");
            setError(
              `Ocurrió un error.<br /> Por favor, revisa los campos e inténtalo de nuevo. <br />${errorMessages}`
            );
          } else {
            setError("");
            setSuccess(true);
            setTimeout(() => {
              history.push("/correo-enviado");
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

  return (
    <div
      className={`nc-PageSignUp ${className} animate-fade-down`}
      data-nc-id="PageSignUp"
    >
      <PageHead title="Crear cuenta" />
      <LayoutPage
        subHeading="Regístrate y disfruta al máximo de nuestra propuesta educativa"
        heading="Crear cuenta"
      >
        <div className="max-w-md mx-auto space-y-6">
          <FormikProvider value={formik}>
            <Form
              onSubmit={formik.handleSubmit}
              action="#"
              className=""
              autoComplete="off"
              ref={formRef}
            >
              <div className="form-input-std">
                <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                  Nombre
                </label>
                <ErrorMessage
                  name="first_name"
                  component="span"
                  className="error"
                />
                <Field
                  type="text"
                  name="first_name"
                  placeholder="Ingresar nombre"
                />
              </div>
              <div className="form-input-std">
                <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                  Apellido
                </label>
                <ErrorMessage
                  name="last_name"
                  component="span"
                  className="error"
                />
                <Field
                  type="text"
                  name="last_name"
                  placeholder="Ingresar apellido"
                />
              </div>
              <div className="form-input-std">
                <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                  E-mail
                </label>
                <ErrorMessage name="email" component="span" className="error" />
                <Field type="text" name="email" placeholder="Ingresar e-mail" />
              </div>
              <div>
                <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                  Teléfono
                </label>
                <Field name="phone">
                  {({ field, form, meta }: any) => (
                    <div className="form-phone-std">
                      <ErrorMessage
                        name="phone"
                        component="span"
                        className="error"
                      />
                      <PhoneInput
                        name="phone"
                        id="phone"
                        placeholder="Ingresar número telefónico"
                        defaultCountry={
                          state.country.toUpperCase() as CountryCode
                        }
                        onChange={(value: any) => {
                          form.setFieldValue("phone", value);
                          handlePhoneChange(value);
                        }}
                        className="phone-wrapper"
                      />
                    </div>
                  )}
                </Field>
              </div>

              <div className="col-xl-6 col-span-2 md:col-span-1">
                <div className="form-select-std">
                  <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                    Profesión
                  </label>
                  <ErrorMessage
                    name="profession"
                    component="span"
                    className="error"
                  />
                  <Field
                    as="select"
                    name="profession"
                    onChange={handleOptionProfessionChange}
                    value={`${selectedOptionProfession}/${selectedProfessionId}`}
                  >
                    <option defaultValue="" value="">
                      Seleccionar profesión
                    </option>
                    {professions
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
              </div>

              {studentInputs ? (
                <div className="col-xl-12 flex gap-2 mt-2">
                  <div className="form-select-std w-1/2">
                    <ErrorMessage
                      name="Year"
                      component="span"
                      className="error"
                    />
                    <Field as="select" name="Year">
                      <option defaultValue="">Año</option>
                      {optionsArray.map((y) => (
                        <option key={`st_Year_${y}`} defaultValue={y}>
                          {y}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="form-select-std w-full">
                    <ErrorMessage
                      name="Career"
                      component="span"
                      className="error"
                    />
                    <Field
                      as="select"
                      name="Career"
                      onChange={handleOptionCareerChange}
                      value={selectedCareer}
                    >
                      <option defaultValue="">Seleccionar carrera</option>
                      {currentGroup.map((s: any) => (
                        <option key={`st_carrer_${s.id}`} defaultValue={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
              ) : (
                <>
                  <div className={`col-xl-6`}>
                    <div className="form-select-std">
                      <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                        Especialidad
                      </label>
                      <ErrorMessage
                        name="speciality"
                        component="span"
                        className="error"
                      />
                      <Field
                        as="select"
                        name="speciality"
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
                          : specialties.map((s) => (
                              <option key={`sp_${s.id}`} defaultValue={s.name}>
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
              <div className="flex flex-wrap gap-4 mt-4 ">
                <div className="contact-checkbox signup-checkbox">
                  <ErrorMessage
                    name="Terms_And_Conditions"
                    component="span"
                    className="error"
                  />
                  <div className="flex gap-2 center text-center">
                    <Field
                      type="checkbox"
                      name="Terms_And_Conditions"
                      checked={formik.values.Terms_And_Conditions}
                      className="hidden-checkbox mt-0.5"
                    />
                    <label>
                      Acepto las{" "}
                      <Link
                        to="/politica-de-privacidad"
                        target="_blank"
                        className="text-primary"
                      >
                        politicas de privacidad
                      </Link>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-2 mb-4">
                <ButtonPrimary
                  type="submit"
                  className="w-full"
                  disabled={!formik.values.Terms_And_Conditions || onRequest}
                >
                  {onRequest ? "Creando..." : "Crear"}
                </ButtonPrimary>
                {error && <ShowErrorMessage text={error} />}

                {success && (
                  <p className="text-green-500 text-center w-full">
                    Registrado correctamente!
                  </p>
                )}
              </div>
            </Form>
          </FormikProvider>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageSignUp;
