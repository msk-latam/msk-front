export interface JsonData {
    [key: string]: string;
}

export const filterSpecialities = (jsonData: JsonData): string[] => {
    let aux: { [key: string]: string } = {};

    for (let key in jsonData) {
        if (jsonData[key] === "on" && !key.includes("_")) {
            aux[key] = jsonData[key];
        }
    }

    return Object.keys(aux);
};

export const mappingSelectedSpecialities = (jsonData: JsonData, Temas_de_interes: string[], recaptcha_token: string | null): {} => {
    let personalInputs: { [key: string]: string } = {};

    for (let key in jsonData) {
        if (jsonData[key] !== "on" || key.includes('Terms')) {
            personalInputs[key] = jsonData[key];
        }
    }

    return {
        ...personalInputs,
        Temas_de_interes,
        recaptcha_token
    };
};