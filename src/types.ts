import {nothing, TemplateResult} from 'lit';

declare global {
    interface Window {
        customCards?: unknown[];
    }
}


export type TemplateNothing = typeof nothing;
export type Template = TemplateResult | TemplateNothing;

export interface CardConfig {
    header: string;
    entity: string;
    preset?: number;
    showSettings?: boolean;
    showPresets?: boolean;
    showDatePickers?: boolean;
}
