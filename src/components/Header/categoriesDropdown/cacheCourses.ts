export function getCachedCourses() {
	const cacheKey = 'all-courses';
	const TTL = 24 * 60 * 60 * 1000;
	const isServer = typeof window === 'undefined';

	if (isServer) return null;

	const cachedData = localStorage.getItem(cacheKey);
	if (cachedData) {
		const { value, timestamp } = JSON.parse(cachedData);
		const now = Date.now();

		if (now - timestamp < TTL) {
			console.log('Courses fetched from cache');
			return value;
		}
	}
	return null;
}
