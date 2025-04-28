import { useEffect, useState } from 'react';
import { APIResponse, ResourcesViewModel, toResourcesViewModel } from './types';
import { getNavbar } from '../service/navbar.service';

export function useResourcesView() {
  const [data, setData] = useState<ResourcesViewModel| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNavbar()
      .then((navbarData: APIResponse) => {
        // Transform the API response to the ResourcesViewModel array
        const resourceData = toResourcesViewModel(navbarData);
        setData(resourceData);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Error fetching navbar resource data");
      })
      .finally(() => setLoading(false));
  }, []);
  return { data, loading, error };
}