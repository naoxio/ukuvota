// src/utils/i18n.ts
import enTranslations from '../locales/en.json';
import deTranslations from '../locales/de.json';
import itTranslations from '../locales/it.json';

export class Translator {
  private translations: any;

  constructor(private locale: string) {
    this.setTranslations();
  }

  private setTranslations(): void {
    const translationsMap: { [key: string]: any } = { 
      en: enTranslations,
      de: deTranslations,
      it: itTranslations
    };

    this.translations = translationsMap[this.locale] || translationsMap.en;
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
