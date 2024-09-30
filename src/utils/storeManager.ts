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
        console.warn('Failed to initialize Tauri Store:', error);
        throw error; // Rethrow the error as Tauri Store is required for non-web builds
      }
    } else {
      this.store = localStorage;
    }
  }

  async get(key: string): Promise<any> {
    try {
      let value: string | null;
      if (this.isTauri) {
        value = await (this.store as TauriStore).get(key);
      } else {
        value = (this.store as Storage).getItem(key);
      }
  
      if (value === null || value === 'undefined') {
        return null;
      }
  
      // Check if the value starts with '{' or '[' to determine if it's likely JSON
      if (value.startsWith('{') || value.startsWith('[')) {
        try {
          return JSON.parse(value);
        } catch (parseError) {
          console.warn(`Failed to parse JSON for key "${key}":`, parseError);
        }
      }
  
      // If not JSON or parsing failed, return the original value
      return value;
    } catch (error) {
      console.warn(`Failed to get value for key "${key}":`, error);
      return null;
    }
  }
  
  async set(key: string, value: any): Promise<void> {
    let stringValue: string;
    
    if (value === undefined) {
      stringValue = 'undefined';
    } else if (typeof value === 'object') {
      stringValue = JSON.stringify(value);
    } else {
      stringValue = String(value);
    }
  
    if (this.isTauri) {
      try {
        await (this.store as TauriStore).set(key, stringValue);
        await (this.store as TauriStore).save();
      } catch (error) {
        console.error(`Failed to set value for key "${key}" in Tauri Store:`, error);
        throw error;
      }
    } else {
      try {
        (this.store as Storage).setItem(key, stringValue);
      } catch (error) {
        console.error(`Failed to set value for key "${key}" in localStorage:`, error);
        throw error;
      }
    }
  }
  
  async save(): Promise<void> {
    if (this.isTauri) {
      try {
        await (this.store as TauriStore).save();
      } catch (error) {
        console.error('Failed to save Tauri Store:', error);
        throw error; // Rethrow the error as it's critical for Tauri builds
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
        throw error; // Rethrow the error as it's critical for Tauri builds
      }
    } else {
      (this.store as Storage).clear();
    }
  }
}

export default StoreManager;