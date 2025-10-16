# Trend Analysis Card for Home Assistant


## 🚀 Installation

### HACS Installation (Recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Riscue&repository=trend-analysis-card)

### Manual Installation

1. Copy the `dist/trend-analysis-card.js` file into your Home Assistant `www` directory.
2. Add the card as a Lovelace resource:

    ```yaml
    url: /local/trend-analysis-card.js
    type: module
    ```

3. Add the configuration below to your dashboard or view.

---

## 📋 Basic Usage

```yaml
type: custom:trend-analysis-card
header: Change of My Sensor
entity: sensor.my_sensor
preset: 24
showSettings: false
showPresets: true
showDatePickers: false
```

---

## License

MIT © [Riscue][riscue]

[riscue]: https://github.com/riscue
