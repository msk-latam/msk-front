export function useCompleteProfile() {
	const deleteCookie = async () => {
		fetch('/api/complete-profile', {
			method: 'DELETE',
		});
	};

	return {
		deleteCookie,
	};
}
