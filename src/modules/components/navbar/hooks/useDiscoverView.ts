import { useEffect, useState } from 'react';
import { APIResponse, DiscoverViewModel, toDiscoverViewModel } from './types';
import { getNavbar } from '../service/navbar.service';

export function useDiscoverView() {
  const [data, setData] = useState<DiscoverViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    getNavbar()
      .then((navbarData: APIResponse) => {
        // Transform the API response to the DiscoverViewModel
        const discoverData = toDiscoverViewModel(navbarData);
        setData(discoverData);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Error fetching navbar discover data");
      })
      .finally(() => setLoading(false));
  }, []);
console.log(data,'aaaaaaaaaaaaaaaaaaaaaaaaaaa')
  return { data, loading, error };
}