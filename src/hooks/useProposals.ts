// src/hooks/useProposals.ts
import { useStore, useTask$, $ } from '@builder.io/qwik';
import { Store } from '@tauri-apps/plugin-store';
import { v4 as uuidv4 } from 'uuid';
import type { IProposal } from '~/types/IProposal';

export function useProposals(processId: string) {
  const proposalsStore = useStore<{
    proposals: IProposal[];
  }>({
    proposals: [],
  });

  useTask$(async () => {
    const store = new Store(`.proposals_${processId}.dat`);
    await store.load();

    const existingProposals = await store.get('proposals') as IProposal[] | null;
    if (existingProposals) {
      proposalsStore.proposals = existingProposals;
    }
  });

  useTask$(async ({ track }) => {
    track(() => proposalsStore.proposals);
    
    const store = new Store(`.proposals_${processId}.dat`);
    await store.set('proposals', proposalsStore.proposals);
    await store.save();
  });

  const addProposal = $((title: string = '', description: string = '') => {
    const newProposal: IProposal = {
      id: uuidv4(),
      title,
      description,
      createdAt: Date.now(),
    };
    proposalsStore.proposals = [...proposalsStore.proposals, newProposal];
  });

  const removeProposal = $((id: string) => {
    proposalsStore.proposals = proposalsStore.proposals.filter(p => p.id !== id);
  });

  const updateProposal = $((id: string, title: string, description: string) => {
    proposalsStore.proposals = proposalsStore.proposals.map(p => 
      p.id === id ? { ...p, title, description } : p
    );
  });

  return {
    proposalsStore,
    addProposal,
    removeProposal,
    updateProposal,
  };
}
