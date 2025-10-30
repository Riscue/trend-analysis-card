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

export interface TrendData {
    t: Date,
    v: number
}

export interface TrendResult {
    start: Date;
    end: Date;
    first: number;
    last: number;
    increase: number;
    decrease: number;
    delta: number;
    trend: 'up' | 'down' | 'neutral';
    chartData: number[];
}

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
