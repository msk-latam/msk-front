type newQueryTerm = {
  key: string;
  value: string;
};

export function updateQueryString(
  endpoint: string,
  queryString: string,
  newQueryString: newQueryTerm
) {
  const searchParams = new URLSearchParams(queryString);
  if (searchParams.has(newQueryString.key)) {
    searchParams.set(newQueryString.key, newQueryString.value);
  } else {
    searchParams.append(newQueryString.key, newQueryString.value);
  }
  return `${endpoint}?${searchParams.toString()}`;
}
