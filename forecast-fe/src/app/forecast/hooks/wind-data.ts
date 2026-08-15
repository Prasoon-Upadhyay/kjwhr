import { useQuery } from "@tanstack/react-query";
import { useHorizon } from "./use-horizon";
import { useDateTime } from "./use-datetime";
import type { WindDataResponse } from "../schema/wind-data.interfaces";
import client from "../../../common/client/base";
import { formatDateToISO } from "../../../common/formatters/date-formatters";

export function useWindData() {
  const { horizon } = useHorizon();
  const { selectedRange } = useDateTime();

  const formattedFrom = selectedRange?.from ? formatDateToISO(new Date(selectedRange.from)) : "";
  const formattedTo = selectedRange?.to ? formatDateToISO(new Date(selectedRange.to)) : "";

  return useQuery({
    queryKey: ["wind-data", formattedFrom, formattedTo, horizon],

    queryFn: async (): Promise<WindDataResponse> => {
      const response = await client.get("/api/wind-forecast/", {
        params: {
          start: formattedFrom,
          end: formattedTo,
          horizon,
        },
      });

      return response.data;
    },
    retry: false,
    enabled: Boolean(formattedFrom && formattedTo),
  });
}