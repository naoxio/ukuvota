import { $, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import enTranslations from './locales/en.json';
import deTranslations from './locales/de.json';
import itTranslations from './locales/it.json';
import { LocaleContext } from "./localeContext";

export const translationsMap: { [key: string]: any } = { 
  en: enTranslations,
  de: deTranslations,
  it: itTranslations
};

const getTranslation = (translations: any, key: string): string => {
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

  return value as string;
};

export const useTranslator = () => {
  const localeContext = useContext(LocaleContext);
  const translationsSignal = useSignal(translationsMap[localeContext.locale.value] || translationsMap.en);

  useTask$(({ track }) => {
    const locale = track(() => localeContext.locale);
    translationsSignal.value = translationsMap[locale] || translationsMap.en;
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  });

  return {
    t: $((key: string) => getTranslation(translationsSignal.value, key)),
    setLocale: $((newLocale: string) => {
      if (translationsMap[newLocale]) {
        localeContext.setLocale(newLocale);
      } else {
        console.warn(`Locale ${newLocale} not supported, falling back to English`);
        localeContext.setLocale('en');
      }
    }),
    locale: localeContext.locale
  };
};