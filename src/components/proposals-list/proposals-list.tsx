import type { PropFunction, QRL } from '@builder.io/qwik';
import { component$, useStore, $, useTask$ } from '@builder.io/qwik';
import { v4 as uuidv4 } from 'uuid';
import { useTranslator } from '~/i18n/translator';
import StoreManager from '~/utils/storeManager';
import { exampleProposals } from '~/utils/exampleProposals';
import './proposals-list.css';

interface IProposal {
  id: string;
  title: string;
  description: string;
}

interface ProposalsProps {
  processId?: string;
  isSetup?: boolean;
  onAdd$?: PropFunction<(title?: string, description?: string) => void> | QRL<(title?: string, description?: string) => void>;
  onRemove$?: PropFunction<(id: string) => void> | QRL<(id: string) => void>;
}

export default component$((props: ProposalsProps) => {
  const { t } = useTranslator();
  const store = useStore<{
    proposals: IProposal[];
    dropdownOptions: { title: string; description: string }[];
  }>({
    proposals: [],
    dropdownOptions: [],
  });

  useTask$(async () => {
    const localStore = new StoreManager(`proposals_${props.processId || 'default'}.bin`);
    const existingProposals = await localStore.get('proposals') as IProposal[] | null;
    if (existingProposals) {
      store.proposals = existingProposals;
    }
    store.dropdownOptions = exampleProposals(t);
  });

  const saveProposals = $(async () => {
    const localStore = new StoreManager(`proposals_${props.processId || 'default'}.bin`);
    await localStore.set('proposals', store.proposals);
    await localStore.save();
  });

  const addProposal = $(async (title: string = '', description: string = '') => {
    const newProposal: IProposal = {
      id: uuidv4(),
      title,
      description,
    };
    store.proposals = [...store.proposals, newProposal];
    await saveProposals();
    props.onAdd$?.(title, description);
  });

  const removeProposal = $(async (id: string) => {
    store.proposals = store.proposals.filter(p => p.id !== id);
    await saveProposals();
    props.onRemove$?.(id);
  });

  return (
    <div class="proposals-list">
      <div id="proposals-container" data-is-setup={(props.isSetup || false).toString()} data-process={props.processId}>
        {store.proposals.map((proposal) => (
          <div key={proposal.id} class="proposal">
            <h3>{proposal.title}</h3>
            <p>{proposal.description}</p>
            {props.isSetup && (
              <button class="delete-button" onClick$={() => removeProposal(proposal.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
      {store.proposals.length === 0 && (
        <p id="no-proposals-text">{t('noProposalsFound')}</p>
      )}
      <div class="proposal-actions">
        <button class="add-button" onClick$={() => addProposal()}>
          {t('addProposal')}
        </button>
        <div class="dropdown">
          <button class="dropdown-button">{t('addProposalTemplate')}</button>
          <div class="dropdown-content">
            {store.dropdownOptions.map((option, index) => (
              <a 
                key={index} 
                class="dropdown-item" 
                href="#" 
                onClick$={(e) => {
                  e.preventDefault();
                  addProposal(option.title, option.description);
                }}
              >
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});