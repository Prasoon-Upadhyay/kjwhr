import {
  createContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DateRange } from "react-day-picker";

type DateTimeContextType = {
  selectedRange: DateRange | undefined;
  setSelectedRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

const DateTimeContext = createContext<DateTimeContextType | null>(null);

type DateTimeProviderProps = {
  children: ReactNode;
};

export function DateTimeProvider({ children }: DateTimeProviderProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const value = useMemo(
    () => ({
      selectedRange,
      setSelectedRange,
    }),
    [selectedRange]
  );

  return (
    <DateTimeContext.Provider value={value}>
      {children}
    </DateTimeContext.Provider>
  );
}

export { DateTimeContext };