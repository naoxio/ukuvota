import { component$, useTask$, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { useTranslator } from '~/i18n/translator';
import { prettyFormatInTimezone } from '~/utils/dateUtils';
import { useProcessData } from '~/hooks/useProcessData';
import { useProposals } from '~/hooks/useProposals';
import { Store } from '@tauri-apps/plugin-store';

export default component$(() => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const processData = useProcessData();
  const { proposalsStore } = useProposals(processData._id);

  useTask$(async () => {
    // Any initialization logic if needed
    const store = new Store('.processData.bin');
    await store.load();
    
    // Load description if it's not already in processData
    if (!processData.description) {
      const description = await store.get('description') as string;
      if (description) {
        processData.description = description;
      }
    }
  });

  const handleBack = $(() => {
    navigate('/create-process/step2');
  });

  const handleStart = $(async () => {
    const store = new Store('.processData.bin');
    await store.load();

    // Save the final process data
    for (const [key, value] of Object.entries(processData)) {
      await store.set(key, value);
    }

    // Save proposals
    await store.set('proposals', proposalsStore.proposals);

    await store.save();

    // Navigate to the process started page
    navigate('/process-started');
  });

  return (
    <div class="process-details">
      <div class="border border-gray-200 rounded-lg shadow-md p-6 mb-8">
        {processData.title && (
          <div class="mb-4">
            <h2 class="text-xl font-semibold mb-2">{t('process.topic')}</h2>
            <p>{processData.title}</p>
            <div id="descriptionContent">{processData.description}</div>
          </div>
        )}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {processData.proposalDates[0] && processData.proposalDates[1] && (
            <div class="p-4">
              <h2 class="text-lg font-semibold mb-2">{t(`phases.proposal.title`)}</h2>
              <p><h3 class="font-semibold">{t('phases.startAt')}:</h3> {prettyFormatInTimezone(processData.proposalDates[0], processData.timezone || 'UTC')}</p>
              <p><h3 class="font-semibold">{t('phases.endsAt')}:</h3> {prettyFormatInTimezone(processData.proposalDates[1], processData.timezone || 'UTC')}</p>
            </div>
          )}
          <div class="p-4">
            <h2 class="text-lg font-semibold mb-2">{t(`phases.voting.title`)}</h2>
            {processData.votingDates[0] && <p><h3 class="font-semibold">{t('phases.startAt')}:</h3> {prettyFormatInTimezone(processData.votingDates[0], processData.timezone || 'UTC')}</p>}
            {processData.votingDates[1] && <p><h3 class="font-semibold">{t('phases.endsAt')}:</h3> {prettyFormatInTimezone(processData.votingDates[1], processData.timezone || 'UTC')}</p>}
          </div>
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">{t('setup.timezone')}:</h3>
            <p>{processData.timezone || 'UTC'}</p>
          </div>
        </div>
        {proposalsStore.proposals.length > 0 && (
          <div class="mt-8">
            <h2 class="text-xl font-semibold mb-4">{t('process.proposals')}</h2>
            <ul class="space-y-4">
              {proposalsStore.proposals.map((proposal) => (
                <li key={proposal.id} class="border border-gray-200 rounded-lg p-4" id={`proposal-${proposal.id}`}>
                  <b class="text-lg">{proposal.title}</b>
                  <p class="mt-2">{proposal.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div class="flex justify-around mt-5">
        <button onClick$={handleBack} class="btn m-2">{t('buttons.back')}</button>
        <button onClick$={handleStart} class="btn btn-primary m-2">{t('buttons.start')}</button>
      </div>
    </div>
  );
});