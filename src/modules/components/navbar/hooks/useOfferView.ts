import { useEffect, useState } from 'react';
import { APIResponse, OfferViewModel, toOfferViewModel } from './types';
import { getNavbar } from '../service/navbar.service';

export function useOfferView() {
  const [data, setData] = useState<OfferViewModel| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNavbar()
      .then((navbarData: APIResponse) => {
        // Transform the API response to the OfferViewModel array
        const offerData = toOfferViewModel(navbarData);
        setData(offerData);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Error fetching navbar offer data");
      })
      .finally(() => setLoading(false));
  }, []);
console.log(data,'dslfjsdofjjjAAAAAAAAAAAAAA1654651')
  return { data, loading, error };
}