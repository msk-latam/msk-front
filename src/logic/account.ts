import api from "Services/api";
import activeIcon from "/images/icons/activo.svg";
import inactiveIcon from "/images/icons/inactivo.svg";
import expiredIcon from "/images/icons/expirado.svg";
import trialIcon from "/images/icons/trialIcon.svg";

export const goToLMS = async (
  product_code: number,
  cod_curso: string,
  email: string
) => {
  const res = await api.getLinkLMS(product_code, cod_curso, email);
  window.open(res.sso, "_blank");
  return res;
};

export const goToEnroll = async (product_code: number, email: string) => {
  const res = await api.enrollCourse(product_code, email);
  return res;
};

export function hasText(status: string) {
  switch (status) {
    case "Sin enrolar":
      return "Activar";
    case "Listo para enrolar":
      return "Ir a enrolar";
    case "Activo":
      return "Ir al curso";
    case "Finalizado":
      return "Ir al curso";
    default:
      return status;
  }
}

export const productFinishOrActive = (status: string) =>
  status.includes("Activo") || status.includes("Finalizado");
export const productStatusIsExpired = (status: string) =>
  status.includes("Expirado");

export const getStatusIcon = (status: string | null, statusOV: string | null = null) => {
console.log(status, statusOV)
   // Verificar si es un caso especial de "Trial"
   if (statusOV === "Trial") {
    return status === "Prueba" ? trialIcon : inactiveIcon;
  }

  // Objeto de mapeo para asociar estados con iconos
  const iconMapping: Record<string, any> = {
    Activo: activeIcon,
    Finalizado: activeIcon,
    Expirado: expiredIcon,
  };

  // Devolver el icono correspondiente o el icono inactivo por defecto
  return status ? iconMapping[status] || inactiveIcon : inactiveIcon;
};

export const statusCourse = (status: string) => {
  const statusObj: { isDisabled: boolean; hasText: string, statusText: string } = {
    isDisabled: true,
    hasText: "",
    statusText: status,
  };

  switch (status) {
    case "Inactivo":
    case "Expirado":
      statusObj.isDisabled = true;
      statusObj.hasText = "Activar";
      break;
    case "Sin enrolar":
      statusObj.isDisabled = false;
      statusObj.hasText = "Activar";
      break;
    case "Activo":
    case "Finalizado":
      statusObj.isDisabled = false;
      statusObj.hasText = "Ir al curso";
      break;
  }

  return statusObj;
};

export const statusOrdenVenta = (status: string, statusCourse: string | null = null) => {
  const statusObj: { 
    isDisabled: boolean; 
    hasText: string | null; 
    disabledText: string | null; 
    color: string 
  } = {
    isDisabled: true,
    disabledText: null,
    hasText: null,
    color: "",
  };

  switch (status) {
    case "Baja":
      statusObj.isDisabled = true;
      statusObj.disabledText = "Baja"
      statusObj.hasText = null;
      statusObj.color = "red";
      break;
    case "Trial suspendido":
      statusObj.isDisabled = true;
      statusObj.disabledText = "Prueba cancelada";
      statusObj.hasText = null;
      statusObj.color = "trial";
      break;
    case "Trial":
      statusObj.isDisabled = false;
      statusObj.hasText = "Prueba";
      statusObj.disabledText = "Prueba";
      statusObj.color = "trial";
      break;
    default:
      statusObj.isDisabled = false;
      statusObj.hasText = "";
      statusObj.disabledText = "";
      statusObj.color = "";
      break;
  }

  return statusObj;
};

export const colorStatus = (status: string) => {
  switch (status) {
    case "Activo":
      return "teal-active";
    case "Sin enrolar":
      return "gray";
    case "Expirado":
    case "Baja":
      return "red";
    case "Finalizado":
      return "green";
  }
};
