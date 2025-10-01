# Towbook Cloud Dispatch Dashboard

This project provides a responsive, cloud-inspired dashboard for a towing and impound management platform. The UI mirrors the Towbook sample provided and includes:

- Company dispatch overview metrics with live status counts
- A live dispatch board with filtering and refresh simulation
- Impound yard snapshot and reporting cards for operations insights
- A fully interactive dispatching workspace with call management, driver messaging, and survey operations

## Getting Started

1. Start a local web server from the repository root (for example with Python):
   ```bash
   python -m http.server 8000
   ```
2. Visit [http://localhost:8000](http://localhost:8000) in your browser to view the dashboard.

All assets are static (HTML, CSS, and JavaScript) and require no additional build steps.

## Dispatching Workspace

Navigate to the **Dispatching** tab to access the operational console:

- **View Calls** &mdash; filter calls by customer, vehicle, zone, personnel, or date range. Counts and status summaries update instantly as you apply filters.
- **Driver Messaging** &mdash; select a driver to review the live conversation stream and send real-time updates. Unread indicators clear automatically once you open a thread.
- **Surveys** &mdash; manage customer, driver, and vendor surveys with status toggles and filtering controls.

Use the **New Dispatch** button on the dashboard header to jump directly into the dispatching workflow.
