export default function translateDocumentType(documentType: string){
    switch (documentType) {
        case "05 - CÉDULA":
            return "CI";
        case "06 - PASAPORTE":
            return "PASSPORT";
        case "RUT":
            return documentType;
        case "NIT":
            return documentType;
        case "RFC":
            return documentType;
        case "Cédula de ciudadanía":
            return "CC";
        case "Cédula de extranjero":
            return "CE";
        case "CUIT":
            return documentType;
        case "CUIL":
            return documentType;
        case "CDI":
            return documentType;
        case "LE":
            return documentType;
        case "LC":
            return documentType;
        case "DNI":
            return documentType;
        default:
            return "EXT";
    }
};