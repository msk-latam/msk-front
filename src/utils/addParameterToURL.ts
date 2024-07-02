import {slugifySpecialty} from "@/lib/Slugify";

export const addParameterToURL = (param: string, value: any) => {
    const url = new URL(window.location.href);
    //console.log("hi", url, param, value);
    if (!url.searchParams.has("recurso") && param === 'resources' && typeof value.name !== 'undefined') {
        let valueToUrl = value.name.includes("Curso") ? 'curso' : 'guias-profesionales';
        url.searchParams.set("recurso", valueToUrl);
        window.history.replaceState({}, document.title, url.toString());
    }
    if (!url.searchParams.has("profesion") && param === 'professions' && typeof value.slug !== 'undefined') {
        url.searchParams.set("profesion", value.slug);
        window.history.replaceState({}, document.title, url.toString());
    }
    if (!url.searchParams.has("duracion") && param === 'duration' && typeof value.slug !== 'undefined') {
        url.searchParams.set("duracion", value.slug);
        window.history.replaceState({}, document.title, url.toString());
    }
    if (param === 'specialties' && typeof value.name !== 'undefined') {
        url.searchParams.set("especialidad", slugifySpecialty(value.name));
        window.history.replaceState({}, document.title, url.toString());
    }
  }