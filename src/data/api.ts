import { countries } from "./countries";
import {
  API_URL,
  DEV_BASE_URL,
  IS_PROD,
  PROD_BASE_URL,
} from "@/contains/constants";

const API_BACKEND_LARAVEL = IS_PROD
  ? `${PROD_BASE_URL}/api`
  : `${DEV_BASE_URL}/api`;

const baseUrl = IS_PROD ? PROD_BASE_URL : DEV_BASE_URL;

//console.log({IS_PROD,PROD_BASE_URL, DEV_BASE_URL, baseUrl})

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

export const ALL_PRODUCTS_MX = `${API_URL}/products?limit=-1&country=${countryParam}&type=course${filterProductsParam}&asd=tes3`;
export const BEST_SELLERS_MX = `${API_URL}/home/best-sellers?country=${countryParam}`;
export const NOTE_SPECIALITIES = `${API_URL}/posts-specialities`;

export { baseUrl, API_URL, IP_API };
