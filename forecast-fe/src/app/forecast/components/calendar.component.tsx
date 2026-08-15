import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useDateTime } from "../hooks/use-datetime";
import { TODAY } from "../../../common/constants";

export default function DayCalendar() {
  const { selectedRange, setSelectedRange } = useDateTime();
  return (
        <DayPicker
          mode="range"
          animate
          selected={selectedRange}
          onSelect={setSelectedRange}
          fixedWeeks
          navLayout="after"
          disabled={{ after: TODAY }}
          endMonth={TODAY}
          className="rdp-custom"
          classNames={{
            range_start: "bg-amber-500 rounded-md",
            range_end: "bg-amber-500 rounded-md",
            range_middle: "bg-amber-500/20 text-xs",
            selected: "text-xs text-white",
            day: "text-xs",
            today: "text-amber-500",
            weekday: "uppercase text-xs h-10 text-white/50",
          }}
        />
  );
}