import { component$, useStore, useTask$, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { useTranslator } from '~/utils/i18n';
import { prettyFormatInTimezone } from '~/utils/dateUtils';
import getQuillHTML from '~/utils/getQuillHTML';
import type { IProposal } from '~/types';

export interface Step3Props {
  title: string;
  description: string;
  proposals: Array<IProposal>;
  proposalStartDate: number;
  proposalEndDate: number;
  votingStartDate: number;
  votingEndDate: number;
  timezone: string;
  weighting: string;
}

export default component$((props: Step3Props) => {
  const translator = useTranslator();
  const navigate = useNavigate();

  const store = useStore({
    descriptionContent: '',
    proposalsData: [] as Array<{ id: string; title: string; description: string }>,
  });

  useTask$(async () => {
    if (props.description) {
      const descriptionContent = await localforage.getItem(props.descriptionId) as string || '';
      if (descriptionContent) {
        store.descriptionContent = JSON.parse(descriptionContent);
      }
    }

    store.proposalsData = await Promise.all(props.proposals.map(async (proposal) => {
      const titleContent = await localforage.getItem(`title-${proposal.id}`) as string || '';
      const descriptionContent = await localforage.getItem(`description-${proposal.id}`) as string || '';
      return {
        id: proposal.id,
        title: titleContent,
        description: descriptionContent,
      };
    }));
  });

  const handleBack = $(() => {
    navigate('/api/update-step?step=2');
  });

  const handleStart = $(() => {
    const formData = new FormData();
    formData.append('descriptionContent', JSON.stringify(store.descriptionContent));
    formData.append('proposalsData', JSON.stringify(store.proposalsData));

    fetch('/api/start-process', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful process start
          navigate('/process-started'); // Adjust this to your actual route
        } else {
          console.error('Failed to start process');
        }
      })
      .catch((error) => {
        console.error('Error starting process:', error);
      });
  });

  return (
    <div class="process-details">
      <div class="border border-gray-200 rounded-lg shadow-md p-6 mb-8">
        {props.title && (
          <div class="mb-4">
            <h2 class="text-xl font-semibold mb-2">{translator.t('process.topic')}</h2>
            <p>{props.title}</p>
            <div
              id="descriptionContent"
              dangerouslySetInnerHTML={getQuillHTML(store.descriptionContent as Delta)}
            />
          </div>
        )}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {props.proposalStartDate && props.proposalEndDate && (
            <div class="p-4">
              <h2 class="text-lg font-semibold mb-2">{translator.t(`phases.proposal.title`)}</h2>
              <p><h3 class="font-semibold">{translator.t('phases.startAt')}:</h3> {prettyFormatInTimezone(props.proposalStartDate, props.timezone)}</p>
              <p><h3 class="font-semibold">{translator.t('phases.endsAt')}:</h3> {prettyFormatInTimezone(props.proposalEndDate, props.timezone)}</p>
            </div>
          )}
          <div class="p-4">
            <h2 class="text-lg font-semibold mb-2">{translator.t(`phases.voting.title`)}</h2>
            {props.votingStartDate && <p><h3 class="font-semibold">{translator.t('phases.startAt')}:</h3> {prettyFormatInTimezone(props.votingStartDate, props.timezone)}</p>}
            {props.votingEndDate && <p><h3 class="font-semibold">{translator.t('phases.endsAt')}:</h3> {prettyFormatInTimezone(props.votingEndDate, props.timezone)}</p>}
          </div>
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">{translator.t('setup.timezone')}:</h3>
            <p>{props.timezone}</p>
          </div>
        </div>
        {store.proposalsData.length > 0 && (
          <div class="mt-8">
            <h2 class="text-xl font-semibold mb-4">{translator.t('process.proposals')}</h2>
            <ul class="space-y-4">
              {store.proposalsData.map((proposal) => (
                <li key={proposal.id} class="border border-gray-200 rounded-lg p-4" id={`proposal-${proposal.id}`}>
                  <b class="text-lg">{proposal.title}</b>
                  <p class="mt-2" dangerouslySetInnerHTML={getQuillHTML(JSON.parse(proposal.description) as Delta)} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div class="flex justify-around mt-5">
        <button onClick$={handleBack} class="btn m-2">{translator.t('buttons.back')}</button>
        <button onClick$={handleStart} class="btn btn-primary m-2">{translator.t('buttons.start')}</button>
      </div>
    </div>
  );
});