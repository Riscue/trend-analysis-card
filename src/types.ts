import {nothing, TemplateResult} from 'lit';

declare global {
    interface Window {
        customCards?: unknown[];
    }
}

export type Language = 'de' | 'en' | 'fr' | 'it' | 'tr';
export type Translations = Record<string, any>;

export type TemplateNothing = typeof nothing;
export type Template = TemplateResult | TemplateNothing;

export interface CardConfig {
    header: string;
    entity: string;
    preset?: number;
    source?: 'recorder' | 'influxdb';
    language?: Language;
    showSettings?: boolean;
    showPresets?: boolean;
    showDatePickers?: boolean;
}
