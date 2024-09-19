import { Store as TauriStore } from '@tauri-apps/plugin-store';

class StoreManager {
  private store: TauriStore | Storage;
  private isTauri: boolean;

  constructor(filename: string) {
    this.isTauri = 'window' in globalThis && '__TAURI__' in window;
    this.store = this.isTauri ? new TauriStore(filename) : localStorage;
  }

  async get(key: string): Promise<any> {
    if (this.isTauri) {
      return await (this.store as TauriStore).get(key);
    } else {
      const value = (this.store as Storage).getItem(key);
      if (value === null) {
        return null;
      }
      try {
        return JSON.parse(value);
      } catch (error) {
        console.warn(`Failed to parse JSON for key "${key}":`, error);
        return value; // Return the raw string if it's not valid JSON
      }
    }
  }

  async set(key: string, value: any): Promise<void> {
    if (this.isTauri) {
      await (this.store as TauriStore).set(key, value);
      await (this.store as TauriStore).save();
    } else {
      (this.store as Storage).setItem(key, JSON.stringify(value));
    }
  }

  async save(): Promise<void> {
    if (this.isTauri) {
      await (this.store as TauriStore).save();
    }
    // For localStorage, saving is done automatically in set()
  }
}

export default StoreManager;