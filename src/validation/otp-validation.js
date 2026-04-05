import { z } from "zod";

export const otpSchema = z.object({
  otp1: z.string().regex(/^\d$/, "Must be a number"),
  otp2: z.string().regex(/^\d$/, "Must be a number"),
  otp3: z.string().regex(/^\d$/, "Must be a number"),
  otp4: z.string().regex(/^\d$/, "Must be a number"),
  otp5: z.string().regex(/^\d$/, "Must be a number"),
  otp6: z.string().regex(/^\d$/, "Must be a number"),
});
