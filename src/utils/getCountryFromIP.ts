export async function getCountryFromIp() {
    try {
      const res = await fetch('/api/get-country');
      if (!res.ok) throw new Error('Failed to fetch country info');
      return await res.json();
    } catch (error) {
      console.error('❌ getCountryFromIp client-side error:', error);
      return { ip: '', country: '', name: '' };
    }
  }
  