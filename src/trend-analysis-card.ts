import {CSSResultGroup, html, LitElement, nothing} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import registerTemplates from 'ha-template';
import {fireEvent, HomeAssistant} from 'custom-card-helpers';
import styles from './styles.css';
import {localize, setLanguage} from './localize';
import {CardConfig, Template, TrendData, TrendResult} from './types';

registerTemplates();

const DEFAULT_PRESET = 24;
const GRAPH_MAX_BARS = 30;

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
    @state() private _result!: TrendResult | string | undefined;
    @state() private _range: any = {start: null, end: null};
    @state() private _loading = true;
    @state() private _activePreset: number | null = DEFAULT_PRESET;
    @state() private _showSettings = false;
    @state() private _showInfluxDBDocs = false;

    private presets = [
        {value: 1, label: 'common.preset_1_hour'},
        {value: 12, label: 'common.preset_12_hour'},
        {value: 24, label: 'common.preset_24_hour'},
        {value: 168, label: 'common.preset_7_day'},
        {value: 720, label: 'common.preset_30_day'}
    ];

    static get styles(): CSSResultGroup {
        return styles;
    }

    // noinspection JSUnusedGlobalSymbols
    public setConfig(config: CardConfig): void {
        this._config = config;
        this._activePreset = this._config.preset || DEFAULT_PRESET;
        setLanguage(this._config.language);
    }

    // noinspection JSUnusedGlobalSymbols
    set hass(hass: HomeAssistant) {
        this._hass = hass;
    }

    firstUpdated() {
        this._selectPreset(this._config.preset || DEFAULT_PRESET);
        setLanguage(this._config.language);
    }

    async fetchHistory(start: string, end: string): Promise<TrendData[]> {
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

    async fetchInfluxdb(start: string, end: string): Promise<TrendData[]> {
        const entity = this._config.entity;
        if (!entity) return [];
        try {
            const resp: any = await this._hass.callApi(
                "GET",
                `influxdb_query_api/query/${entity}?start=${start}&end=${end}`
            );
            if (!resp || !Array.isArray(resp) || !resp.length) return [];
            return resp
                .map((i: any) => ({t: new Date(i.time), v: parseFloat(i.value)}))
                .filter((p: any) => !isNaN(p.v));
        } catch (e) {
            console.error("Influxdb fetch failed:", e);
            throw new Error("error.influxdb");
        }
    }

    async calculate() {
        if (!this._range.start || !this._range.end) return;
        this._loading = true;
        this._result = undefined;
        this._showInfluxDBDocs = false;

        try {
            const start = new Date(this._range.start).toISOString();
            const end = new Date(this._range.end).toISOString();
            const data = this._config.source === 'influxdb' ?
                await this.fetchInfluxdb(start, end) :
                await this.fetchHistory(start, end);

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
                    start: data[0].t,
                    end: data[data.length - 1].t,
                    first: data[0].v,
                    last: data[data.length - 1].v,
                    increase: increase,
                    decrease: decrease,
                    delta: netChange,
                    trend: netChange > 0 ? "up" : netChange < 0 ? "down" : "neutral",
                    graphData: this._prepareGraphData(data)
                };
            } else {
                this._result = localize('common.no_data');
            }
        } catch (e: any) {
            if (e.message === "error.influxdb") {
                this._showInfluxDBDocs = true;
                this._result = localize(e.message);
            } else if (e.message.startsWith("error.")) {
                this._result = localize(e.message);
            } else {
                console.error("Trend analysis failed:", e);
                this._result = localize('error.unknown', {message: e.message});
            }
        }

        this._loading = false;
    }

    private _prepareGraphData(data: TrendData[]): number[] {
        if (data.length < 2) return [];

        const step = Math.max(1, Math.floor(data.length / GRAPH_MAX_BARS));
        const sampledData: TrendData[] = [];

        for (let i = 0; i < data.length; i += step) {
            sampledData.push(data[i]);
        }

        if (sampledData[sampledData.length - 1] !== data[data.length - 1]) {
            sampledData.push(data[data.length - 1]);
        }

        const graphData: number[] = [];
        for (let i = 1; i < sampledData.length; i++) {
            graphData.push(sampledData[i].v - sampledData[i - 1].v);
        }
        return graphData;
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

    private _formatDateHumanReadable(date: Date): string {
        return date.toLocaleString();
    }

    private _onStartDateChange(ev: Event) {
        const input = ev.target as HTMLInputElement;
        if (input.value) {
            this._range = {...this._range, start: new Date(input.value)};
            this._activePreset = null;
            this.calculate().then();
        }
    }

    private _onEndDateChange(ev: Event) {
        const input = ev.target as HTMLInputElement;
        if (input.value) {
            this._range = {...this._range, end: new Date(input.value)};
            this._activePreset = null;
            this.calculate().then();
        }
    }

    private _selectPreset(preset: number | null) {
        const now = new Date();
        const start = new Date(now.getTime() - (preset || this._activePreset || DEFAULT_PRESET) * 60 * 60 * 1000);
        this._range = {start: start, end: now};
        this._activePreset = preset;
        this.calculate().then();
    }

    private _selectEntity() {
        const entityId = (this.shadowRoot?.getElementById('entity-selector') as HTMLSelectElement)?.value;
        this._config = {...this._config, entity: entityId};
        this._showSettings = false;
        this._selectPreset(this._config.preset || DEFAULT_PRESET);
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

    private renderHeader(): Template {
        const entityState = this._hass.states[this._config.entity];
        const entityFriendlyName = entityState?.attributes?.friendly_name;
        const header = this._config?.header || (entityFriendlyName ? localize('common.name_entity', {entity_name: entityFriendlyName}) : localize('common.name'));

        return html`
            <div class="card-header">
                <div class="header-content">
                    <div class="header-left">
                        <div class="icon-wrapper">
                            <ha-icon icon="mdi:chart-areaspline"></ha-icon>
                        </div>
                        <div class="header-text" @click="${() => this._showMoreInfo()}">
                            <h4>${header}</h4>
                        </div>
                    </div>
                    ${(this._config.showSettings !== false || this._config.entity === undefined) ? html`
                        <button
                                class="settings-btn ${this._showSettings ? 'active' : ''}"
                                @click=${() => this._showSettings = !this._showSettings}
                        >
                            <ha-icon icon="mdi:cog"></ha-icon>
                        </button>
                    ` : ''}
                </div>

                ${(this._showSettings || !this._config.entity) ? html`
                    <div class="settings-panel">
                        <select id="entity-selector" @change="${this._selectEntity}">
                            <option value="${null}">...</option>
                            ${this._getNumericEntities().map(entityId => {
                                const state = this._hass.states[entityId];
                                return html`
                                    <option value="${entityId}">
                                        <ha-icon icon="${state.attributes.icon}"></ha-icon>
                                        ${state.attributes.friendly_name || entityId}
                                    </option>`;
                            })}
                        </select>
                    </div>
                ` : ''}
            </div>
        `;
    }

    private renderMessage(message: string): Template {
        return html`
            <div class="message">
                <h3>
                    ${message}
                    ${this._showInfluxDBDocs ? html`
                        <a href="https://github.com/Riscue/ha-influxdb-query-api" target="_blank">
                            <p>https://github.com/Riscue/ha-influxdb-query-api</p>
                        </a>` : undefined}
                </h3>
            </div>
        `;
    }

    private renderChanges(): Template {
        if (this._result === undefined) {
            return nothing;
        } else if (typeof this._result === 'string') {
            return this.renderMessage(this._result);
        }

        const entityState = this._hass.states[this._config.entity];
        const unit = entityState?.attributes?.unit_of_measurement || '';

        const data = this._result;
        const increasePercent = (data.increase / (data.increase + data.decrease)) * 100;
        const decreasePercent = (data.decrease / (data.increase + data.decrease)) * 100;

        return html`
            <div class="net-change ${data.trend}">
                <div class="trend-indicator ${data.trend}">
                    <span class="trend-label">
                        ${localize('common.delta')}
                    </span>
                    ${data.trend === 'up' ? html`
                        <ha-icon icon="mdi:trending-up"></ha-icon>
                        <span class="trend-label ${data.trend}">
                            ${localize('common.increase')}
                        </span>
                    ` : data.trend === 'down' ? html`
                        <ha-icon icon="mdi:trending-down"></ha-icon>
                        <span class="trend-label ${data.trend}">
                            ${localize('common.decrease')}
                        </span>
                    ` : nothing
                    }
                </div>
                <div class="value-container">
                    <span class="main-value ${data.trend}">${data.delta.toFixed(2)}</span>
                    <span class="unit">${unit}</span>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card increase">
                    <div class="stat-header">
                        <div class="stat-icon increase">
                            <ha-icon icon="mdi:trending-up"></ha-icon>
                        </div>
                        <span class="stat-label increase">${localize('common.total_increase')}</span>
                    </div>
                    <div class="stat-value-container">
                        <span class="stat-value">${data.increase.toFixed(2)}</span>
                        <span class="stat-unit">${unit}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill increase" style="width: calc(${increasePercent.toFixed(0)}%)"></div>
                    </div>
                </div>

                <div class="stat-card decrease">
                    <div class="stat-header">
                        <div class="stat-icon decrease">
                            <ha-icon icon="mdi:trending-down"></ha-icon>
                        </div>
                        <span class="stat-label decrease">${localize('common.total_decrease')}</span>
                    </div>
                    <div class="stat-value-container">
                        <span class="stat-value">${data.decrease.toFixed(2)}</span>
                        <span class="stat-unit">${unit}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill decrease" style="width: calc(${decreasePercent.toFixed(0)}%)"></div>
                    </div>
                </div>
            </div>
        `;
    }

    private renderDatePickers(): Template {
        if (!this._config.entity) {
            return nothing;
        }

        if (this._config.showPresets !== false && (this._config.showDatePickers === false || this._activePreset !== null)) {
            return nothing;
        }

        return html`
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
        `;
    }

    private renderPresets(): Template {
        if (!this._config.entity) {
            return nothing;
        }

        if (this._config.showPresets === false) {
            return nothing;
        }

        return html`
            <div class="preset-buttons">
                ${this.presets.map(preset => html`
                    <button
                            class="preset-btn ${this._activePreset === preset.value ? 'active' : ''}"
                            @click=${() => this._selectPreset(preset.value)}
                    >
                        ${localize(preset.label)}
                    </button>
                `)}
                ${this._config.showDatePickers !== false ? html`
                    <button
                            class="preset-btn ${this._activePreset === null ? 'active' : ''}"
                            @click=${() => this._selectPreset(null)}
                    >
                        ${localize('common.preset_dates')}
                    </button>
                ` : undefined}
            </div>
        `;
    }

    private renderGraph(): Template {
        if (this._result === undefined || typeof this._result === 'string') {
            return nothing;
        }

        if (this._config.showGraph === false) {
            return nothing;
        }

        const startDate: string = this._formatDateHumanReadable(this._result.start) || '';
        const endDate: string = this._formatDateHumanReadable(this._result.end) || '';
        const graphData: number[] = this._result.graphData || [];
        if (graphData.length === 0) {
            return html`
                <div class="mini-graph">
                    <div class="graph-header">
                        <span>${localize('common.graph_title')}</span>
                        <ha-icon icon="mdi:chart-line"></ha-icon>
                    </div>
                    <div class="graph-empty">
                        <p>${localize('common.no_data')}</p>
                    </div>
                </div>
            `;
        }

        const entityState = this._hass.states[this._config.entity];
        const unit = entityState?.attributes?.unit_of_measurement || '';
        const maxAbsValue = Math.max(...graphData.map((d: any) => Math.abs(d)));
        const scale = maxAbsValue > 0 ? 100 / maxAbsValue : 1;

        return html`
            <div class="mini-graph">
                <div class="graph-header">
                    <div>
                        <span>${localize('common.graph_title')}</span>
                        <span class="dates">(${startDate} - ${endDate})</span>
                    </div>
                    <ha-icon icon="mdi:chart-line"></ha-icon>
                </div>
                <div class="graph-bars">
                    ${graphData.map((item: any) => {
                        const scaledValue = item * scale;
                        const absHeight = Math.abs(scaledValue);

                        if (item === 0) {
                            return html`
                                <div class="graph-bar-wrapper">
                                    <div class="graph-bar neutral">
                                    </div>
                                </div>
                            `;
                        } else if (item > 0) {
                            return html`
                                <div class="graph-bar-wrapper">
                                    <div class="graph-bar positive" style="height: calc(${absHeight / 2}%)">
                                        <span class="bar-tooltip">+${item.toFixed(2)} ${unit}</span>
                                    </div>
                                </div>
                            `;
                        } else if (item < 0) {
                            return html`
                                <div class="graph-bar-wrapper">
                                    <div class="graph-bar negative"
                                         style="height: calc(${absHeight / 2}%); bottom: calc(${50 - absHeight / 2}%)">
                                        <span class="bar-tooltip">${item.toFixed(2)} ${unit}</span>
                                    </div>
                                </div>
                            `;
                        } else {
                            return nothing;
                        }
                    })}
                </div>
            </div>
        `;
    }

    render() {
        return html`
            <ha-card>
                ${this.renderHeader()}

                <div class="card-content">
                    ${this.renderPresets()}
                    ${this.renderDatePickers()}
                    ${this._loading ? html`
                                <div class="loading">
                                    <div class="spinner"></div>
                                </div>` :
                            html`
                                ${this.renderChanges()}
                                ${this.renderGraph()}`
                    }
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
