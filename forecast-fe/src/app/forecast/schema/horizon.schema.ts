import { z } from "zod";

export const horizonSchema = z.object({
  horizon: z
    .number()
    .min(1, "Minimum is 1 hour")
    .max(48, "Maximum is 48 hours"),
});