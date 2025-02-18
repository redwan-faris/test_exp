import { z } from "zod";

export const ProvincesEnum = z.enum([
  "Unknown",
  "Baghdad",
  "Ninawa",
  "Basrah",
  "Salahddin",
  "Duhok",
  "Erbil",
  "Sulimania",
  "Dyala",
  "Wassit",
  "Missan",
  "Thiqar",
  "Muthana",
  "Babil",
  "Karbala",
  "Najaf",
  "Alqadisiyyah",
  "Anbar",
  "Karkuk",
  "Halabja",
  "Diqar",
]);

export type Provinces = z.infer<typeof ProvincesEnum>;
