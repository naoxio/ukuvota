// src/hooks/useProcessData.ts
import { useStore, useVisibleTask$, useTask$ } from '@builder.io/qwik';
import { Store } from '@tauri-apps/plugin-store';
import type { IProcess } from '../types';

export function useProcessData() {
  const processData = useStore<IProcess>({
    _id: '',
    title: '',
    description: '',
    descriptionId: '',
    proposalDates: [],
    votingDates: [],
    strategy: '',
    weighting: '',
    proposals: [],
    voters: [],
    timezone: undefined,
    phase: undefined,
  });
  // eslint-disable-next-line
  useVisibleTask$(async () => {
    const store = new Store('.processData.bin');
    await store.load();
    const keys: (keyof IProcess)[] = [
      '_id', 'title', 'description', 'descriptionId', 'proposalDates',
      'votingDates', 'strategy', 'weighting',
      'proposals', 'voters', 'timezone', 'phase'
    ];
    for (const key of keys) {
      const value = await store.get(key);
      if (value !== null) {
        (processData as any)[key] = value;
      }
    }
  });
  // eslint-disable-next-line
  useVisibleTask$(async ({ track }) => {
    // Track all properties of processData
    track(() => ({ ...processData }));

    const store = new Store('.processData.bin');
    await store.load();

    // Save all properties to the store
    for (const [key, value] of Object.entries(processData)) {
      await store.set(key, value);
    }
    await store.save();
  });

  return processData;
}