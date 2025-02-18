import {
  defineI18nMiddleware,
  detectLocaleFromAcceptLanguageHeader,
  useTranslation,
} from "@intlify/hono";
import { Context } from "hono";
import { en } from "./en_US";

export const i18nMiddleware = defineI18nMiddleware({
  // detect locale with `accept-language` header
  locale: detectLocaleFromAcceptLanguageHeader,
  fallbackLocale: "en",
  messages: {
    en,
  },
});
export type LocalizationKeys = keyof typeof en;
export type TranslationKeys = typeof en;

export function local(
  c: Context,
  key: LocalizationKeys,
  params?: Record<string, unknown>
) {
  const t = useTranslation(c);
  return t(key.toString(), params ? params! : {});
}
