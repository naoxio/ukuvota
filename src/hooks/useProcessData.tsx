// src/hooks/useProcessData.ts
import { useStore, useVisibleTask$ } from '@builder.io/qwik';
import StoreManager from '../utils/storeManager';
import type { IProcess } from '../types/IProcess';

export function useProcessData() {
  const processData = useStore<IProcess>({
    _id: '',
    title: '',
    description: '',
    descriptionId: '',
    proposalDates: [0, 0],
    votingDates: [0, 0],
    strategy: '',
    weighting: '',
    proposals: [],
    voters: [],
    timezone: undefined,
    phase: undefined,
    step: '1',
  });

  // eslint-disable-next-line
  useVisibleTask$(async () => {
    const store = new StoreManager('.processData.bin');
    const keys: (keyof IProcess)[] = [
      '_id', 'title', 'description', 'descriptionId', 'proposalDates',
      'votingDates', 'strategy', 'weighting', 'proposals', 'voters', 
      'timezone', 'phase', 'step'
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
    const store = new StoreManager('.processData.bin');
    // Save all properties to the store
    for (const [key, value] of Object.entries(processData)) {
      await store.set(key, value);
    }
  });

  return processData;
}