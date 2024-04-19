// src/utils/i18n.ts
import { promises as fs } from 'fs';
import path from 'path';

export class Translator {
  private translations: any = {};

  constructor(private locale: string) {}

  public async init(): Promise<void> {
    try {
      const fileContent = await fs.readFile(path.join(process.cwd(), 'src', 'locales', `${this.locale}.json`), 'utf-8');
      this.translations = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  public t(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations;

    for (const keyPart of keys) {
      value = value[keyPart];
      if (value === undefined) {
        return key; 
      }
    }

    return value as string;
  }
}
