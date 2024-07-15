export const isProduction =
typeof window !== "undefined"
  ? window.location.hostname === "msklatam.com"
  : false;