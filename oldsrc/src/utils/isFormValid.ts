export function isFormValid(requiredFields: string[], formValues: any, formErrors: any, formTouched: any) {
  //console.log(requiredFields);
  for (let i = 0; i < requiredFields.length; i++) {
    const fieldName = requiredFields[i];

    // Verificar si el campo está en formValues y tiene un valor válido
    if (!(fieldName in formValues) || formValues[fieldName] === "" || formValues[fieldName] === null || formValues[fieldName] === false) {
      return false;
    }

    // Verificar si el campo está en formErrors y ha sido tocado
    if (fieldName in formErrors && formTouched[fieldName]) {
      return false;
    }

    // Verificar condiciones específicas para el campo "profesion"
    if (fieldName === "Profesion") {
      // Verificar si "profesion" contiene "estudiante"
      if (formValues[fieldName].includes("Estudiante")) {
        // Si contiene "estudiante", no es necesario validar "Especialidad"
        continue;
      }
    }

    // Verificar condiciones específicas para los campos "year" y "carrer"
    if (fieldName === "year" || fieldName === "career") {
      // Verificar si los campos no están vacíos
      if (formValues[fieldName] === "") {
        return false;
      }
    }
  }
  return true;
}