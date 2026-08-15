import type EChartsReact from 'echarts-for-react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useMemo, useRef } from 'react';
import { CHART_THEME } from './chart.constants';
import { ImSpinner6 } from "react-icons/im";
import { FaDatabase } from "react-icons/fa6";
import { BiError } from "react-icons/bi";

interface ChartOptions {
  config: EChartsOption;
}

const Chart = ({ config }: ChartOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsReact | null>(null);
  const chartKey = useMemo(() => Date.now(), [config]);

  return (
    <div ref={containerRef} className="h-full w-full ">
      <ReactECharts
        ref={chartRef}
        key={chartKey}
        className="h-full w-full"
        option={config}
        theme={CHART_THEME}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

const ChartLoading = () => {

  return (
    <div className='w-full h-full'>
      <div className='w-full h-full flex justify-center items-center gap-2'>
        <ImSpinner6 className='animate-spin' size={20} /> Fetching, Please Wait
      </div>

    </div>
  )
}


const EmptyChart = () => {

  return (
    <div className='w-full h-full'>
      <div className='w-full text-white/40 h-full flex justify-center items-center gap-2'>
        <FaDatabase className='' size={20} /> Please select valid dates to compare data
      </div>

    </div>
  )
}

const ChartError = () => {

  return (
    <div className='w-full h-full'>
      <div className='w-full h-full text-red-400/50 flex justify-center items-center gap-2'>
        <BiError className='' size={20} /> Something went wrong
      </div>

    </div>
  )
}

Chart.Loading = ChartLoading;
Chart.Empty = EmptyChart;
Chart.Error = ChartError;


export default Chart;
