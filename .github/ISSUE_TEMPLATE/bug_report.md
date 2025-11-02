---
name: Bug Report
about: Report a problem or unexpected behavior
labels: bug
---

## Description

A clear and concise description of the bug.

## To Reproduce

Steps to reproduce the behavior:

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Actual Behavior

What actually happened? Include error messages if available.

## Expected Behavior

What you expected to happen instead.

## Environment

| Component                            | Version / Info                |
|--------------------------------------|-------------------------------|
| Home Assistant Core                  | e.g. 2025.1.3                 |
| Home Assistant Frontend              | e.g. 20250110.0               |
| Lovelace Dashboard Mode              | YAML / Storage                |
| Browser / Device                     | e.g. Chrome 141 / macOS / iOS |
| Card Version (`trend-analysis-card`) | e.g. 1.0.7                    |
| InfluxDB / API (if used)             | e.g. InfluxDB Cloud 2.3       |

## Screenshots / Logs

<details>
<summary>Console errors (click to expand)</summary>

```
Paste console errors and/or add screenshots.
```

</details>

## Card Configuration

Add your full configuration here (example):

```yaml
type: custom:trend-analysis-card
entity: sensor.example
```

## Additional Context

Add any other context about the problem here.