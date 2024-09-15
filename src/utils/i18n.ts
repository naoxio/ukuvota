import { $, useContext, createContextId } from '@builder.io/qwik';
import enTranslations from '../locales/en.json';
import deTranslations from '../locales/de.json';
import itTranslations from '../locales/it.json';

export const TranslatorContext = createContextId<{ locale: string; translator: Translator | null }>('TranslatorContext');

const translationsMap: { [key: string]: any } = { 
  en: enTranslations,
  de: deTranslations,
  it: itTranslations
};

export class Translator {
  private translations: any;

  constructor(private locale: string) {
    this.setTranslations(locale);
  }

  private setTranslations(locale: string): void {
    this.translations = translationsMap[locale] || translationsMap.en;
  }

  public t(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations;

    for (const keyPart of keys) {
      value = value[keyPart];
      if (value === undefined) {
        return key;  // Fallback to the key if translation is missing
      }
    }

    return value as string;
  }
}

export const useTranslator = () => {
  const context = useContext(TranslatorContext);
  return {
    t: $((key: string) => context.translator?.t(key) || key)
  };
};