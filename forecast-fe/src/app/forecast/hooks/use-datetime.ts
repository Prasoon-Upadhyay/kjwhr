import { useContext } from "react";
import { DateTimeContext } from "../context/datetime.context";

export function useDateTime() {
  const context = useContext(DateTimeContext);

  if (!context) {
    throw new Error(
      "useDateTime must be used within a DateTimeProvider"
    );
  }

  return context;
}