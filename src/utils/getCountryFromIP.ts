// utils/getCountryFromIp.ts

export async function getCountryFromIp() {
    try {
      // Paso 1: Obtener IP pública
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ip = ipData.ip;
  
      // Paso 2: Obtener país por IP
      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const geoData = await geoResponse.json();
      console.log('[DEBUG] IP Lookup result:', { ip, geoData });
      // Paso 3: Devolver datos
      return {
        ip,
        country: geoData.country?.toLowerCase(),
        
        name: geoData.country_name || '',
        
      };
    } catch (error) {
      console.error('❌ Error en getCountryFromIp:', error);
      return { ip: '', country: '', name: '' };
    }
  }
  