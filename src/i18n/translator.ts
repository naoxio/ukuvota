import { $, useContext, useSignal, useStore, useVisibleTask$} from '@builder.io/qwik';
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
  const state = useStore({
    translationsSignal: useSignal(translationsMap[localeContext.locale] || translationsMap.en),
    get locale() {
      return localeContext.locale;
    },
    set locale(value: string) {
      localeContext.locale = value;
    }
  });
  // eslint-disable-next-line
  useVisibleTask$(({ track }) => {
    const locale = track(() => state.locale);
    state.translationsSignal.value = translationsMap[locale] || translationsMap.en;
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  });

  const setLocale = $((newLocale: string) => {
    if (translationsMap[newLocale]) {
      state.locale = newLocale;
    } else {
      console.warn(`Locale ${newLocale} not supported, falling back to English`);
      state.locale = 'en';
    }
  });

  return {
    t: $((key: string): string => getTranslation(state.translationsSignal.value, key)),
    setLocale,
    get locale() {
      return state.locale;
    }
  };
};