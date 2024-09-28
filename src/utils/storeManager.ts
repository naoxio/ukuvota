import { Store as TauriStore } from '@tauri-apps/plugin-store';

class StoreManager {
  private store: TauriStore | Storage;
  private isTauri: boolean;

  constructor(filename: string) {
    this.isTauri = typeof window !== 'undefined' && 'window' in globalThis && '__TAURI__' in window;
    if (this.isTauri) {
      try {
        this.store = new TauriStore(filename);
      } catch (error) {
        console.warn('Failed to initialize Tauri Store, falling back to localStorage:', error);
        this.isTauri = false;
        this.store = localStorage;
      }
    } else {
      this.store = localStorage;
    }
  }

  async get(key: string): Promise<any> {
    try {
      if (this.isTauri) {
        return await (this.store as TauriStore).get(key);
      } else {
        const value = (this.store as Storage).getItem(key);
        return value ? JSON.parse(value) : null;
      }
    } catch (error) {
      console.warn(`Failed to get or parse value for key "${key}":`, error);
      return null;
    }
  }

  async set(key: string, value: any): Promise<void> {
    const stringValue = JSON.stringify(value);
    if (this.isTauri) {
      try {
        await (this.store as TauriStore).set(key, stringValue);
        await (this.store as TauriStore).save();
      } catch (error) {
        console.error(`Failed to set value for key "${key}" in Tauri Store:`, error);
      }
    } else {
      try {
        (this.store as Storage).setItem(key, stringValue);
      } catch (error) {
        console.error(`Failed to set value for key "${key}" in localStorage:`, error);
      }
    }
  }

  async save(): Promise<void> {
    if (this.isTauri) {
      try {
        await (this.store as TauriStore).save();
      } catch (error) {
        console.error('Failed to save Tauri Store:', error);
      }
    }
    // For localStorage, saving is done automatically in set()
  }

  async clear(): Promise<void> {
    if (this.isTauri) {
      try {
        await (this.store as TauriStore).clear();
        await (this.store as TauriStore).save();
      } catch (error) {
        console.error('Failed to clear Tauri Store:', error);
      }
    } else {
      (this.store as Storage).clear();
    }
  }
}

export default StoreManager;