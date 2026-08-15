import { useContext } from "react";
import { HorizonContext } from "../context/horizon.context";

export function useHorizon() {
  const context = useContext(HorizonContext);

  if (!context) {
    throw new Error(
      "useHorizon must be used within a HorizonProvider"
    );
  }

  return context;
}