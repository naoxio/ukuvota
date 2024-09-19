import { component$, useStore, $, useTask$, useTask$ } from '@builder.io/qwik';
import { v4 as uuidv4 } from 'uuid';
import { useTranslator } from '~/i18n/translator';
import { Store } from '@tauri-apps/plugin-store';
import { exampleProposals } from '~/utils/exampleProposals';

interface IProposal {
  id: string;
  title: string;
  description: string;
}

interface ProposalsProps {
  processId?: string;
  isSetup?: boolean;
}

// Custom hook for managing proposals
function useProposals(processId?: string) {
  const store = useStore<{
    proposals: IProposal[];
    dropdownOptions: { title: string; description: string }[];
  }>({
    proposals: [],
    dropdownOptions: [],
  });
  const { t } =useTranslator();


  useTask$(async () => {
    const localStore = new Store('.proposals.bin');
    await localStore.load();

    // Load existing proposals
    const existingProposals = await localStore.get('proposals') as IProposal[] | null;
    if (existingProposals) {
      store.proposals = existingProposals;
    }

    store.dropdownOptions = exampleProposals(translator);

    // Set up listener for changes if processId is provided
    if (processId) {
      localStore.onChange(async (key, value) => {
        if (key === 'proposals' && Array.isArray(value)) {
          store.proposals = value as IProposal[];
        }
      });
    }
  });

  // Save proposals whenever they change
  useTask$(async ({ track }) => {
    track(() => store.proposals);
    const localStore = new Store('.proposals.bin');
    await localStore.set('proposals', store.proposals);
    await localStore.save();
  });

  return store;
}

export default component$((props: ProposalsProps) => {
  const { t } =useTranslator();
  const proposalsStore = useProposals(props.processId);

  const addProposal = $((title: string = '', description: string = '') => {
    const newProposal: IProposal = {
      id: uuidv4(),
      title,
      description,
    };
    proposalsStore.proposals = [...proposalsStore.proposals, newProposal];
  });

  return (
    <div>
      <div id="proposals-container" data-is-setup={(props.isSetup || false).toString()} data-process={props.processId}>
        {proposalsStore.proposals.map((proposal) => (
          <div key={proposal.id} class="proposal">
            <h3>{proposal.title}</h3>
            <p>{proposal.description}</p>
            {props.isSetup && (
              <button onClick$={() => {
                proposalsStore.proposals = proposalsStore.proposals.filter(p => p.id !== proposal.id);
              }}>Delete</button>
            )}
          </div>
        ))}
      </div>
      {proposalsStore.proposals.length === 0 && (
        <p id="no-proposals-text">{t('noProposalsFound')}</p>
      )}

      <div class="flex items-center flex-wrap justify-center w-full">
        <button class="btn p-2" onClick$={() => addProposal()}>
          {t('addProposal')}
        </button>
        <div class="dropdown">
          <div tabIndex={0} role="button" class="btn m-1">{t('addProposalTemplate')}</div>
          <div tabIndex={0} class="dropdown-content menu p-2 shadow rounded-box bg-base-100 z-[1]">
            {proposalsStore.dropdownOptions.map((option, index) => (
              <a key={index} class="card-body link" onClick$={() => addProposal(option.title, option.description)}>
                <h3 class="card-title">{option.title}</h3>
                <p class="description">{option.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});