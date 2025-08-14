import { DateTime } from "luxon";

type DateInput = {
  date?: Date;
  days: number;
  months: number;
  years: number;
};
export function generateExpireDate(data: DateInput) {
  const now = data.date ? DateTime.fromJSDate(data.date) : DateTime.local();

  const date = now
    .plus({ days: data.days, months: data.months, years: data.years })
    .toJSDate();

  return date;
}
