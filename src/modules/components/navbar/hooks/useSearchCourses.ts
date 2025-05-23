'use client';

import { useEffect, useState } from 'react';

type Product = {
	id: number;
	title: string;
	link: string;
};

export const useSearchCourses = (lang: string, searchTerm: string) => {
	const [courses, setCourses] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const CACHE_KEY = 'course-search-cache';
	const TTL = 1000 * 60 * 60 * 2; // 2 horas

	interface CachedCourse {
		id: number;
		title: string;
		link: string;
		timestamp: number;
	}

	function loadCache(): Record<string, CachedCourse[]> {
		const raw = localStorage.getItem(CACHE_KEY);
		if (!raw) return {};
		try {
			return JSON.parse(raw);
		} catch {
			return {};
		}
	}

	function saveCache(cache: Record<string, CachedCourse[]>) {
		localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
	}

	function isExpired(timestamp: number) {
		return Date.now() - timestamp > TTL;
	}
	function cleanCache() {
		const cache = loadCache();
		let updated = false;

		for (const key in cache) {
			if (cache[key].length === 0 || isExpired(cache[key][0].timestamp)) {
				delete cache[key];
				updated = true;
			}
		}

		if (updated) {
			saveCache(cache);
		}
	}

	useEffect(() => {
		cleanCache();
	}, []);

	useEffect(() => {
		const trimmed = searchTerm.trim();
		if (trimmed === '') {
			setCourses([]);
			setLoading(false);
			setError(null);
			return;
		}

		const controller = new AbortController();
		const { signal } = controller;

		const fetchData = async () => {
			setLoading(true);
			setError(null);

			const searchKey = `${lang || 'int'}::${trimmed.toLowerCase()}`;
			const cache = loadCache();

			// 1. Si hay cache y no expiró, usarlo
			if (cache[searchKey] && !isExpired(cache[searchKey][0]?.timestamp || 0)) {
				const cachedCourses = cache[searchKey].map(({ id, title, link }) => ({ id, title, link }));
				setCourses(cachedCourses);
				setLoading(false);
				return;
			}

			try {
				const apiUrl = `https://cms1.msklatam.com/wp-json/msk/v1/search-products?lang=${encodeURIComponent(
					lang || 'int',
				)}&search=${encodeURIComponent(trimmed)}`;

				const response = await fetch(apiUrl, { signal });
				if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

				const data = await response.json();
				const now = Date.now();
				console.log(data);

				const fetchedCourses = data.products.map((product: Product) => ({
					id: product.id,
					title: product.title,
					link: product.link,
					timestamp: now,
				}));

				// 2. Guardar en cache
				cache[searchKey] = fetchedCourses;

				// 3. También podés guardar en forma global para reutilizar por ID
				// Esto lo dejo opcional, pero se puede hacer con otra clave como `cacheById[product.id] = {...}`

				saveCache(cache);

				const strippedCourses = fetchedCourses.map(({ id, title, link }: any) => ({ id, title, link }));
				setCourses(strippedCourses);
			} catch (e: any) {
				if (e.name !== 'AbortError') {
					setError(e.message);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		// Cancel in-flight request if searchTerm/lang changes or component unmounts
		return () => controller.abort();
	}, [lang, searchTerm]);

	return { courses, loading, error };
};
