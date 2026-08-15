import { useMemo, useState } from "react";
import { useDateTime } from "../hooks/use-datetime";
import { dateTimeSchema } from "../schema/datetime.schema";

type TimePickerProps = {
  index: "from" | "to";
};

export default function TimePicker({ index }: TimePickerProps) {
  const { selectedRange, setSelectedRange } = useDateTime();
  const [editing, setEditing] = useState<"hours" | "minutes" | null>(null);

  const currentDate = selectedRange?.[index];

  const hours = useMemo(
    () =>
      currentDate
        ? currentDate.getHours().toString().padStart(2, "0")
        : "HH",
    [currentDate]
  );

  const minutes = useMemo(
    () =>
      currentDate
        ? currentDate.getMinutes().toString().padStart(2, "0")
        : "MM",
    [currentDate]
  );

  const updateTimePart = (type: "hours" | "minutes", value: string) => {
    if (!selectedRange || !currentDate) return;

    const updatedDate = new Date(currentDate);

    if (type === "hours") {
      updatedDate.setHours(Number(value));
    } else {
      updatedDate.setMinutes(Number(value));
    }

    setSelectedRange({
      ...selectedRange,
      [index]: updatedDate,
    });
  };

  const handleHourChange = (rawValue: string) => {
    if (!currentDate) return;

    const sanitized = rawValue.replace(/\D/g, "").slice(0, 2);

    if (sanitized === "") return;

    const parsed = dateTimeSchema.safeParse({
      hour: sanitized,
      minute: String(currentDate.getMinutes()),
    });

    if (parsed.success) {
      updateTimePart("hours", sanitized);
    }
  };

  const handleMinuteChange = (rawValue: string) => {
    if (!currentDate) return;

    const sanitized = rawValue.replace(/\D/g, "").slice(0, 2);

    if (sanitized === "") return;

    const parsed = dateTimeSchema.safeParse({
      hour: String(currentDate.getHours()),
      minute: sanitized,
    });

    if (parsed.success) {
      updateTimePart("minutes", sanitized);
    }
  };

  const commonInputClasses =
    "w-8 bg-transparent text-center outline-none text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="w-fit bg-slate-900 flex flex-row text-white">
      <div className="min-w-8 text-center">
        {editing === "hours" ? (
          <input
            title="Hours"
            autoFocus
            type="text"
            inputMode="numeric"
            maxLength={2}
            defaultValue={hours === "--" ? "" : hours}
            className={commonInputClasses}
            onChange={(e) => handleHourChange(e.target.value)}
            onBlur={() => setEditing(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                setEditing(null);
              }
            }}
          />
        ) : (
          <button
            type="button"
            className={`cursor-pointer disabled:cursor-not-allowed  duration-200 transition ${currentDate ? 'hover:text-white/80' :'text-white/30 hover:text-white'}`}
            onClick={() => setEditing("hours")}
            disabled={!currentDate}
          >
            {hours}
          </button>
        )}
      </div>

      <div className=" text-white/60">:</div>

      <div className=" min-w-8 text-center">
        {editing === "minutes" ? (
          <input
            title="Minutes"
            autoFocus
            type="text"
            inputMode="numeric"
            maxLength={2}
            defaultValue={minutes === "--" ? "" : minutes}
            className={commonInputClasses}
            onChange={(e) => handleMinuteChange(e.target.value)}
            onBlur={() => setEditing(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                setEditing(null);
              }
            }}
          />
        ) : (
          <button
            type="button"
            className={`cursor-pointer disabled:cursor-not-allowed  duration-200 transition ${currentDate ? 'hover:text-white/80' :'text-white/30 hover:text-white'}`}
            onClick={() => setEditing("minutes")}
            disabled={!currentDate}
          >
            {minutes}
          </button>
        )}
      </div>
    </div>
  );
}