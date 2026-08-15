import {
  createContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type HorizonContextType = {
  horizon: number;
  setHorizon: React.Dispatch<React.SetStateAction<number>>;
};

const HorizonContext = createContext<HorizonContextType | null>(null);

type HorizonProviderProps = {
  children: ReactNode;
};

export function HorizonProvider({ children }: HorizonProviderProps) {
  const [horizon, setHorizon] = useState<number>(4);

  const value = useMemo(
    () => ({
      horizon,
      setHorizon,
    }),
    [horizon]
  );

  return (
    <HorizonContext.Provider value={value}>
      {children}
    </HorizonContext.Provider>
  );
}

export { HorizonContext };