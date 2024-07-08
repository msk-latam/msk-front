import { countries } from "./countries";

const API_URL = process.env.NEXT_PUBLIC_MSK_WP_API;
const PROD_BASE_URL = process.env.NEXT_PUBLIC_PUBLIC_URL;
const DEV_BASE_URL = process.env.NEXT_PUBLIC_PUBLIC_URL_DEV;

const API_BACKEND_LARAVEL = process.env.PROD
  ? `${process.env.NEXT_PUBLIC_PUBLIC_URL}/api`
  : `${process.env.NEXT_PUBLIC_PUBLIC_URL_DEV}/api`;

const baseUrl = process.env.PROD
  ? PROD_BASE_URL
  : DEV_BASE_URL;

console.log({PROD_BASE_URL, DEV_BASE_URL, baseUrl})

const API_BACKEND_URL = API_BACKEND_LARAVEL;

const IP_API = `${API_BACKEND_LARAVEL}/getCountryByIP`;

let COUNTRY: string | null = "";
let isProductionEnv: boolean = false;
if (typeof window !== "undefined") {
  COUNTRY = localStorage.getItem("country");
  isProductionEnv = window.location.hostname === "msklatam.com";
}

const filterProductsParam = isProductionEnv ? "" : "&filter=all";
let validCountries = countries.map((item) => item.id);
const countryParam = validCountries.includes(COUNTRY || "") ? COUNTRY : "int";

export const ALL_PRODUCTS_MX = `${API_URL}/products?limit=-1&country=${countryParam}&type=course${filterProductsParam}`;
export const BEST_SELLERS_MX = `${API_URL}/home/best-sellers?country=${countryParam}`;
export const NOTE_SPECIALITIES = `${process.env.NEXT_PUBLIC_MSK_WP_API}/posts-specialities`;

export { baseUrl, API_URL, API_BACKEND_URL, IP_API };
