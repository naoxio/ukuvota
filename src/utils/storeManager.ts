import { Store } from '@tauri-apps/plugin-store';

class StoreManager {
  private stores: { [key: string]: Store } = {};

  getStore(name: string): Store {
    if (!this.stores[name]) {
      this.stores[name] = new Store(`${name}.bin`);
    }
    return this.stores[name];
  }

  async setItem(storeName: string, key: string, value: any): Promise<void> {
    const store = this.getStore(storeName);
    await store.set(key, value);
    await store.save();
  }

  async getItem(storeName: string, key: string): Promise<any> {
    const store = this.getStore(storeName);
    return await store.get(key);
  }

  async removeItem(storeName: string, key: string): Promise<void> {
    const store = this.getStore(storeName);
    await store.delete(key);
    await store.save();
  }

  async clearStore(storeName: string): Promise<void> {
    const store = this.getStore(storeName);
    await store.clear();
    await store.save();
  }

  async loadStore(storeName: string): Promise<void> {
    const store = this.getStore(storeName);
    await store.load();
  }

  async onStoreChange(storeName: string, callback: (key: string, value: any) => void): Promise<() => void> {
    const store = this.getStore(storeName);
    return await store.onChange(callback);
  }
}

export const storeManager = new StoreManager();