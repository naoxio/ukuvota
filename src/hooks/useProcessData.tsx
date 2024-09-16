// src/hooks/useProcessData.ts
import { useStore, useVisibleTask$ } from '@builder.io/qwik';
import { Store } from '@tauri-apps/plugin-store';
import type { IProcess } from '../types';

export function useProcessData() {
  const processData = useStore<IProcess>({
    _id: '',
    title: '',
    description: '',
    proposalDates: [],
    votingDates: [],
    strategy: '',
    weighting: '',
    proposals: [],
    timezone: undefined,
  });

  useVisibleTask$(async () => {
    const store = new Store('.processData.dat');
    await store.load();

    const keys: (keyof IProcess)[] = ['_id', 'title', 'description', 'proposalDates', 
                                      'votingDates', 'strategy', 'weighting', 
                                      'proposals', 'voters', 'timezone'];

    for (const key of keys) {
      const value = await store.get(key);
      if (value !== null) {
        (processData as any)[key] = value;
      }
    }
  });

  useVisibleTask$(async ({ track }) => {
    track(() => processData);
    
    const store = new Store('.processData.dat');
    await store.load();

    for (const [key, value] of Object.entries(processData)) {
      await store.set(key, value);
    }

    await store.save();
  });

  return processData;
}