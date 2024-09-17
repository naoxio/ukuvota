import { $, useSignal, useTask$ } from '@builder.io/qwik';
import enTranslations from './locales/en.json';
import deTranslations from './locales/de.json';
import itTranslations from './locales/it.json';

export const translationsMap: { [key: string]: any } = { 
  en: enTranslations,
  de: deTranslations,
  it: itTranslations
};

const getTranslation = (translations: any, key: string): string => {
  const keys = key.split('.');
  let value: any = translations;

  for (const keyPart of keys) {
    value = value[keyPart];
    if (value === undefined) {
      return key;
    }
  }

  return value as string;
};

export const useTranslator = () => {
  const localeSignal = useSignal('en');
  const translationsSignal = useSignal(translationsMap['en']);

  useTask$(({ track }) => {
    const locale = track(() => localeSignal.value);
    translationsSignal.value = translationsMap[locale];

    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  });

  useTask$(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') || 'en';
      localeSignal.value = savedLocale;
      translationsSignal.value = translationsMap[savedLocale];
    }
  });

  return {
    t: $((key: string) => getTranslation(translationsSignal.value, key)),
    setLocale: $((newLocale: string) => {
      localeSignal.value = newLocale;
    }),
    locale: localeSignal
  };
};