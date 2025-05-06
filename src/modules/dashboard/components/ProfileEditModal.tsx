import Modal from "@/modules/dashboard/components/ui/Modal";
import React, { useEffect, useState } from "react";
// Import the new UI components
import Link from "next/link";
// REMOVED: import { ClipLoader } from 'react-spinners'; // Import a spinner
import Input from "./ui/Input";
import PasswordInput from "./ui/PasswordInput";
import PhoneInputWithCode, { findCodePrefix } from "./ui/PhoneInputWithCode"; // Import the helper
import Select from "./ui/Select";
import { getLocalizedUrl } from "@/utils/getLocalizedUrl";
import { usePathname } from "next/navigation";
import { supportedLanguages } from "@/config/languages";
// Import types from the service
// REMOVED: import { UserData, UserDetail } from '@/lib/localStorageService/userDataService';

// --- Define the new interface based on useProfile data ---
interface ProfileCompletion {
  percentage: number;
  message: string;
  ctaText: string;
  ctaLink: string;
}

interface Contract {
  id: number;
  // ... other contract fields if needed
}

interface Course {
  id: string | number;
  title: string;
  image?: string | { high?: string; medium?: string; low?: string }; // Allow for different image structures
  // ... other course fields if needed
}

export interface UserProfileData {
  profileCompletion?: ProfileCompletion;
  name: string; // Was: name
  lastName: string;
  profession: string;
  speciality: string; // Was: speciality
  email: string;
  country: string;
  phone: string; // Raw phone string from API, e.g., +52619961317
  contracts?: Contract[];
  coursesInProgress?: Course[];
  medicalCollegeName?: string | null; // Was: asosiacion
  workplace?: string | null; // Was: placeOfWork
  intereses?: string[];
  interesesAdicionales?: string[];
  currentCourse?: Course;
  recommendedResourcesByInterests?: any[]; // Use a more specific type if available
  // Fields needed by the form but potentially not in the API response yet
  workArea?: string;
  belongsToMedicalCollege?: boolean | null;
  // Fields derived/used internally by the form
  phoneCode?: string; // Parsed from phone
  fullPhoneNumber?: string; // Value used by the PhoneInputWithCode component
  asosiacion?: string;
}
// --- End New Interface ---

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: Partial<UserProfileData>) => Promise<void>; // Expecting a promise now
  user: UserProfileData | null;
  isSaving: boolean; // loading state from useSaveUserProfile
  saveError: string | null; // error message from useSaveUserProfile
  saveSuccess: boolean; // success state managed by parent
}

// --- Dummy Data for Selects (Replace with actual data source) ---
const professionOptions = [
  { value: "medico", label: "Médico/a" },
  { value: "enfermero", label: "Enfermero/a" },
  { value: "farmaceutico", label: "Farmacéutico/a" },
  { value: "Licenciado de la salud", label: "Licenciado de la salud" }, // Added from example
  { value: "otro", label: "Otro" },
];

const specialtyOptions = [
  { value: "administracion-y-gestion", label: "Administración y gestión" },
  { value: "anestesiologia-y-dolor", label: "Anestesiología y dolor" },
  { value: "cardiologia", label: "Cardiología" },
  { value: "dermatologia", label: "Dermatología" },
  { value: "diabetes", label: "Diabetes" },
  { value: "emergentologia", label: "Emergentología" },
  { value: "endocrinologia", label: "Endocrinología" },
  { value: "gastroenterologia", label: "Gastroenterología" },
  { value: "geriatria", label: "Geriatría" },
  { value: "ginecologia", label: "Ginecología" },
  { value: "hematologia", label: "Hematología" },
  { value: "infectologia", label: "Infectología" },
  { value: "medicina-familiar", label: "Medicina familiar" },
  { value: "medicina-general", label: "Medicina general" },
  { value: "medicina-intensiva", label: "Medicina intensiva" },
  { value: "medicina-laboral", label: "Medicina laboral" },
  { value: "nefrologia", label: "Nefrología" },
  { value: "nutricion", label: "Nutrición" },
  { value: "oftalmologia", label: "Oftalmología" },
  { value: "oncologia", label: "Oncología" },
  { value: "pediatria", label: "Pediatría" },
  { value: "psiquiatria", label: "Psiquiatría" },
  { value: "radiologia-e-imagenologia", label: "Radiología e imagenología" },
  { value: "traumatologia", label: "Traumatología" },
  { value: "urologia", label: "Urología" },
  { value: "bioquimica", label: "Bioquímica" },
];

const countryOptions = [
  { value: "argentina", label: "Argentina" },
  { value: "mexico", label: "México" },
  { value: "españa", label: "España" },
  { value: "colombia", label: "Colombia" },
  // Add more countries
];

const medicalCollegeOptions = [
  { value: "yes", label: "Sí" },
  { value: "no", label: "No" },
];

// --- End Dummy Data ---

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
  isSaving, // Receive prop
  saveError, // Receive prop
  saveSuccess, // Receive prop
}) => {
  const [formData, setFormData] = useState<Partial<any>>({});
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (user) {
      console.log("user", user);

      const parsedPhone = findCodePrefix(user.phone || "");
      const initialPhoneCode = parsedPhone ? parsedPhone.code : "+54";
      const initialPhone = parsedPhone ? parsedPhone.number : user.phone || "";

      setFormData({
        // Directly use interface fields matching form
        crm_id: user.crm_id || "",
        email: user.email || "",
        name: user.name || "",
        lastName: user.lastName || "",
        country: user.country || "",
        phoneCode: initialPhoneCode,
        phone: initialPhone, // Keep parsed number for potential internal use
        fullPhoneNumber: user.phone || "", // Use raw phone for PhoneInput
        profession: user.profession || "",
        speciality:
          specialtyOptions.find((option) => option.label === user.speciality)
            ?.value || "", // Search in array and assign value
        workplace: user.workplace || "",
        workArea: user.workArea || "",
        belongsToMedicalCollege: user.medicalCollegeName
          ? true
          : user.medicalCollegeName === null
          ? null
          : false,
        medicalCollegeName: user.medicalCollegeName || "",
        asosiacion: user.asosiacion || "",
      });
      setPassword("");
    } else {
      setFormData({});
      setPassword("");
    }
  }, [user, isOpen]);

  // Updated handler for combined phone input and other regular inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Use the new interface for state update
    setFormData((prev: Partial<UserProfileData>) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for password input
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "ar";
  const targetPath =
    lang === "ar"
      ? "/login?form=change-pass"
      : `/${lang}/login?form=change-pass`;

  // Handler for most select inputs (excluding phone code which is handled internally now)
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "belongsToMedicalCollege") {
      // Use the new interface for state update
      setFormData((prev: Partial<UserProfileData>) => ({
        ...prev,
        [name]: value === "yes" ? true : value === "no" ? false : null,
      }));
    } else if (name === "phoneCode") {
      // Kept for potential direct code changes, ensure correct state type
      setFormData((prev: Partial<UserProfileData>) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      // Use the new interface for state update
      setFormData((prev: Partial<UserProfileData>) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handler for the combined phone input component
  const handleCombinedPhoneChange = (combinedValue: string) => {
    const parsed = findCodePrefix(combinedValue);
    const code = parsed ? parsed.code : formData.phoneCode || "+54"; // Use current/default if parse fails
    const number = parsed ? parsed.number : combinedValue; // Assume number if parse fails

    // Use the new interface for state update
    setFormData((prev: Partial<UserProfileData>) => ({
      ...prev,
      phoneCode: code, // This still updates the separate field
      phone: number, // This still updates the separate field
      fullPhoneNumber: combinedValue, // Update the combined field
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave: Partial<UserProfileData> = { ...formData };

    // Password handling should occur within the onSave logic (in the API route or hook)
    // if (password) {
    //  dataToSave.password = password; // Example: Pass password if it was changed
    //	console.warn('Password field was changed - Handled separately.');
    // }

    // Call onSave but don't close the modal here
    onSave(dataToSave);
    // REMOVED: onClose();
  };

  if (!isOpen || !user) return null; // Check against 'user' prop

  // --- Button State Logic ---
  let buttonContent: React.ReactNode = "Guardar cambios";
  let buttonDisabled = isSaving || saveSuccess;
  let buttonClasses =
    "px-8 py-3 w-full max-w-[500px] text-white font-medium rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center"; // Added flex centering

  if (isSaving) {
    buttonContent = (
      <>
        {/* REMOVED: <ClipLoader color='#ffffff' size={20} speedMultiplier={0.7} /> */}
        <span className="ml-2">Guardando...</span>
      </>
    );
    buttonClasses += " bg-[#a9a9a9] cursor-not-allowed"; // Greyed out and disabled look
  } else if (saveSuccess) {
    buttonContent = "Datos guardados";
    buttonClasses += " bg-green-500 cursor-not-allowed"; // Green success and disabled look
  } else if (saveError) {
    // Keep original button text on error, but it's enabled
    buttonClasses += " bg-[#9200AD] hover:bg-[#7a0092] focus:ring-[#9200AD]";
    buttonDisabled = false; // Re-enable button on error
  } else {
    // Default state
    buttonClasses += " bg-[#9200AD] hover:bg-[#7a0092] focus:ring-[#9200AD]";
  }
  // --- End Button State Logic ---

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mi cuenta" size="large">
      <div className="text-center text-base md:text-lg text-gray-600 mb-6 mt-2">
        Gestiona todo lo relacionado con tus datos personales
      </div>{" "}
      <h3 className="text-lg md:text-2xl  text-center font-medium mb-2">
        Datos profesionales
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-1">
          <Input
            id="firstName"
            label="Nombre/s"
            type="text"
            name="name" // Matches interface/state
            value={formData.name || ""} // Matches interface/state
            onChange={handleChange}
            placeholder="Ingresar nombre/s"
            required
            autoComplete="given-name"
          />
          <Input
            id="lastName"
            label="Apellido/s"
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            placeholder="Ingresar apellido/s"
            required
            autoComplete="family-name"
          />
          <Select
            id="country"
            label="País"
            name="country"
            options={countryOptions}
            value={formData.country || ""}
            onChange={handleSelectChange}
            placeholder="Seleccionar país"
            required
            autoComplete="country-name"
          />
          <div className="relative">
            <PasswordInput
              id="password"
              label="Contraseña"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Ingresar contraseña"
              autoComplete="new-password"
            />
            <span className="md:absolute top-0 right-0 relative mt-1.5 text-xs font-medium text-[#6E737C] ">
              ¿Necesitas cambiar tu contraseña?&nbsp;{" "}
              {/* Use &nbsp; for non-breaking space */}
              <button
                type="button"
                onClick={() => {
                  document.cookie =
                    "recovery_flow_active=true; path=/; max-age=600";
                  document.cookie = `country=${lang}; path=/; max-age=60`;

                  console.log(
                    `[Hazlo aquí] Cookies activadas: recovery_flow_active=true, country=${lang}`
                  );
                  window.location.href = targetPath;
                }}
                className="text-[#9200AD] underline hover:text-[#700084] transition"
              >
                Hazlo aquí
              </button>
            </span>
          </div>
          <Input
            id="email"
            label="E-mail"
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Ingresar e-mail"
            required
            autoComplete="email"
          />
          <PhoneInputWithCode
            id="phone"
            label="Teléfono"
            // Use fullPhoneNumber which holds the combined value
            value={formData.fullPhoneNumber || ""}
            defaultCode={formData.phoneCode || "+54"}
            onChange={handleCombinedPhoneChange} // Use the new handler
            required
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg md:text-2xl  text-center font-medium mb-2">
            Datos profesionales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-1">
            <Select
              id="profession"
              label="Profesión"
              name="profession" // Matches interface/state
              options={professionOptions}
              value={formData.profession || ""} // Matches interface/state
              onChange={handleSelectChange}
              placeholder="Seleccionar profesión"
            />

            <Select
              id="specialty"
              label="Especialidad"
              name="speciality" // Corrected: use speciality
              options={specialtyOptions}
              value={formData.speciality || ""} // Corrected: use specialty
              onChange={handleSelectChange}
              placeholder="Seleccionar especialidad"
            />

            <Input
              id="workplace"
              label="Lugar de trabajo"
              type="text"
              name="workplace" // Matches interface/state
              value={formData.workplace || ""} // Matches interface/state
              onChange={handleChange}
              placeholder="Ingresar lugar de trabajo"
              autoComplete="organization"
            />
            <Input
              id="workArea"
              label="Área de trabajo"
              type="text"
              name="workArea"
              value={formData.workArea || ""} // Use workArea
              onChange={handleChange}
              placeholder="Ingresar área de trabajo"
            />
            <Select
              id="belongsToMedicalCollege"
              label="¿Perteneces a un colegio médico, sociedad o similar?"
              name="belongsToMedicalCollege"
              options={medicalCollegeOptions}
              value={formData.asosiacion !== "" ? "yes" : "no"}
              onChange={handleSelectChange}
              placeholder="Seleccionar"
            />

            <Input
              id="medicalCollegeName"
              label="¿Cuál?"
              type="text"
              name="medicalCollegeName" // Matches interface/state
              value={formData.asosiacion || ""} // Matches interface/state
              onChange={handleChange}
              placeholder="Ingresar colegio médico, sociedad o similar"
            />
          </div>
          <div className="mt-6">
            <h3 className="text-lg md:text-2xl text-center font-medium mb-2">
              Datos de facturación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-1">
              <Input
                id="billingEmail"
                label="E-mail de facturación"
                type="email"
                name="billingEmail"
                value={formData.billingEmail || ""}
                onChange={handleChange}
                placeholder="Ingresar e-mail de facturación"
              />
              <Input
                id="billingName"
                label="Razón social"
                type="text"
                name="billingName"
                value={formData.billingName || ""}
                onChange={handleChange}
                placeholder="Ingresar razón social"
              />
              <div className="grid grid-cols-1 grid-rows-2 gap-x-6 gap-y-4 p-1">
                <PhoneInputWithCode
                  id="billingPhone"
                  label="Teléfono de facturación"
                  value={formData.billingPhone || ""}
                  defaultCode={formData.billingPhoneCode || "+54"}
                  onChange={(phone) => {
                    setFormData((prev) => ({ ...prev, billingPhone: phone }));
                  }}
                />
                <Select
                  id="requiresInvoice"
                  label="¿Requiere factura fiscal?"
                  name="requiresInvoice"
                  options={[
                    { label: "Sí", value: "yes" },
                    { label: "No", value: "no" },
                  ]}
                  value={formData.requiresInvoice || ""}
                  onChange={handleSelectChange}
                  placeholder="Seleccionar"
                />
              </div>
              <div className="grid grid-cols-1 grid-rows-2 gap-x-6 gap-y-4 p-1">
                <Select
                  id="documentType"
                  label="Tipo de documento"
                  name="documentType"
                  options={[
                    { label: "DNI", value: "dni" },
                    { label: "CUIT", value: "cuit" },
                    { label: "Pasaporte", value: "pasaporte" },
                  ]}
                  value={formData.documentType || ""}
                  onChange={handleSelectChange}
                  placeholder="Seleccionar"
                />
                <Input
                  id="documentNumber"
                  label="Identificación"
                  type="text"
                  name="documentNumber"
                  value={formData.documentNumber || ""}
                  onChange={handleChange}
                  placeholder="Ingresar identificación"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center pt-6 mt-6">
          {/* Use flex-col for button and error */}
          {saveError &&
            !isSaving && ( // Show error only if not currently saving
              <p className="text-red-600 text-sm mt-2 text-center">
                {saveError}
              </p>
            )}
          <button
            type="submit"
            className={buttonClasses}
            disabled={buttonDisabled}
          >
            {buttonContent}
          </button>
          {/* Display Error Message */}
        </div>
      </form>
    </Modal>
  );
};

export default ProfileEditModal;
