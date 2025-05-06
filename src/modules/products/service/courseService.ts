import { types } from "util";
import { ContentData } from "../types/types";

export async function getCourse(slug: string, lang: string): Promise<ContentData> {
	const res = await fetch(`/api/course/${slug}?lang=${lang}`);
	if (!res.ok) throw new Error('Failed to fetch course data');
	return res.json();
};
