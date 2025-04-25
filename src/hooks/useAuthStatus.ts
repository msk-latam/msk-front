import useSWR from 'swr';

// Clase de error personalizada para incluir el status
class FetchError extends Error {
	status?: number;
}

// fetcher genérico para SWR
const fetcher = async (url: string) => {
	const res = await fetch(url);

	// Si la respuesta no es OK, lanzar un error puede ser útil
	// aunque para este caso específico, siempre devolverá 200 con { isLoggedIn: boolean }
	if (!res.ok) {
		const error = new FetchError('An error occurred while fetching the auth status.');
		// Podrías intentar parsear JSON por si hay un mensaje de error
		try {
			error.message = (await res.json()).message || error.message;
		} catch (e) {
			/* Ignorar error de parseo */
		}
		error.status = res.status;
		throw error;
	}

	return res.json();
};

/**
 * TEMPORAL: Hook para verificar si el usuario parece estar logueado
 * basado únicamente en la *presencia* de la cookie 'access_token'.
 * No verifica la validez del token.
 *
 * @returns {
 *   isLoggedIn: boolean | undefined, // true si la cookie existe, false si no, undefined mientras carga
 *   isLoading: boolean,
 *   error: any
 * }
 */
export function useAuthStatus() {
	// Llama al endpoint que solo chequea la cookie
	const { data, error, isLoading } = useSWR<{ isLoggedIn: boolean }>('/api/auth/status', fetcher, {
		shouldRetryOnError: false, // No reintentar en error
		revalidateOnFocus: true, // Revalidar al volver a la pestaña/ventana
		revalidateIfStale: true, // Revalidar si los datos están "viejos"
	});

	return {
		isLoggedIn: data?.isLoggedIn, // Devuelve true/false o undefined si data no está listo
		isLoading,
		error,
	};
}
