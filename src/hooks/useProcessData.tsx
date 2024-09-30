// src/hooks/useProcessData.ts
import { useStore, useVisibleTask$, $ } from '@builder.io/qwik';
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
    weighting: '1',
    proposals: [],
    voters: [],
    timezone: DateTime.local().zoneName || 'UTC',
    mode: undefined,
    step: 1
  });

  const loadProcessData = $(async () => {
    const store = new StoreManager('.processData.bin');
    const keys: (keyof IProcess)[] = [
      '_id', 'title', 'description', 'descriptionId', 'proposalDates',
      'votingDates', 'strategy', 'weighting', 'proposals', 'voters',
      'timezone', 'mode', 'step'
    ];

    for (const key of keys) {
      try {
        const value = await store.get(key);
        if (value !== null) {
          if (key === 'mode') {
            processData[key] = value === 'undefined' ? undefined : value;
          } else if (key === 'step') {
            processData[key] = Number(value) || 1;
          } else if (['proposalDates', 'votingDates'].includes(key)) {
            processData[key] = value ? value : [0, 0];
          } else {
            processData[key] = value;
          }
        }
      } catch (error) {
        console.error(`Error loading ${key}:`, error);
      }
    }

    // Ensure default values
    if (!processData.weighting) {
      processData.weighting = '1';
      await store.set('weighting', '1');
    }
    if (!processData.timezone) {
      processData.timezone = DateTime.local().zoneName || 'UTC';
      await store.set('timezone', processData.timezone);
    }

    console.log(processData)

    await store.save();
  });

  const saveProcessData = $(async () => {
    const store = new StoreManager('.processData.bin');
    for (const [key, value] of Object.entries(processData)) {
      try {
        if (key === 'mode') {
          await store.set(key, value === undefined ? 'undefined' : value);
        } else if (key === 'step') {
          await store.set(key, Number(value));
        } else {
          await store.set(key, value);
        }
      } catch (error) {
        console.error(`Error saving ${key}:`, error);
      }
    }
    await store.save();
  });

  const clearProcessData = $(async () => {
    const store = new StoreManager('.processData.bin');
    await store.clear();
    await store.save();

    // Reset all fields to their default values
    Object.assign(processData, {
      _id: '',
      title: '',
      description: '',
      descriptionId: '',
      proposalDates: [0, 0],
      votingDates: [0, 0],
      strategy: '',
      weighting: '1',
      proposals: [],
      voters: [],
      timezone: DateTime.local().zoneName || 'UTC',
      mode: undefined,
      step: 1
    });
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    await loadProcessData();
    track(() => ({ ...processData }));
    await saveProcessData();
  });

  return { processData, clearProcessData, loadProcessData, saveProcessData };
}
