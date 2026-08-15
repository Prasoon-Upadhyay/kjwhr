# Forecast Monitoring Application

A full-stack forecast monitoring application for visualizing UK national wind power generation forecasts against actual generation data.

## Project Structure

```text
.
├── forecast_api/
│   └── Backend API for fetching and processing wind generation
│       forecast and actual generation data.
│
├── forecast-fe/
│   └── Frontend application for visualizing forecast and
│       actual wind generation data.
│
├── forecast-analysis/
│   └── Jupyter notebooks containing the forecast error analysis
│       and historical wind generation reliability analysis.
│
└── README.md
```

## Application

The application allows users to select a time range and compare:

* Actual wind power generation
* Forecasted wind power generation
* Forecasts based on a configurable forecast horizon

The application uses data from the Elexon BMRS API.

## Running the Application

### Backend

Navigate to the backend directory:

```bash
cd forecast_api
```

Create and activate a Python virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Start the backend server using the project's configured Django/ASGI entry point.

### Frontend

Navigate to the frontend directory:

```bash
cd forecast-fe
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will then be available at the local development URL shown in the terminal.

## Analysis

The `forecast-analysis` directory contains the Jupyter notebooks used for:

1. Forecast error analysis, including error characteristics across forecast horizons and different times of day.
2. Historical wind generation analysis and the recommendation for reliably available wind generation capacity.

To run the notebooks:

```bash
cd forecast-analysis
jupyter notebook
```

## Deployed Application

The deployed application is available at:

https://forecastly-self.vercel.app/

## Technologies

* React
* TypeScript
* Python
* Django
* Jupyter Notebook
* Elexon BMRS API
* Vercel
