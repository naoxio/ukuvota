import { component$, useTask$, $, useContext, useSignal } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { prettyFormatInTimezone } from '~/utils/dateUtils';
import { useProcessData } from '~/hooks/useProcessData';
import { useProposals } from '~/hooks/useProposals';
import { StepContext } from '~/contexts/stepContext';
import StoreManager from '~/utils/storeManager';

import './setup-process.css';

export default component$(() => {
  const stepStore = useContext(StepContext);

  const { t } = useTranslator();
  const processData = useProcessData();
  const { proposalsStore } = useProposals(processData._id);

  const errorMessage = useSignal<string | null>(null);

  useTask$(async () => {
    const store = new StoreManager('processData.bin');
    
    // Load description if it's not already in processData
    if (!processData.description) {
      const description = await store.get('description') as string;
      if (description) {
        processData.description = description;
      }
    }
  });

  const handleBackButtonClick = $(() => {
    stepStore.step = 2;
  });

  const handleStartButtonClick = $(async () => {
    const store = new StoreManager('processData.bin');

    // Save the final process data
    for (const [key, value] of Object.entries(processData)) {
      await store.set(key, value);
    }

    // Save proposals
    await store.set('proposals', proposalsStore.proposals);

    await store.save();

    errorMessage.value = 'Process started successfully!';
  });

  return (
    <div id="step-3" class="process-details">
      <div class="process-summary">
        {processData.title && (
          <div class="summary-section">
            <h2 class="section-title">{t('process.topic')}</h2>
            <p class="topic-title">{processData.title}</p>
            <div id="descriptionContent" class="topic-description">{processData.description}</div>
          </div>
        )}
        <div class="summary-grid">
          {processData.proposalDates[0] && processData.proposalDates[1] && (
            <div class="summary-item">
              <h2 class="item-title">{t(`phases.proposal.title`)}</h2>
              <p><span class="label">{t('phases.startAt')}:</span> {prettyFormatInTimezone(processData.proposalDates[0], processData.timezone || 'UTC')}</p>
              <p><span class="label">{t('phases.endsAt')}:</span> {prettyFormatInTimezone(processData.proposalDates[1], processData.timezone || 'UTC')}</p>
            </div>
          )}
          <div class="summary-item">
            <h2 class="item-title">{t(`phases.voting.title`)}</h2>
            {processData.votingDates[0] && <p><span class="label">{t('phases.startAt')}:</span> {prettyFormatInTimezone(processData.votingDates[0], processData.timezone || 'UTC')}</p>}
            {processData.votingDates[1] && <p><span class="label">{t('phases.endsAt')}:</span> {prettyFormatInTimezone(processData.votingDates[1], processData.timezone || 'UTC')}</p>}
          </div>
          <div class="summary-item">
            <h3 class="item-title">{t('setup.timezone')}:</h3>
            <p>{processData.timezone || 'UTC'}</p>
          </div>
        </div>
        {proposalsStore.proposals.length > 0 && (
          <div class="proposals-section">
            <h2 class="section-title">{t('process.proposals')}</h2>
            <ul class="proposals-list">
              {proposalsStore.proposals.map((proposal) => (
                <li key={proposal.id} class="proposal-item" id={`proposal-${proposal.id}`}>
                  <h3 class="proposal-title">{proposal.title}</h3>
                  <p class="proposal-description">{proposal.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {errorMessage.value && (
        <div id="errorMessage" class="success-message">{errorMessage.value}</div>
      )}
      <div class="btn-group">
        <button id="backButton" class="cta-btn secondary" onClick$={handleBackButtonClick}>{t('buttons.back')}</button>
        <button id="startButton" class="cta-btn primary" onClick$={handleStartButtonClick}>{t('buttons.start')}</button>
      </div>
    </div>
  );
});