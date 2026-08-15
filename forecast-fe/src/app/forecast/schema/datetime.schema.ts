import z from "zod";

export const dateTimeSchema = z.object({
  hour: z
    .string()
    .min(1, "Hour is required")
    .regex(/^\d{1,2}$/, "Hour must be numeric")
    .refine((val) => Number(val) >= 0 && Number(val) <= 23, {
      message: "Hour must be between 00 and 23",
    }),
  minute: z
    .string()
    .min(1, "Minute is required")
    .regex(/^\d{1,2}$/, "Minute must be numeric")
    .refine((val) => Number(val) >= 0 && Number(val) <= 59, {
      message: "Minute must be between 00 and 59",
    }),
});