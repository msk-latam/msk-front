export const removeUrlParams = (
  url: string,
  paramsToKeep: string[] = []
): string => {
  const urlObject = new URL(url);

  urlObject.searchParams.forEach((value, key) => {
    if (!paramsToKeep.includes(key)) {
      urlObject.searchParams.delete(key);
    }
  });

  return urlObject.toString();
};

export function keepOnlySpecifiedParams(
  url: string,
  paramsToKeep: string[] = ["especialidad", "profesion", "recurso"]
) {
  const [baseUrl, queryString] = url.split("?");

  if (!queryString) {
    return baseUrl; // No hay parámetros en la URL, no es necesario hacer cambios.
  }

  const queryParams = new URLSearchParams(queryString);
  const existingParams = Array.from(queryParams.keys());

  existingParams.forEach((param) => {
    if (!paramsToKeep.includes(param)) {
      queryParams.delete(param);
    }
  });

  const newQueryString = queryParams.toString();
  return newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl;
}

export function getParamsFromURL(
  url: string,
  paramsToKeep: string[] = ["especialidad", "profesion", "recurso"]
) {
  const [baseUrl, queryString] = url.split("?");
  const queryParams = new URLSearchParams(queryString);
  const existingParams = Array.from(queryParams.keys());
  const params = {} as any;
  existingParams.forEach((param: string) => {
    if (paramsToKeep.includes(param)) {
      params[param] = queryParams.get(param);
    }
  });
  return params;
}
