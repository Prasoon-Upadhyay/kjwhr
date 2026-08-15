# Forecast.ly Backend

GitHub: https://github.com/Prasoon-Upadhyay/forecast-BE

Backend service for a wind forecast accuracy visualization app built for the FuelHH + WindFor challenge.

This service fetches data from BMRS datasets, validates inputs, applies forecast-horizon logic, aligns actual and forecasted data, and returns a clean time-series response ready for visualization.

---

## Overview

This backend powers the application by combining:

- **Actual wind generation** from the **FUELHH** dataset
- **Forecasted wind generation** from the **WINDFOR** dataset

For a given time range and forecast horizon, the backend returns:

- `startTime`
- `actual`
- `forecast`

The key requirement implemented is:

> For each target timestamp, select the **latest forecast** that was published at least **N hours before the target time**

This ensures the frontend displays realistic forecast performance.

---

## Tech Stack

- **Python 3.11**
- **Django 5**
- **Django REST Framework**
- **Pandas**
- **NumPy**
- **Requests**
- **Gunicorn**
- **Docker / Docker Compose**

---

## Key Highlights

### 1. Business Logic Centralized in Backend

The most important requirement, forecast selection based on horizon - is implemented entirely in the backend.

This ensures:

- A single source of truth
- Consistent behavior across clients
- Simpler frontend

---

### 2. Clean Separation of Concerns

The codebase is structured into:

- **API Layer** → Request Handling (views)
- **Validation Layer** → Srializers
- **Service Layer** → External API calls
- **Processing Layer** → Pandas Transformations
- **Infrastructure Layer** → HTTP Client, Server Timing, Config

---

### 3. Pandas-based Data Processing

Since the problem is time-series and tabular:

- Timestamp alignment
- Filtering
- Grouping
- Merging

are handled using Pandas

---

### 4. Production-Oriented Setup

Even for an assignment, this backend includes:

- Docker support for ease
- Gunicorn setup
- CORS configuration
- Structured Error handling to improve Code Quality
- Server Timing Header to observe API Latency and subprocesses.

---

### 5. Observability via Server-Timing

A custom middleware measures time spent in:

- External API calls
- Processing
- Database
- Caching
- Request Lifecycle

and exposes it via `Server-Timing` headers.

---

## Architecture

### Request Flow

1. Client sends request:

```http
GET /api/wind-forecast/?start=...&end=...&horizon=...
```

2. Serializer validates:

- Start datetime
- End datetime
- Horizon (1–48)

3. Backend fetches:

- Actual data from FUELHH
- Forecast data from WINDFOR
- Forecast processing, which includes proper dataframe computation keeping `horizon` in mind, filtering and joining both actual
and forecasted dataframes, clean the missing values, and return the JSON Response.

## Project Structure
forecast-be/
  forecast/
    serializers.py
    urls.py
    views.py
  forecast_api/
    services/
      fuelhh.py
      windfor.py
      http_client.py
      server_timing.py
    literals.py
    settings.py
    urls.py
  Dockerfile
  docker-compose.yml
  manage.py
  requirements.txt

## API
- Endpoint: GET /api/wind-forecast/

### Example
- Request : `GET /api/wind-forecast/?start=2025-01-10T00:00:00Z&end=2025-01-12T00:00:00Z&horizon=4`
- Response:
```
  {
  "result": [
    {
      "startTime": "2025-01-10T00:00:00Z",
      "actual": 8123,
      "forecast": 7998
    }
  ]
}
```

## Starting Development Server

### Docker
- Make sure Docker Desktop is up and running.
- Run `docker compose build` to build image.
- Run `docker compose up` to run the server.
- Run `docker compose down` to stop.
  
### In Django
- Make sure to setup virtual environment (.venv)
- Run `pip install -r requirements.txt`
- Run python manage.py runserver to start the server.
