import Chart from "./components/chart/chart.components";
import { buildWindChartConfig } from "./components/chart/chart.utils";
import PickerPopover from "./components/picker-popover.component";
import HorizonSlider from "./components/slider.component";
import { useWindData } from "./hooks/wind-data";

export default function ForecastScreen() {

  const { data, isFetching, isError } = useWindData();

  return (
      <div className="flex flex-col h-full w-full bg-slate-900 justify-center items-center p-4">
        <h1 className="text-6xl tracking-tighter mb-6">Forecast.ly</h1>
        <div className="w-full h-36 flex md:flex-row flex-col gap-8 justify-center items-center">
          <div className="flex flex-col gap-2 shadow-2xl items-center justify-between">
            <PickerPopover /> 
          </div>
          <div>
            <div className="flex shadow-2xl flex-col gap-2 items-center justify-between text-xs">          
              <HorizonSlider />
            </div>
          </div>
        </div>
        <div className="md:w-3xl w-sm p-4 h-full rounded-md border border-white/20 shadow-2xl">
          {isFetching ? <Chart.Loading /> : data && data.result.length > 0 ? <Chart config={buildWindChartConfig({data: data.result})} /> : isError ? <Chart.Error /> : <Chart.Empty />}
        </div>
      </div>
      
  );
}