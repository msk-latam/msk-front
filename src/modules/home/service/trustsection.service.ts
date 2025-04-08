// /home/components/service/services.ts
export const fetchTrustSectionData = async () => {
    const response = await fetch('/api/home/trustsection'); // Ruta al endpoint de la API de Next.js
    if (!response.ok) {
      throw new Error('Error fetching trust section data');
    }
    return response.json();
  };
  