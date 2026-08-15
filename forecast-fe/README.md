# Forecast.ly Frontend

GitHub: https://github.com/Prasoon-Upadhyay/forecast-fe

Frontend for a wind forecast accuracy visualization app built for the FuelHH + WindFor challenge.

This application helps users intuitively compare:

- **actual UK wind generation**
- **forecasted UK wind generation**

over a selected time range, while allowing the user to control the **forecast horizon** used to choose the forecast value shown for each target timestamp.

Live frontend: `https://forecastly-self.vercel.app`

---

## Overview

The goal of the app is to make forecast accuracy easy to understand visually.

For a user-selected date-time range, the UI displays:

- **Actual generation** line
- **Forecast generation** line

The forecast shown for each timestamp is not just any forecast. It is the one selected by the backend according to the assignment rule:

> choose the latest forecast that was created at least **N hours before** the target time

where **N** is controlled by the user through the horizon slider.

This makes the UI useful not just as a graph, but as an interactive tool to inspect how forecast quality changes as forecast lead time changes.

---

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS 4**
- **TanStack React Query**
- **Axios**
- **Apache ECharts**
- **react-day-picker**
- **Zod**
- **use-debounce**

---

## Overview

### 1. Clean feature-oriented structure
The frontend is organized around the forecast feature rather than dumping all logic into a flat `src/` tree.

Key folders:

- `src/app/forecast/components`
- `src/app/forecast/context`
- `src/app/forecast/hooks`
- `src/app/forecast/schema`

This keeps UI, state, data-fetching, and validation concerns separated cleanly.

### 2. State kept intentionally simple
Instead of overengineering global state, the app uses two focused context providers:

- `DateTimeProvider`
- `HorizonProvider`

### 3. Strong client-side input handling
The UI validates the time inputs and horizon values using **Zod** schemas before applying them.

That means the frontend does not blindly accept malformed hour/minute or slider values, which improves reliability and reduces bad API calls.

### 4. Charting Library - ECharts
The chart is implemented with **ECharts**, which is a strong fit here because it gives:

- Smooth time-series rendering
- Built-in zooming (`dataZoom`)
- Good tooltip handling
- Responsive scaling support
- Less-Verbose, easy to implement.

This is a better fit for an exploratory charting UI than a very basic chart library.

### 5. Production-friendly data fetching
The app uses **React Query** for server-state management, which gives:

- Stable query-key based caching
- Fetch state handling
- Retry control
- Clean parameter-driven refetching when range or horizon changes

This makes the data layer much more maintainable than wiring everything manually with `useEffect`.

### 6. UX details that add polish

There are several implementation details that improve the user experience:

- Editable time picker with validation
- Debounced slider updates to avoid excessive requests
- Explicit loading / empty / error states
- Responsive chart scaling based on viewport width

### 7. Enforcing Code Quality 
- Setup pre-commit hooks using `husky`
- This enforces quality code commits to repo only, no errors are pushed.

---

## Architecture

### High-level flow

1. User selects:
   - Start Date/Time
   - End Date/Time
   - Forecast Horizon

2. These values are stored in context.

3. `useWindData()` builds the API params and calls the backend.

4. The backend returns aligned records shaped like:

```ts
{
  startTime: string;
  actual: number | null;
  forecast: number | null;
}
```

5. The records are then used to build the chart config which is then passed to ECharts Chart Component.

## Folder Structure

src/
  app/
    forecast/
      components/
        chart/
          chart.components.tsx
          chart.constants.ts
          chart.utils.ts
        calendar.component.tsx
        date-picker.component.tsx
        picker-popover.component.tsx
        slider.component.tsx
        time-picker.component.tsx
      context/
        datetime.context.tsx
        horizon.context.tsx
      hooks/
        use-datetime.ts
        use-horizon.ts
        wind-data.ts
      schema/
        datetime.schema.ts
        horizon.schema.ts
        wind-data.interfaces.ts
      forecast.screen.tsx
  common/
    client/
      base.ts
    formatters/
      date-formatters.ts
  App.tsx
  main.tsx


## Starting Development Server
- Run `npm run dev` to start development server
- The Live FE is hosted at https://forecastly-self.vercel.app/
