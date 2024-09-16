import { Store } from '@tauri-apps/plugin-store';

const store = new Store('.settings.dat');

export async function setItem(key: string, value: string): Promise<void> {
  await store.set(key, value);
  await store.save();
}

export async function getItem(key: string): Promise<string | null> {
  return await store.get(key) as string | null;
}

export async function removeItem(key: string): Promise<void> {
  await store.delete(key);
  await store.save();
}

export async function clear(): Promise<void> {
  await store.clear();
  await store.save();
}

// Optional: Load the store when your app starts
export async function loadStore(): Promise<void> {
  await store.load();
}

// Optional: Listen to changes
export async function onStoreChange(callback: (key: string, value: any) => void): Promise<() => void> {
  return await store.onChange(callback);
}