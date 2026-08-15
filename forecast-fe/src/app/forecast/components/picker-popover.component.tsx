import { memo, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import DatePicker from "./date-picker.component";
import { useDateTime } from "../hooks/use-datetime";
import { IoIosArrowRoundForward } from "react-icons/io";
import TimePicker from "./time-picker.component";
import { FaCalendar } from "react-icons/fa";
import { formatDateTime } from "../../../common/formatters/date-formatters";

const PickerPopover = () => {
  const [open, setOpen] = useState(false);
  const { selectedRange } = useDateTime();

  const from = selectedRange?.from
    ? formatDateTime(selectedRange.from)
    : "YYYY / MM / DD";

  const to = selectedRange?.to
    ? formatDateTime(selectedRange.to)
    : "YYYY / MM / DD";

  return (
    <Popup
      open={open}
      onClose={() => setOpen(false)}
      closeOnDocumentClick
      arrow={false}
      position="bottom left"
      trigger={
        
        <div className="flex w-sm md:w-lg items-center justify-between rounded-xl border border-white/20 bg-slate-900 px-4 py-3 text-left text-white transition">
          <div className="flex w-full flex-col">
            <span className="flex w-full flex-row justify-between text-xs font-medium gap-3">
              <div className="flex flex-row relative items-center md:gap-2">
                <FaCalendar className={`text-white/50 cursor-pointer  hidden md:block`} size={10} />
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className={`transition duration-200 cursor-pointer ${
                    selectedRange?.from
                      ? "hover:text-white/80"
                      : "text-white/30 hover:text-white md:text-xs text-[0.6rem]"
                  }`}
                >
                  {from}
                </button>
                <span className="absolute -top-5 text-xs text-white/30 z-10 bg-slate-900 px-2">From</span>

                <div onClick={(e) => e.stopPropagation()}>
                  <TimePicker index="from" />
                </div>
              </div>

              <IoIosArrowRoundForward size={20} />

              <div className="flex flex-row relative items-center md:gap-2">
                <FaCalendar className={`text-white/50 cursor-pointer hidden md:block`} size={10} />
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className={`transition duration-200 cursor-pointer ${
                    selectedRange?.to
                      ? "hover:text-white/80"
                      : "text-white/30 hover:text-white md:text-xs text-[0.6rem]"
                  }`}
                >
                  {to}
                <span className="absolute -bottom-5 right-0 text-xs text-white/30 z-10 bg-slate-900 px-2">To</span>
                </button>

                <div onClick={(e) => e.stopPropagation()}>
                  <TimePicker index="to" />
                </div>
              </div>
            </span>
          </div>
        </div>
      }
      contentStyle={{
        background: "transparent",
        border: "none",
        padding: 0,
        boxShadow: "none",
      }}
      overlayStyle={{
        background: "transparent",
      }}
    >
      <div className="w-sm md:w-md items-center flex justify-center rounded-2xl border border-white/10 bg-slate-950 p-4 shadow-2xl">
        <DatePicker />
      </div>
    </Popup>
  );
};

export default memo(PickerPopover);