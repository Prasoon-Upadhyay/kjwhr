
export type WindDataPoint = {
  startTime: string;
  actual: number | null;
  forecast: number | null;
};

export interface WindDataResponse {
  result: WindDataPoint[],
}
