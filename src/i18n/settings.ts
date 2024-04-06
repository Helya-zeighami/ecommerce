import Cookies from "js-cookie";

export const fallbackLng = "en";
export const languages = [fallbackLng, "fa"];
export const defaultNS = "translation";
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

export function setLanguageInCookie(lng: string) {
  if (languages.includes(lng)) {
    Cookies.set(cookieName, lng);
  }
}

export function getLanguageFromCookie(): string {
  const savedLang = Cookies.get(cookieName) || fallbackLng;
  return languages.includes(savedLang) ? savedLang : fallbackLng;
}
