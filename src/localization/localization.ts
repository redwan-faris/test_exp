import { Context } from "hono";
import { ar } from "./ar_IQ";
import { en } from "./en_US";

const messages = {
  ar,
  "en-US": en,
}
export function local(
  c: Context,
  key: keyof typeof en,
  params?: Record<string, unknown>
): string {
  const locale = c.get("locale") as string;  
  const translations = messages[locale] || messages["ar"];
  let message = translations[key] || key;  

  if (params) {
    Object.keys(params).forEach((param) => {
      message = message.replace(`{${param}}`, String(params[param]));
    });
  }

  return message;
}

export type LocalizationKeys = keyof typeof en;



