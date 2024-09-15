import { $, useContext, createContextId } from '@builder.io/qwik';
import enTranslations from '../locales/en.json';
import deTranslations from '../locales/de.json';
import itTranslations from '../locales/it.json';

// Context to store locale and translations
export const TranslatorContext = createContextId<{ locale: string; translations: any }>('TranslatorContext');

// Map of translations for each locale
export const translationsMap: { [key: string]: any } = { 
  en: enTranslations,
  de: deTranslations,
  it: itTranslations
};

// Simplified function for translation lookup
const getTranslation = (translations: any, key: string): string => {
  const keys = key.split('.');
  let value: any = translations;

  for (const keyPart of keys) {
    value = value[keyPart];
    if (value === undefined) {
      return key;  // Fallback to the key if translation is missing
    }
  }

  return value as string;
};

// Hook to use translator with locale and translations from context
export const useTranslator = () => {
  const context = useContext(TranslatorContext);

  return {
    t: $((key: string) => getTranslation(context.translations, key))
  };
};

// Example of setting the context somewhere in your app (e.g., at the root component)
export const setTranslatorContext = (locale: string) => {
  const translations = translationsMap[locale] || translationsMap.en;
  
  return {
    locale,
    translations
  };
};
