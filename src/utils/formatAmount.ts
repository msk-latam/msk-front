export const formatAmount = (amount: number, currency: string): string => {
  try {
    // Redondear el monto a números enteros
    const roundedAmount = Math.round(amount);

    // Formatear como cadena y agregar separadores de miles
    const formattedAmount = `${roundedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

    const conditionTypeCoin = formattedAmount.includes(currency) || formattedAmount.includes("US$");

    // Agregar manualmente el símbolo de moneda y espacio delante del monto
    const customFormattedAmount = `${formattedAmount} ${
      conditionTypeCoin ? "" : currency
    }`;

    return customFormattedAmount;
  } catch (error: any) {
    console.error(`Error formatting currency: ${error.message}`);
    return `${currency} ${amount}`; // Devuelve el monto sin formato en caso de error
  }
};
