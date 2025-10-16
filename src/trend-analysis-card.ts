import {CSSResultGroup, html, LitElement} from 'lit';
import registerTemplates from 'ha-template';
import {localize} from './localize';
import {fireEvent, HomeAssistant} from 'custom-card-helpers';
import styles from './styles.css';
import {customElement, property, state} from 'lit/decorators.js';
import {CardConfig} from './types';

registerTemplates();

const PKG_VERSION = 'PKG_VERSION_VALUE';

console.info(
    `%cTREND-ANALYSIS-CARD %c${PKG_VERSION}`,
    "padding: 2px 0px 2px 8px; font-weight: bold; background-color: gray; color: white;",
    "padding: 2px 8px 2px 0px; font-weight: bold; background-color: gray; color: turquoise;",
);

@customElement('trend-analysis-card')
export class TrendAnalysisCard extends LitElement {
    @property({attribute: false}) public _hass!: HomeAssistant;
    @state() private _config!: CardConfig;
    @state() private _result: any;
    @state() private _range: any = {start: null, end: null};
    @state() private _loading = true;
    @state() private _activePreset: number | null = 24;
    @state() private _showEntityPicker = false;

    static get styles(): CSSResultGroup {
        return styles;
    }

    public setConfig(config: CardConfig): void {
        this._config = config;
        this._activePreset = this._config.preset || 24;
    }

    set hass(hass: HomeAssistant) {
        this._hass = hass;
    }

    firstUpdated() {
        this._setPreset(this._config.preset || 24);
    }

    async fetchHistory(start: string, end: string) {
        const entity = this._config.entity;
        if (!entity) return [];
        const resp: any = await this._hass.callApi(
            "GET",
            `history/period/${start}?filter_entity_id=${entity}&end_time=${end}`
        );
        if (!resp.length) return [];
        return resp[0]
            .map((i: any) => ({t: new Date(i.last_changed), v: parseFloat(i.state)}))
            .filter((p: any) => !isNaN(p.v));
    }

    async calculate() {
        if (!this._range.start || !this._range.end) return;
        this._loading = true;
        this._result = undefined;

        const start = new Date(this._range.start).toISOString();
        const end = new Date(this._range.end).toISOString();
        const data = await this.fetchHistory(start, end);

        let increase = 0;
        let decrease = 0;
        if (data.length >= 2) {
            for (let i = 1; i < data.length; i++) {
                const diff = data[i].v - data[i - 1].v;
                if (diff > 0) increase += diff;
                else decrease += Math.abs(diff);
            }
        }
        if (data.length != 0) {
            const netChange = data[data.length - 1].v - data[0].v;
            this._result = {
                start: data[0].v.toFixed(2),
                end: data[data.length - 1].v.toFixed(2),
                increase: increase.toFixed(2),
                decrease: decrease.toFixed(2),
                delta: netChange.toFixed(2),
                trend: netChange > 0 ? "up" : netChange < 0 ? "down" : "neutral",
            };
        } else {
            this._result = localize('common.no_data');
        }

        this._loading = false;
    }

    private _showMoreInfo() {
        if (!this._config?.entity) return;
        fireEvent(this, "hass-more-info", {entityId: this._config.entity});
    }

    private _formatDateTimeLocal(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    private _onStartDateChange(ev: Event) {
        const input = ev.target as HTMLInputElement;
        if (input.value) {
            this._range = {...this._range, start: new Date(input.value)};
            this._activePreset = null;
            this.calculate();
        }
    }

    private _onEndDateChange(ev: Event) {
        const input = ev.target as HTMLInputElement;
        if (input.value) {
            this._range = {...this._range, end: new Date(input.value)};
            this._activePreset = null;
            this.calculate();
        }
    }

    private _setPreset(hours: number) {
        const now = new Date();
        const start = new Date(now.getTime() - hours * 60 * 60 * 1000);
        this._range = {start, end: now};
        this._activePreset = hours;
        this.calculate();
    }

    private _toggleEntityPicker() {
        this._showEntityPicker = !this._showEntityPicker;
    }

    private _selectEntity(entityId: string) {
        this._config = {...this._config, entity: entityId};
        this._showEntityPicker = false;
        this._setPreset(this._config.preset || 24);
    }

    private _getNumericEntities() {
        return Object.keys(this._hass.states)
            .filter(entityId => {
                const state = this._hass.states[entityId];
                const stateValue = parseFloat(state.state);
                return !isNaN(stateValue) && state.state !== 'unknown' && state.state !== 'unavailable';
            })
            .sort();
    }

    render() {
        const r = this._result;
        const entityState = this._hass.states[this._config.entity];
        const unit = entityState?.attributes?.unit_of_measurement || '';
        const configHeader = this._config?.header;
        const entityFriendlyName = entityState?.attributes?.friendly_name;
        let header = localize('common.name');
        if (configHeader) {
            header = configHeader;
        } else if (entityFriendlyName) {
            header = localize('common.name_entity', {entity_name: entityFriendlyName});
        }

        return html`
            <ha-card>
                <div class="header" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
                    <h1 class="cursor-pointer" @click="${() => this._showMoreInfo()}">
                        ${header}
                    </h1>
                    ${this._config.showSettings !== false || !entityState ? html`
                        <ha-icon icon="mdi:cog" class="cursor-pointer" style="padding: 4px;"
                                 @click="${() => this._toggleEntityPicker()}"></ha-icon>
                    ` : ''}
                    ${this._showEntityPicker ? html`
                        <div class="entity-picker-dropdown">
                            <input
                                    type="text"
                                    placeholder="${localize('common.search_placeholder')}"
                                    class="entity-search"
                                    @input=${(e: Event) => {
                                        const input = e.target as HTMLInputElement;
                                        const items = this.shadowRoot?.querySelectorAll('.entity-item');
                                        items?.forEach((item: Element) => {
                                            const text = item.textContent?.toLowerCase() || '';
                                            const searchTerm = input.value.toLowerCase();
                                            (item as HTMLElement).style.display = text.includes(searchTerm) ? 'block' : 'none';
                                        });
                                    }}
                            />
                            <div class="entity-list">
                                ${this._getNumericEntities().map(entityId => {
                                    const state = this._hass.states[entityId];
                                    return html`
                                        <div
                                                class="entity-item ${this._config.entity === entityId ? 'selected' : ''}"
                                                @click=${() => this._selectEntity(entityId)}
                                        >
                                            <div class="entity-name">${state.attributes.friendly_name || entityId}</div>
                                            <div class="entity-id">${entityId}</div>
                                        </div>
                                    `;
                                })}
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="card">
                    <div style="margin-top: 0.5rem;">
                        ${this._config.showPresets !== false ? html`
                            <div style="display: flex; flex-wrap: wrap; justify-content: space-between">
                                <button @click=${() => this._setPreset(1)}
                                        class="preset-btn ${this._activePreset === 1 ? 'active' : ''}">
                                    ${localize('common.preset_1_hour')}
                                </button>
                                <button @click=${() => this._setPreset(12)}
                                        class="preset-btn ${this._activePreset === 12 ? 'active' : ''}">
                                    ${localize('common.preset_12_hour')}
                                </button>
                                <button @click=${() => this._setPreset(24)}
                                        class="preset-btn ${this._activePreset === 24 ? 'active' : ''}">
                                    ${localize('common.preset_24_hour')}
                                </button>
                                <button @click=${() => this._setPreset(168)}
                                        class="preset-btn ${this._activePreset === 168 ? 'active' : ''}">
                                    ${localize('common.preset_7_day')}
                                </button>
                                <button @click=${() => this._setPreset(720)}
                                        class="preset-btn ${this._activePreset === 720 ? 'active' : ''}">
                                    ${localize('common.preset_30_day')}
                                </button>
                            </div>
                        ` : ''}
                        ${this._config.showDatePickers !== false ? html`
                            <div class="date-input-container">
                                <div class="date-input-wrapper">
                                    <label>${localize('common.beginning')}</label>
                                    <input
                                            type="datetime-local"
                                            .value=${this._range.start ? this._formatDateTimeLocal(this._range.start) : ''}
                                            @change=${this._onStartDateChange}
                                    />
                                </div>
                                <div class="date-input-wrapper">
                                    <label>${localize('common.end')}</label>
                                    <input
                                            type="datetime-local"
                                            .value=${this._range.end ? this._formatDateTimeLocal(this._range.end) : ''}
                                            @change=${this._onEndDateChange}
                                    />
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    ${this._loading
                            ? html`
                                <div class="loading">
                                    <div class="spinner"></div>
                                </div>`
                            : html`
                                <div class="results-container">
                                    ${!r
                                            ? html``
                                            : typeof r === "string"
                                                    ? html`
                                                        <div>${r}</div>`
                                                    : html`
                                                        <div>${localize('common.beginning')}: ${r.start} ${unit}</div>
                                                        <div>${localize('common.end')}: ${r.end} ${unit}</div>
                                                        <div class="trend-up">🔺 ${localize('common.total_increase')}: ${r.increase} ${unit}
                                                        </div>
                                                        <div class="trend-down">🔻 ${localize('common.total_decrease')}: ${r.decrease} ${unit}
                                                        </div>
                                                        <div class=${r.trend === "up" ? "trend-up" : r.trend === "down" ? "trend-down" : "trend-neutral"}>
                                                            ${r.trend === "up" ? "📈" : r.trend === "down" ? "📉" : "➖"}
                                                            ${localize('common.delta')}: ${r.delta} ${unit}
                                                        </div>`}
                                </div>`}
                </div>
            </ha-card>
        `;
    }
}

window.customCards = window.customCards || [];
window.customCards.push({
    preview: true,
    type: 'trend-analysis-card',
    name: localize('common.name'),
    description: localize('common.description')
});
