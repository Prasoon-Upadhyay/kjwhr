import { horizonSchema } from "../schema/horizon.schema";
import { useHorizon } from "../hooks/use-horizon";
import { useDebouncedCallback } from "use-debounce"
import { memo, useState } from "react";

function HorizonSlider() {
  const { horizon, setHorizon } = useHorizon();
  const [sliderVal, setSliderVal] = useState(horizon);


  const debouncedUpdate = useDebouncedCallback((val: number) => {
    const result = horizonSchema.safeParse({ horizon: val });
    if (!result.success) return;

    setHorizon(val);
  }, 400);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderVal(val); 
    debouncedUpdate(val);     
  };
  

  return (
    <div className="flex w-96 flex-col gap-2 border border-white/30 px-4 py-4 rounded-xl">
      <div className="flex relative justify-between text-xs gap-3 text-gray-400">
        <span>1H</span>
        <span className="absolute rounded -bottom-2/7 right-3/7 text-lg text-white z-10 bg-slate-900 px-4">{sliderVal}</span>
        <span className="absolute -top-6 left-0 text-xs text-white/30 z-10 bg-slate-900 px-2">Forecast Horizon</span>
        
        <input
            title="Horizon"
            type="range"
            min={1}
            max={48}
            step={1}
            value={sliderVal}
            onChange={handleChange}
            className="w-full cursor-pointer accent-blue-500"
        />
        <span>48H</span>
      </div>
    </div>
  );
}

export default memo(HorizonSlider);