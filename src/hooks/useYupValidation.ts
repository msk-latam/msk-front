import * as Yup from "yup";

export interface ContactFormSchema {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone: string;
  Profesion: string;
  Especialidad: string;
  Terms_And_Conditions: boolean;
  Description?: string;
  Pais?: string;
  Otra_profesion?: string;
  year?: string;
  career?: string;
  Otra_especialidad?: string;
  Preferencia_de_contactaci_n?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  recaptcha_token?: string | null;
  URL_ORIGEN?: string;
  leadSource?: string | null;
  Ebook_consultado?: string | null;
  Cursos_consultados?: string | null;
}
export interface TemarioFormSchema {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone: string;
  Profesion: string;
  Terms_And_Conditions: boolean;
  Description?: string;
  Pais?: string;
  Otra_profesion?: string;
  year?: string;
  career?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  recaptcha_token?: string | null;
}

export interface CancelSubscriptionSchema {
  first_name: string;
  last_name: string;
  email: string;
  identificacion: string;
  Terms_And_Conditions: boolean;
  motivo_solicitud: string;
  recaptcha_token?: string | null;
}

const firstNameValidation = Yup.string().required("El nombre es requerido");
const lastNameValidation = Yup.string().required("El apellido es requerido");
const phoneValidation = Yup.string().required("El teléfono es requerido");

const professionValidation = Yup.string().required("La profesión es requerida");

const specialtyValidation = Yup.string().required(
  "La especialidad es requerida"
);

const anotherProfessionValidation = Yup.string().test(
  "other-profession",
  "La profesion es requerida",
  function (value) {
    const profession = this.parent.Profesion;
    if (profession === "Otra Profesion" && !value) {
      return new Yup.ValidationError(
        "La profesion es requerida",
        value,
        "Otra_profesion"
      );
    }
    return true;
  }
);

const careerYearValidation = Yup.string().test(
  "student-year",
  "El año es requerido para estudiantes",
  function (value) {
    const profession = this.parent.Profesion;
    if (profession === "Estudiante" && !value) {
      return new Yup.ValidationError("El año es requerido", value, "year");
    }
    return true;
  }
);

const careerValidation = Yup.string().test(
  "student-year",
  "La carrera es requerido para estudiantes",
  function (value) {
    const profession = this.parent.Profesion;
    if (profession === "Estudiante" && !value) {
      return new Yup.ValidationError(
        "La carrera es requerida",
        value,
        "career"
      );
    }
    return true;
  }
);

const anotherSpecialtyValidation = Yup.string().test(
  "other-speciality",
  "El año es requerido para estudiantes",
  function (value) {
    const specialty = this.parent.Especialidad;
    if (specialty === "Otra Especialidad" && !value) {
      return new Yup.ValidationError(
        "La especialidad es requerida",
        value,
        "Otra_especialidad"
      );
    }
    return true;
  }
);

const identificationValidation = Yup.string().required(
  "La identificación es requerida"
);

const formReason = Yup.string().required("El motivo de solicitud es requerido");
const emailValidation = Yup.string()
  .email("Correo electrónico inválido")
  .required("El correo electrónico es requerido");

const termsAndConditionsValidation = Yup.boolean()
  .oneOf([true], "Debes aceptar los términos y condiciones")
  .required("Debes aceptar los términos y condiciones");
const themesNewsletterValidation = Yup.array()
  .of(Yup.string())
  .min(1, "Se requiere al menos 1 tema de interés")
  .required();

export const useYupValidation = () => {
  const contactFormValidation: Yup.Schema<ContactFormSchema> =
    Yup.object().shape({
      First_Name: firstNameValidation,
      Last_Name: lastNameValidation,
      Email: emailValidation,
      Phone: phoneValidation,
      Description: Yup.string(),
      Profesion: professionValidation,
      Especialidad: specialtyValidation,
      Otra_profesion: anotherProfessionValidation,
      year: careerYearValidation,
      career: careerValidation,
      Otra_especialidad: anotherSpecialtyValidation,
      Terms_And_Conditions: termsAndConditionsValidation,
    });
  const temarioFormValidation: Yup.Schema<TemarioFormSchema> =
    Yup.object().shape({
      First_Name: firstNameValidation,
      Last_Name: lastNameValidation,
      Email: emailValidation,
      Phone: phoneValidation,
      Description: Yup.string(),
      Profesion: professionValidation,
      Otra_profesion: anotherProfessionValidation,
      year: careerYearValidation,
      career: careerValidation,
      Terms_And_Conditions: termsAndConditionsValidation,
    });
  const cancelSubscriptionValidation: Yup.Schema<CancelSubscriptionSchema> =
    Yup.object().shape({
      first_name: firstNameValidation,
      last_name: lastNameValidation,
      email: emailValidation,
      identificacion: identificationValidation,
      motivo_solicitud: formReason,
      tipo_documento: Yup.string().required(
        "El tipo de documento es requerido"
      ),
      zsWebFormCaptchaWord: Yup.string().required("El captcha es requerido"),
      Terms_And_Conditions: termsAndConditionsValidation,
    });
  const newsletterValidation = Yup.object().shape({
    First_Name: firstNameValidation,
    Last_Name: lastNameValidation,
    Email: emailValidation,
    Profesion: professionValidation,
    Especialidad: specialtyValidation,
    Temas_de_interes: themesNewsletterValidation,
    Terms_And_Conditions2: termsAndConditionsValidation,
  });

  return {
    contactFormValidation,
    temarioFormValidation,
    cancelSubscriptionValidation,
    newsletterValidation,
  };
};
