import useSWR from 'swr';
import { Curso } from '../types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCurso = (slug: string) => {
	const { data, error, isLoading } = useSWR<Curso>(`https://cms1.msklatam.com/wp-json/msk/v1/course/${slug}`, fetcher);

	return {
		data,
		error,
		loading: isLoading,
	};
};
