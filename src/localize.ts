// Borrowed from:
// https://github.com/custom-cards/boilerplate-card/blob/master/src/localize/localize.ts

import * as de from './translations/de.json';
import * as en from './translations/en.json';
import * as fr from './translations/fr.json';
import * as it from './translations/it.json';
import * as tr from './translations/tr.json';

const FALLBACK_LANGUAGE = 'en';
const lang = (localStorage.getItem('selectedLanguage') || FALLBACK_LANGUAGE).replace(/['"]+/g, '').replace('-', '_');
const languages: any = {
    de,
    en,
    fr,
    it,
    tr,
};

export function localize(string: string, replacements: { [key: string]: any } = {}): string {
    let translated: string;

    try {
        translated = string.split('.').reduce((o, i) => o[i] || string, languages[lang]);
    } catch (e) {
        translated = string.split('.').reduce((o, i) => o[i] || string, languages[FALLBACK_LANGUAGE]);
    }

    if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i] || string, languages[FALLBACK_LANGUAGE]);
    if (translated === undefined) translated = `${lang}.${string}`;

    Object.entries(replacements).forEach(([key, value]) => {
        if (key !== undefined && value !== undefined) {
            translated = translated.replace(`{{${key}}}`, value);
        }
    })
    return translated;
}
