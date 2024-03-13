"use client";
import Button from "@/components/Button/Button";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import {
  Contact,
  JsonIdentificationsMapping,
  Profession,
  Specialty,
  User,
} from "../../../data/types";
import NcLink from "@/components/NcLink/NcLink";
import { CountryContext } from "@/context/country/CountryContext";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { CountryCode } from "libphonenumber-js/types";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { countries } from "@/data/countries";
import { DataContext } from "@/context/data/DataContext";
//import countryIdentificationsMapping from "../../../data/jsons/__countryIdentifications.json";
import api from "../../../../Services/api";

// import InputField from "@/components/Form/InputField";

interface Props {
  user: User;
  setUser?: Dispatch<SetStateAction<User>>;
}

const DashboardEditProfile: FC<Props> = ({ user, setUser }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { state: dataState } = useContext(DataContext);
  const { allProfessions, allSpecialties, allSpecialtiesGroups } = dataState;
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const { state } = useContext(CountryContext);
  const [userData, setUserData] = useState(user);
  const [formSubmitted, setFormSubmitted] = useState(true);
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [localUser, setLocalUser] = useState<Contact>(
    userData.contact as Contact
  );
  const [specialtiesGroup, setSpecialtiesGroup] = useState<Specialty[]>([]);
  const [selectedProfessionId, setSelectedProfessionId] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<any>([]);
  const [studentInputs, setStudentInputs] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [updateStatusMessage, setUpdateStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [currentStates, setCurrentStates] = useState<string[]>([]);
  //const [currentDocumentsType, setCurrentDocumentsType] = useState<JsonIdentificationsMapping>(countryIdentificationsMapping);
  const [selectedOptionProfession, setSelectedOptionProfession] =
    useState<string>(userData.contact?.profession || "");
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] =
    useState<string>(userData.contact?.speciality || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    userData?.contact?.phone || ""
  );
  const [selectedDocument, setSelectedDocument] = useState<string>(
    userData.contact?.type_doc || ""
  );
  const [selectedDocumentId, setSelectedDocumentId] = useState<string>(
    userData.contact?.type_doc ? state.country : ""
  );

  const handleOptionTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    if (value && value.length) {
      const values = value.split("/");
      const type = values[0];
      const id = values[1];
      setSelectedDocument(type);
      setSelectedDocumentId(id);

      formik.setFieldValue("type_doc", type);
    } else {
      setSelectedDocument("");
      setSelectedDocumentId("");
    }
  };

  useEffect(() => {
    setProfessions(allProfessions);
    setSpecialties(allSpecialties);
    setSpecialtiesGroup(allSpecialtiesGroups);
  }, [allProfessions, allSpecialties]);

  const handleOptionCareerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedCareer(value);
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    if (typeof value !== "undefined") {
      const parsedPhoneNumber = parsePhoneNumber(value);
      if (parsedPhoneNumber?.country) {
        setSelectedCountry(parsedPhoneNumber.country);
      }
    }
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

  const handleOptionSpecialtyChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedOptionSpecialty(value);
    setShowInputSpecialties(value === "Otra Especialidad");
    formik.setFieldValue("speciality", value);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setLocalUser((prevUser: Contact) => ({
      ...prevUser,
      [fieldName]: value,
    }));

    if (fieldName == "country") {
      getStates(value);
      formik.setFieldValue("country", value);
    }

    if (fieldName == "state") {
      formik.setFieldValue("state", value);
    }

    /* let identification = null;

    switch (localUser.country) {
      case "Argentina":
        identification = localUser.dni;
        break;
      case "Chile":
        identification = localUser.rut;
        break;
      default:
        identification = localUser.rfc;
        break;
    } */
  };

  useEffect(() => {
    const hasOtherProfession = selectedOptionProfession.includes("Otra ");
    const hasOtherSpeciality = selectedOptionSpecialty.includes("Otra ");
    setShowInputProfession(hasOtherProfession);
    setShowInputSpecialties(hasOtherSpeciality);

    return () => {
      setLocalUser((prevState) => ({
        ...prevState,
        other_profession: hasOtherProfession ? localUser.other_profession : "",
        other_speciality: hasOtherSpeciality ? localUser.other_speciality : "",
      }));
    };
  }, [selectedOptionProfession, selectedOptionSpecialty]);

  const getStates = async (country: string) => {
    const res = await api.getStatesFromCountry(country);
    setCurrentStates(res || []);
  };

  useEffect(() => {
    const selectedProfession = professions.find(
      (profession) => profession.name === selectedOptionProfession
    );
    if (selectedProfession) {
      setSelectedProfessionId(selectedProfession.id.toString());
      const event = {
        target: {
          value: `${selectedOptionProfession}/${selectedProfession.id}`,
        },
      };
      if (event.target.value && selectedProfession.id)
        handleOptionProfessionChange(event as any);
    }
  }, [selectedOptionProfession, professions]);

  const renderInputIdentification = () => {
    if (!localUser) return <></>;
    switch (localUser.country) {
      case "México":
        return (
          <div className="form-input-std">
            <label className="text-neutral-800 dark:text-neutral-200 mb-1">
              RFC
            </label>
            <ErrorMessage name="rfc" component="span" className="error" />
            <Field type="text" name="rfc" placeholder="Ingresar RFC" />
          </div>
        );
      case "Chile":
        return (
          <div className="form-input-std">
            <label className="text-neutral-800 dark:text-neutral-200 mb-1">
              RUT
            </label>
            <ErrorMessage name="rut" component="span" className="error" />
            <Field type="text" name="rut" placeholder="Ingresar RUT" />
          </div>
        );
      default:
        return (
          <>
            <div className="form-select-std">
              {/* <InputField
                label="Identificacion"
                type="text"
                name="identification"
                placeholder="Ingresar identificacion"
              /> */}
            </div>
          </>
        );
    }
  };

  const optionsArray = [1, 2, 3, 4, 5];

  const formRef = useRef<HTMLFormElement>(null);
  const initialValues = {
    name: localUser?.name || "",
    last_name: localUser?.last_name || "",
    email: localUser?.email || "",
    phone: localUser?.phone || "",
    profession: localUser?.profession || "",
    speciality: localUser?.speciality || "",
    other_profession: localUser?.other_profession || "",
    other_speciality: localUser?.other_speciality || "",
    career: localUser?.career || "",
    year: localUser?.year || "",
    address: localUser?.address || "",
    country: localUser?.country || "",
    postal_code: localUser?.postal_code || "",
    state: localUser?.state || "",
    /*  rfc: localUser?.rfc || "",
    dni: localUser?.dni || "",
    rut: localUser?.rut || "", */
    fiscal_regime: localUser?.fiscal_regime || "",
    type_doc: localUser?.type_doc || "",
    identification: localUser?.identification || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    last_name: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es requerido"),
    phone: Yup.string().required("El teléfono es requerido"),
    profession: Yup.string().required("La profesión es requerida"),
    speciality: Yup.string().required("La especialidad es requerida"),
    country: Yup.string().required("El país es requerido"),
    state: Yup.string().required("La provincia es requerida"),
    postal_code: Yup.string().required("El código postal es requerido"),
    address: Yup.string().required("La dirección es requerida"),
    type_doc: Yup.string().required("El tipo de identificacion es requerido"),
    identification: Yup.string()
      .test(
        "identification-validation",
        "Identificación no válida",
        function (value) {
          const countryRegexMap: any = {
            ar: /^[0-9]{7,8}$/, // DNI para Argentina
            co: /^[0-9]{6,10}$/, // CI para Colombia (ejemplo, ajusta según necesites)
            mx: /^[A-ZÑ&]{3,4}[0-9]{6}[A-V1-9][0-9A-Z]$/, // RFC para México (ejemplo, ajusta según necesites)
            cl: /^\d{7,8}-[0-9Kk]$/, // RUT para Chile (ejemplo, ajusta según necesites)
          };

          return countryRegexMap[state.country]?.test(value) || false;
        }
      )
      .required("Este campo es obligatorio"),
    //fiscal_regime: Yup.string().required("El régimen fiscal es requerido"),
    // dni: Yup.string().when("country", {
    //   is: (val: string) => val === "Argentina",
    //   then: Yup.string().required("El DNI es requerido"),
    // }),
    // rfc: Yup.string().when("country", {
    //   is: (val: string) => val === "México",
    //   then: Yup.string().required("El RFC es requerido"),
    // }),
    // rut: Yup.string().when("country", {
    //   is: (val: string) => val === "Chile",
    //   then: Yup.string().required("El RUT es requerido"),
    // }),
    // other_profession: Yup.string().when("profession", {
    //   is: (val: string) => val === "Otra profesión",
    //   then: Yup.string().required("La profesión es requerida"),
    // })
    // other_speciality: Yup.string().when("speciality", {
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      if (executeRecaptcha) {
        const formData = {
          ...localUser,
          ...values,
          recaptcha_token: await executeRecaptcha("edit_profile"),
        };

        try {
          const res = await api.updateUserData(formData);
          if ((res?.status as number) === 200) {
            setUpdateStatusMessage({
              message: "Se actualizó correctamente.",
              type: "success",
            });

            const userDataDB = await api.getUserData();

            if (typeof setUser === "function") {
              setUser(userDataDB);
            }
            setFormSubmitted(true);

            const continueTrialAccess = localStorage.getItem(
              "continueTrialAccess"
            );
            if (typeof continueTrialAccess === "string") {
              localStorage.removeItem("continueTrialAccess");
              // history.push(continueTrialAccess)
            }
          } else {
            console.error("Hubo un error al actualizar el usuario", res);
            setUpdateStatusMessage({
              message: "Hubo un error al actualizar el usuario.",
              type: "error",
            });
          }
        } catch (error) {
          console.error("Hubo un error al actualizar el usuario", error);
          setUpdateStatusMessage({
            message: "Hubo un error al actualizar el usuario.",
            type: "error",
          });
        }
      }
    },
  });

  useEffect(() => {
    if (localUser && localUser.country) {
      getStates(localUser.country);
    }
  }, [localUser]);

  useEffect(() => {
    if (formik.dirty) {
      setFormSubmitted(false);
    }
  }, [formik.dirty]);

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <FormikProvider value={formik}>
        <Form
          onSubmit={formik.handleSubmit}
          action="#"
          className="md:grid md:grid-cols-2 gap-6"
          autoComplete="off"
          ref={formRef}
        >
          <div className="form-input-std">
            <label className="text-neutral-800 dark:text-neutral-200 mb-1">
              Nombre
            </label>
            <ErrorMessage name="name" component="span" className="error" />
            <Field type="text" name="name" placeholder="Ingresar nombre" />
          </div>
          <div className="form-input-std">
            <label className="text-neutral-800 dark:text-neutral-200 mb-1">
              Apellido
            </label>
            <ErrorMessage name="last_name" component="span" className="error" />
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
            <Field
              type="text"
              name="email"
              placeholder="Ingresar e-mail"
              className="bg-gray-300"
              readOnly
            />
          </div>
          <Field name="phone">
            {({ field, form, meta }: any) => (
              <div className="form-phone-std">
                <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                  Teléfono
                </label>
                <ErrorMessage name="phone" component="span" className="error" />
                <PhoneInput
                  name="phone"
                  id="phone"
                  placeholder="Ingresar número telefónico"
                  defaultCountry={state.country.toUpperCase() as CountryCode}
                  value={formik.values.phone}
                  onChange={(value: any) => {
                    form.setFieldValue("phone", value);
                    handlePhoneChange(value);
                  }}
                  className="phone-wrapper"
                />
              </div>
            )}
          </Field>

          <div className="grid grid-cols-2 col-span-2 gap-6">
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
                  <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                    Otra Profesión
                  </label>
                  <ErrorMessage
                    name="other_profession"
                    component="span"
                    className="error"
                  />
                  <Field
                    type="text"
                    name="other_profession"
                    placeholder="Ingresar profesion"
                  />
                </div>
              )}
            </div>
            {studentInputs ? (
              <div className="col-span-2 md:col-span-1">
                <div className="col-xl-12 flex gap-2">
                  <div className="form-select-std w-1/2">
                    <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                      Año
                    </label>
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
                    <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                      Carrera
                    </label>
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
              </div>
            ) : (
              <div className="col-span-2 md:col-span-1">
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
                    <option defaultValue="">Seleccionar especialidad</option>
                    {selectedOptionProfession && currentGroup?.length
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
                      name="other_speciality"
                      placeholder="Ingresar especialidad"
                    />
                    <ErrorMessage
                      name="other_speciality"
                      component="div"
                      className="error"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="col-span-2 mb-4 sm:mb-0">
            <span className="dark:text-primary-500 forgot-password">
              ¿Necesitas cambiar tu contraseña?{" "}
              <NcLink
                href="/recuperar"
                className="nc-NcLink underline text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000"
              >
                Hazlo aquí
              </NcLink>
            </span>
          </div>

          <div className="form-input-std">
            <label className="text-neutral-800 dark:text-neutral-200 mb-1">
              Dirección
            </label>
            <ErrorMessage name="address" component="span" className="error" />
            <Field
              type="text"
              name="address"
              placeholder="Ingresar dirección"
            />
          </div>

          <div className="form-select-std w-full">
            <label className="text-neutral-800 dark:text-neutral-200 mb-1">
              País
            </label>
            <ErrorMessage name="country" component="span" className="error" />
            <Field
              as="select"
              name="country"
              value={localUser?.country}
              onChange={(event: any) =>
                handleInputChange("country", event.target.value)
              }
              disabled
            >
              <option defaultValue="">Seleccionar país</option>
              {countries.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </Field>
          </div>

          <div className="form-select-std w-full">
            <label className="text-neutral-800 dark:text-neutral-200 mb-1">
              Provincia
            </label>
            <ErrorMessage name="state" component="span" className="error" />
            {currentStates ? (
              <Field
                as="select"
                name="state"
                value={localUser?.state}
                onChange={(event: any) =>
                  handleInputChange("state", event.target.value)
                }
              >
                <option defaultValue="">Seleccionar provincia</option>
                {currentStates.map((s) => (
                  <option key={`state_${s}`} defaultValue={s}>
                    {s}
                  </option>
                ))}
              </Field>
            ) : (
              <Field
                type="text"
                name="state"
                placeholder="Ingresar Provincia"
              />
            )}
          </div>

          <div className="form-input-std">
            <label className="text-neutral-800 dark:text-neutral-200 mb-1">
              Código postal
            </label>
            <ErrorMessage
              name="postal_code"
              component="span"
              className="error"
            />
            <Field
              type="text"
              name="postal_code"
              placeholder="Ingresar código postal"
            />
          </div>

          <div className="form-input-std">
            <label className="text-neutral-800 dark:text-neutral-200 mb-1">
              Tipo de identificacion
            </label>
            <ErrorMessage name="type_doc" component="span" className="error" />

            <Field
              as="select"
              name="type_doc"
              onChange={handleOptionTypeChange}
              value={`${selectedDocument}/${selectedDocumentId}`}
            >
              <option defaultValue="" value="">
                Seleccionar tipo
              </option>
              {/*{currentDocumentsType[state.country]
                ? currentDocumentsType[state.country].map((p) => (
                    <option key={p.id} value={`${p.type}/${p.id}`}>
                      {p.type}
                    </option>
                  ))
                : ""}*/}
            </Field>
          </div>

          {/* <label className="block">
            {renderInputIdentification()}
          </label> */}
          {/* <InputField
                label="Identificacion"
                type="text"
                name="identification"
                placeholder="Ingresar identificacion"
              /> */}

          {localUser?.country?.includes("México") && (
            <div className="form-input-std">
              <label className="text-neutral-800 dark:text-neutral-200 mb-1">
                Régimen fiscal
              </label>
              <ErrorMessage
                name="fiscal_regime"
                component="span"
                className="error"
              />
              <Field
                type="text"
                name="fiscal_regime"
                placeholder="Ingresar régimen fiscal"
              />
            </div>
          )}

          <Button
            className={
              "md:col-span-2 bg-primary-6000 text-white disabled:bg-grey-disabled disabled:cursor-not-allowed"
            }
            type="submit"
            disabled={formik.isSubmitting || formSubmitted}
          >
            Guardar cambios
          </Button>
          {updateStatusMessage.message && (
            <p
              className={
                updateStatusMessage.type == "error"
                  ? "text-red-500 text-center md:col-span-2"
                  : "text-green-500 text-center md:col-span-2"
              }
            >
              {updateStatusMessage.message}
            </p>
          )}
        </Form>
      </FormikProvider>
    </div>
  );
};

export default DashboardEditProfile;
