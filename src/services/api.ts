export const api = {
	getCountryCode: async (): Promise<string> => {
	  try {
		const response = await fetch('https://api.ipify.org?format=json');
		const data = await response.json();
		return data.country_code?.toLowerCase() || 'ar'; // fallback en caso de error
	  } catch (error) {
		console.error('❌ Error al detectar el país por IP:', error);
		return 'ar'; // fallback por defecto
	  }
	},
  };
  
  export default api;