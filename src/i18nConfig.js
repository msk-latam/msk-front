import ssr from "/src/services/ssr";
import { countries } from "@/data/countries";

let locales = countries.map((item) => item.id);
locales.push("int");

const i18nConfig = {
  locales: locales,
  defaultLocale: "int",
  serverSetCookie: "always",
  localeDetector: async (request, config) => {
    //If the cookie NEXT_LOCALE is set, use that, if not query the API and set the cookie
    let cookie = request.cookies.get("NEXT_LOCALE");
    if (cookie) {
      return cookie.value;
    } else {
      let countryCode = await ssr.getCountryCode();
      // console.log('Country0', countryCode);
      request.cookies.set("NEXT_LOCALE", countryCode);
      return countryCode;
    }
  },
};

module.exports = i18nConfig;
