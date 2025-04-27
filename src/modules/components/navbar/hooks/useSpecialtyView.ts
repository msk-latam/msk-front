import { useEffect, useState } from 'react';
import { APIResponse, SpecialtyViewModel, toSpecialtyViewModel } from './types';
import { getNavbar } from '../service/navbar.service';

export function useSpecialtyView() {
  const [data, setData] = useState<SpecialtyViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    getNavbar()
      .then((navbarData: APIResponse) => {
        // Transform the API response to the DiscoverViewModel
        const specialtyData = toSpecialtyViewModel(navbarData);
        setData(specialtyData);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Error fetching navbar specialty data");
      })
      .finally(() => setLoading(false));
  }, []);
console.log(data,'AAAAAAAAAAA')
  return { data, loading, error };
}