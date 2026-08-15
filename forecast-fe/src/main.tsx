import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DateTimeProvider } from './app/forecast/context/datetime.context.tsx'
import { HorizonProvider } from './app/forecast/context/horizon.context.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <DateTimeProvider>
        <HorizonProvider>
          <App />
        </HorizonProvider>
      </DateTimeProvider>
    </QueryClientProvider>
)
