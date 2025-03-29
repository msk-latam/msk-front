export const removeAccents = (input: string): string => {
    const acentos: { [key: string]: string } = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'
    };

    return input.replace(/[áéíóúÁÉÍÓÚ]/g, (letra: string) => acentos[letra]);
}