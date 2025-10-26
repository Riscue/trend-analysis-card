// Borrowed from:
// https://github.com/custom-cards/boilerplate-card/blob/master/src/localize/localize.ts

import {Language, Translations} from "./types";
import * as de from './translations/de.json';
import * as en from './translations/en.json';
import * as fr from './translations/fr.json';
import * as it from './translations/it.json';
import * as tr from './translations/tr.json';

const FALLBACK_LANGUAGE: Language = 'en';

const languages: Record<Language, Translations> = {
    de,
    en,
    fr,
    it,
    tr,
};

let currentLang: Language = FALLBACK_LANGUAGE;

export function setLanguage(language?: Language) {
    currentLang = language && languages[language] ? language : FALLBACK_LANGUAGE;
    console.log(currentLang);
}

function getTranslation(path: string, lang: Language): string | undefined {
    return path.split('.').reduce((obj: any, key) => obj?.[key], languages[lang]);
}

export function localize(
    key: string,
    replacements: Record<string, string | number> = {}
): string {
    const translation =
        getTranslation(key, currentLang) ??
        getTranslation(key, FALLBACK_LANGUAGE) ??
        `${currentLang}.${key}`;

    return Object.entries(replacements).reduce(
        (str, [placeholder, value]) => str.replace(`{{${placeholder}}}`, String(value)),
        translation
    );
}
