import Modal from "@/modules/dashboard/components/ui/Modal";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Input from "./ui/Input";
import PasswordInput from "./ui/PasswordInput";
import PhoneInputWithCode, { findCodePrefix } from "./ui/PhoneInputWithCode";
import Select from "./ui/Select";
import FileInput from "./ui/FileInput";
import { professions } from "@/data/professions";
import { specialtiesGroup } from "@/data/specialties";

interface ProfileCompletion {
  percentage: number;
  message: string;
  ctaText: string;
  ctaLink: string;
}

interface Contract {
  id: number;
}

interface Course {
  id: string | number;
  title: string;
  image?: string | { high?: string; medium?: string; low?: string };
}

export interface UserProfileData {
  profileCompletion?: ProfileCompletion;
  name: string;
  lastName: string;
  profession: string;
  speciality: string;
  email: string;
  country: string;
  phone: string;
  contracts?: Contract[];
  coursesInProgress?: Course[];
  medicalCollegeName?: string | null;
  workplace?: string | null;
  intereses?: string[];
  interesesAdicionales?: string[];
  currentCourse?: Course;
  recommendedResourcesByInterests?: any[];
  workArea?: string;
  belongsToMedicalCollege?: boolean | null;
  phoneCode?: string;
  fullPhoneNumber?: string;
  asosiacion?: string;
  crm_id?: string;
  billingEmail?: string;
  billingName?: string;
  billingPhone?: string;
  billingPhoneCode?: string;
  requiresInvoice?: string;
  documentType?: string;
  documentNumber?: string;
  taxRegime?: string;
  file?: File;
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    updatedData: Partial<UserProfileData>,
    password?: string
  ) => Promise<void>;
  user: UserProfileData | null;
  isSaving: boolean;
  saveError: string | null;
  saveSuccess: boolean;
}

const countryOptions = [
  { value: "ar", label: "Argentina" },
  { value: "bo", label: "Bolivia" },
  { value: "cl", label: "Chile" },
  { value: "co", label: "Colombia" },
  { value: "cr", label: "Costa Rica" },
  { value: "ec", label: "Ecuador" },
  { value: "sv", label: "El Salvador" },
  { value: "gt", label: "Guatemala" },
  { value: "hn", label: "Honduras" },
  { value: "mx", label: "México" },
  { value: "pa", label: "Panamá" },
  { value: "py", label: "Paraguay" },
  { value: "pe", label: "Perú" },
  { value: "es", label: "España" },
  { value: "uy", label: "Uruguay" },
  { value: "ve", label: "Venezuela" },
  { value: "ni", label: "Nicaragua" },
];

const medicalCollegeOptions = [
  { value: "yes", label: "Sí" },
  { value: "no", label: "No" },
];

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
  isSaving,
  saveError,
  saveSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<any>>({});
  const [password, setPassword] = useState<string>("");
  const [selectedProfessionId, setSelectedProfessionId] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      const parsedPhone = findCodePrefix(user.phone || "");
      const initialPhoneCode = parsedPhone ? parsedPhone.code : "+54";
      const initialPhone = parsedPhone ? parsedPhone.number : user.phone || "";

      const selectedProfession = professions.find((p) => p.name === user.profession);

      setFormData({
        crm_id: user.crm_id || "",
        email: user.email || "",
        name: user.name || "",
        lastName: user.lastName || "",
        country: user.country || "",
        phoneCode: initialPhoneCode,
        phone: initialPhone,
        fullPhoneNumber: user.phone || "",
        profession: user.profession || "",
        speciality: user.speciality || "",
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

      setSelectedProfessionId(selectedProfession?.id || null);
      setPassword("");
    } else {
      setFormData({});
      setPassword("");
      setSelectedProfessionId(null);
    }
  }, [user, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<UserProfileData>) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const pathname = usePathname();
  const lang = pathname ? pathname.split("/")[1] || "ar" : "ar";
  const targetPath =
    lang === "ar"
      ? "/login?form=change-pass"
      : `/${lang}/login?form=change-pass`;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "belongsToMedicalCollege") {
      setFormData((prev: Partial<UserProfileData>) => ({
        ...prev,
        [name]: value === "yes" ? true : value === "no" ? false : null,
      }));
    } else if (name === "phoneCode") {
      setFormData((prev: Partial<UserProfileData>) => ({
        ...prev,
        [name]: value,
      }));
    } else if (name === "profession") {
      const selected = professions.find((p) => p.name === value);
      setSelectedProfessionId(selected?.id || null);
      setFormData((prev) => ({ ...prev, profession: value, speciality: "" }));
    } else {
      setFormData((prev: Partial<UserProfileData>) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const filteredSpecialties =
    selectedProfessionId && specialtiesGroup[selectedProfessionId]
      ? specialtiesGroup[selectedProfessionId].slice().sort((a, b) => a.name.localeCompare(b.name))
      : [];


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

    // Call onSave with formData and the current password state
    // If password is empty, it will be passed as undefined (or empty string depending on desired logic)
    onSave(dataToSave, password || undefined);
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
      <div className="text-center text-base md:text-lg text-[#6E737C] mb-6 mt-2">
        Gestiona todo lo relacionado con tus datos personales
      </div>{" "}
      <h3 className="text-lg md:text-2xl  text-center font-medium mb-2">
        Datos personales
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-[#1a1a1a]">
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
      name="profession"
      options={professions.map((p) => ({ label: p.name, value: p.name }))}
      value={formData.profession || ""}
      onChange={handleSelectChange}
      placeholder="Seleccionar profesión"
    />

<Select
  id="specialty"
  label="Especialidad"
  name="speciality"
  options={filteredSpecialties.map((s) => ({ label: s.name, value: s.name }))}
  value={formData.speciality || ""}
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
              <Input
                id="billingEmail"
                label="E-mail de facturación"
                type="email"
                name="billingEmail"
                value={formData.billingEmail || ""}
                onChange={handleChange}
                placeholder="Ingresar e-mail de facturación"
              />
              <div className="grid grid-cols-1 gap-x-6 gap-y-4">
                <PhoneInputWithCode
                  id="billingPhone"
                  label="Teléfono de facturación"
                  value={formData.billingPhone || ""}
                  defaultCode={formData.billingPhoneCode || "+54"}
                  onChange={(phone) => {
                    setFormData((prev) => ({ ...prev, billingPhone: phone }));
                  }}
                />
              </div>
              <Input
                id="billingName"
                label="Razón social"
                type="text"
                name="billingName"
                value={formData.billingName || ""}
                onChange={handleChange}
                placeholder="Ingresar razón social"
              />
              {/* <div className="grid grid-cols-1 grid-rows-2 gap-x-6 gap-y-4 p-1"> */}
              <Select
                id="documentType"
                label="Tipo de identificación"
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
                label="Número de Identificación"
                type="text"
                name="documentNumber"
                value={formData.documentNumber || ""}
                onChange={handleChange}
                placeholder="Ingresar Número de Identificación"
              />
              {/* </div> */}
              <Select
                id="documentType"
                label="Regimen fiscal"
                name="documentType"
                options={[
                //   { label: "DNI", value: "dni" },
                //   { label: "CUIT", value: "cuit" },
                //   { label: "Pasaporte", value: "pasaporte" },
                ]}
                value={formData.documentType || ""}
                onChange={handleSelectChange}
                placeholder="Seleccionar"
              />

              <FileInput
                id="file"
                label="Constancia de la situación fiscal"
                name="file"
                onChange={(e) => {
                  const file =
                    (e.target as HTMLInputElement).files?.[0] || null;
                  setFormData((prev) => ({
                    ...prev,
                    file, // Guarda el objeto File directamente
                  }));
                }}
              />
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
