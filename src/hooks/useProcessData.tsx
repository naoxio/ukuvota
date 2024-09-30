// src/hooks/useProcessData.ts
import { useStore, useVisibleTask$ } from '@builder.io/qwik';
import { DateTime } from 'luxon';
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
    weighting: 'x1', // Default to 'x1'
    proposals: [],
    voters: [],
    timezone: DateTime.local().zoneName || 'UTC', // Set default timezone
    mode: undefined,
  });

  useVisibleTask$(async ({ track }) => {
    const store = new StoreManager('.processData.bin');
    const keys: (keyof IProcess)[] = [
      '_id', 'title', 'description', 'descriptionId', 'proposalDates',
      'votingDates', 'strategy', 'weighting', 'proposals', 'voters',
      'timezone', 'mode'
    ];

    // Load initial data
    for (const key of keys) {
      try {
        const value = await store.get(key);
        if (value !== null) {
          if (key === 'mode') {
            (processData as any)[key] = value === 'undefined' ? undefined : value;
          } else if (['proposalDates', 'votingDates'].includes(key)) {
            (processData as any)[key] = value ? value : [0, 0];
          } else {
            (processData as any)[key] = value;
          }
        }
      } catch (error) {
        console.error(`Error loading ${key}:`, error);
      }
    }

    // Ensure default values
    if (!processData.weighting) {
      processData.weighting = 'x1';
      await store.set('weighting', 'x1');
    }
    if (!processData.timezone) {
      processData.timezone = DateTime.local().zoneName || 'UTC';
      await store.set('timezone', processData.timezone);
    }

    // Track changes and save
    track(() => ({ ...processData }));
    for (const [key, value] of Object.entries(processData)) {
      try {
        if (key === 'mode') {
          await store.set(key, value === undefined ? 'undefined' : value);
        } else {
          await store.set(key, value);
        }
      } catch (error) {
        console.error(`Error saving ${key}:`, error);
      }
    }
    
    await store.save();
  });

  return processData;
}