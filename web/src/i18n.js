import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import viCommon from "./locales/vi/common.json";
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    debug: false,
    resources: {
        en: { common: enCommon },
        vi: { common: viCommon },
    },
    ns: ["common"],
    defaultNS: "common",
    fallbackLng: "en",
    supportedLngs: ["en", "vi"],
    interpolation: {
        escapeValue: false,
    },
    detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
    },
});
export default i18n;
