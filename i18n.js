import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";


const resources = {
    en: {
        common: require('./locales/en/common.json'),
    },
    cn: {
        common: require('./locales/cn/common.json'),
    },
    fr: {
        common: require('./locales/fr/common.json'),
    },
    hi: {
        common: require('./locales/hi/common.json'),
    },
    jp: {
        common: require('./locales/jp/common.json'),
    },
    sp: {
        common: require('./locales/sp/common.json'),
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        defaultNS: 'common',
        lang: 'en',
        ns: ['common'],
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: resources
    })

export default i18n;
