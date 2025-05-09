export const removeParameterFromURL = (param: string, value: string) => {
  const url = new URL(window.location.href);
  //console.log("REMOVE PARAM FROM URL");
  //console.log(url, param, value);
  if (param === 'resources') {
    url.searchParams.delete("recurso");
    window.history.replaceState({}, document.title, url.toString());
  }
  if (param === 'professions') {
    url.searchParams.delete("profesion");
    window.history.replaceState({}, document.title, url.toString());
  }
  if (param === 'duration') {
    url.searchParams.delete("duracion");
    window.history.replaceState({}, document.title, url.toString());
  }
  if (param === 'specialties') {
    url.searchParams.delete("especialidad");
    window.history.replaceState({}, document.title, url.toString());
  }
  if (param === 'page'){
    url.searchParams.delete("page");
    window.history.replaceState({}, document.title, url.toString());
  }
}