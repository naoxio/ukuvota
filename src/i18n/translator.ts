import { $, useContext, useSignal, useVisibleTask$, useStore } from '@builder.io/qwik';
import enTranslations from './locales/en.json';
import deTranslations from './locales/de.json';
import itTranslations from './locales/it.json';
import { LocaleContext } from "./localeContext";

export const translationsMap: { [key: string]: any } = {
  en: enTranslations,
  de: deTranslations,
  it: itTranslations
};

const getTranslation = (translations: any, key: string, params?: Record<string, string | number>): string => {
  if (!translations) {
    console.warn(`Translations not found for the current locale`);
    return key;
  }
  const keys = key.split('.');
  let value: any = translations;
  for (const keyPart of keys) {
    value = value?.[keyPart];
    if (value === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }
  if (typeof value === 'string' && params) {
    return value.replace(/{(\w+)}/g, (match, key) => params[key]?.toString() || match);
  }
  return value as string;
};

export const useTranslator = () => {
  const localeContext = useContext(LocaleContext);
  const translationsSignal = useSignal(translationsMap[localeContext.locale] || translationsMap.en);
  const translatorStore = useStore({
    t: $((key: string, params?: Record<string, string | number>): string => 
      getTranslation(translationsSignal.value, key, params)),
    setLocale: $((newLocale: string) => {
      if (translationsMap[newLocale]) {
        // eslint-disable-next-line qwik/valid-lexical-scope
        localeContext.locale = newLocale;
      } else {
        console.warn(`Locale ${newLocale} not supported, falling back to English`);
        // eslint-disable-next-line qwik/valid-lexical-scope
        localeContext.locale = 'en';
      }
    })
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    // eslint-disable-next-line qwik/valid-lexical-scope
    const locale = track(() => localeContext.locale);
    translationsSignal.value = translationsMap[locale] || translationsMap.en;
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  });

  return {
    ...translatorStore,
    locale: localeContext.locale
  };
};