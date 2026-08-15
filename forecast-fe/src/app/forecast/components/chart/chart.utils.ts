import type {
  EChartsOption,
  SeriesOption,
  TooltipComponentOption,
} from "echarts";
import { formatDateTime } from "../../../../common/formatters/date-formatters";

export type WindChartDataPoint = {
  startTime: string;
  actual: number | null;
  forecast: number | null;
};

type BuildWindChartConfigParams = {
  data: WindChartDataPoint[];
  windowWidth?: number;
};

export function buildWindChartConfig({
  data,
  windowWidth,
}: BuildWindChartConfigParams): EChartsOption {
  let scale = 1;

  if (windowWidth) {
    const baseWidth = 800;
    scale = Math.min(2, Math.max(0.75, windowWidth / baseWidth));
  }

  const series: SeriesOption[] = [
    {
      name: "Actual",
      type: "line",
      encode: { x: "startTime", y: "actual" },
      showSymbol: false,
      connectNulls: false,
      smooth: false,
      color: "#2b7fff",
    },
    {
      name: "Forecast",
      type: "line",
      encode: { x: "startTime", y: "forecast" },
      showSymbol: false,
      connectNulls: false,
      smooth: false,
      color: "#fd9a00",
    },
  ];

  const tooltip: TooltipComponentOption = {
    trigger: "axis",
    confine: true,
    axisPointer: {
      type: "none",
    },
    textStyle: {
      fontSize: 10 * scale,
      color: "#fff",
    },
  backgroundColor: "#0f172a",
  borderColor: "rgba(255,255,255,0.1)",
  borderWidth: 1,
  formatter: (params) => {
    if (!Array.isArray(params) || params.length === 0) return "";
    console.log(params[0]);

    const rawDate = params[0].name as string;
    const formattedDate = formatDateTime(new Date(rawDate), true);

    const rows = params.map((item) => {

      let value =
        item.value && item.seriesName && typeof item.value === "object" && !Array.isArray(item.value)
          ? (item.value as Record<string, number | string | null>)[item?.seriesName.toLowerCase()]
          : item.data;

      if (value) value = value + " MW"
        

      return `
        <div style="
          display:flex;
          justify-content:space-between;
          gap:12px;
          margin-bottom:4px;
          width:8rem;
        ">
          <span>${item.marker} ${item.seriesName}</span>
          <span style="font-weight:600;">${value ?? "-"}</span>
        </div>
      `;
    });



    return `
      <div>
        <div style="margin-bottom:8px;font-weight:600;">
          ${formattedDate}
        </div>
        ${rows.join("")}
      </div>
    `;
  },
  };

  const legend = {
    top: 0,
    right: "right",
    orient: "horizontal" as const,
    itemWidth: 10 * scale,
    itemHeight: 10 * scale,
    itemGap: 12 * scale,
    textStyle: {
      fontSize: 11 * scale,
    },
    icon: "roundrect",
    data: ["Actual", "Forecast"],
  };

  const grid = {
    left: 50 * scale,
    right: 24 * scale,
    top: 48 * scale,
    bottom: 60 * scale,
  };

  const xAxis = [
    {
      type: "category" as const,
      boundaryGap: false,
      axisLabel: {
        fontSize: 10 * scale,
        formatter: (value: string) => formatDateTime(new Date(value)),
      },
    },
  ];

  const yAxis = [
    {
      name: "Wind Generated (MW)",
      type: "value" as const,
      position: "left" as const,
      scale: true,
      splitLine: {
        show: false
      },
      axisLabel: {
        fontSize: 10 * scale,
      },
      nameTextStyle: {
        fontSize: 11 * scale,
        color: "rgba(255, 255, 255, 0.5)"
      },
    },
  ];

  const dataZoom = [
    {
      type: "inside"
    }
  ]

  return {
    legend,
    tooltip,
    grid,
    xAxis,
    yAxis,
    series,
    dataZoom,
    dataset: {
      source: data,
    },
  };
}