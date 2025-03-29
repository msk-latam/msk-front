export const getCookie = (name: string) => {
  const cookieName = name + "=";
  if (typeof window !== "undefined") {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
  }
  return "";
};

export const setCookie = (name: string, value: string, days: number) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + expirationDate.toUTCString();
  if (typeof window !== "undefined")
    document.cookie = `${name}=${value};${expires};path=/`;
};

export const deleteCookie = (name: string) => {
  // // console.log("deleteCookie", name);
  if (typeof window == "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  let input = document.querySelector(
    'input[type="hidden"][name="' + name + '"]'
  );
  if (input) {
    // @ts-ignore
    input.value = "";
  }
};
