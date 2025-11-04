import {HomeAssistant} from 'custom-card-helpers';

import {Language, Translations} from './types';
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

export class Localize {

    private static currentLanguage: Language = FALLBACK_LANGUAGE;

    static initialize(hass?: HomeAssistant, manualLanguage?: Language) {
        if (manualLanguage && languages[manualLanguage]) {
            this.currentLanguage = manualLanguage;
            console.debug(`%cTREND-ANALYSIS-CARD %c Manual language set to '${manualLanguage}'`, 'padding: 2px 0px 2px 8px; font-weight: bold; background-color: gray; color: white;', '');
        } else if (hass?.locale?.language) {
            if (languages[hass.locale.language as Language]) {
                this.currentLanguage = hass.locale.language as Language;
                console.debug(`%cTREND-ANALYSIS-CARD %c Hass language set to '${hass.locale.language}'`, 'padding: 2px 0px 2px 8px; font-weight: bold; background-color: gray; color: white;', '');
            } else {
                this.currentLanguage = FALLBACK_LANGUAGE;
                console.debug(`%cTREND-ANALYSIS-CARD %c Hass language set to '${hass.locale.language}', but no translation found. Falling back to '${FALLBACK_LANGUAGE}'`, 'padding: 2px 0px 2px 8px; font-weight: bold; background-color: gray; color: white;', '');
            }
        } else {
            this.currentLanguage = FALLBACK_LANGUAGE;
            console.debug(`%cTREND-ANALYSIS-CARD %c No language set, falling back to '${FALLBACK_LANGUAGE}'`, 'padding: 2px 0px 2px 8px; font-weight: bold; background-color: gray; color: white;', '');
        }
    }

    private static getTranslation(path: string, lang: Language): string | undefined {
        try {
            return path
                .split('.')
                .reduce((obj: any, key) => obj?.[key], languages[lang]) as string | undefined;
        } catch (_) {
            return undefined;
        }
    }

    static localize(key: string, replacements: Record<string, string | number> = {}): string | undefined {
        const translation =
            this.getTranslation(key, this.currentLanguage) ??
            this.getTranslation(key, FALLBACK_LANGUAGE) ??
            undefined;

        return Object.entries(replacements).reduce(
            (str, [placeholder, value]) =>
                str?.replace(new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g'), String(value)),
            translation
        );
    }

    static t(key: string, replacements: Record<string, string | number> = {}): string | undefined {
        return this.localize(key, replacements);
    }
}

export const t = Localize.t.bind(Localize);
export const localize = Localize.t.bind(Localize);
