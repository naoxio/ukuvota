import { component$, useTask$, $, useContext, useSignal, useStore } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { prettyFormatInTimezone, formatDuration } from '~/utils/dateUtils';
import { useProcessData } from '~/hooks/useProcessData';
import { useProposals } from '~/hooks/useProposals';
import { StepContext } from '~/contexts/stepContext';
import { DateTime } from 'luxon';
import './setup-process.css';

export default component$(() => {
  const stepStore = useContext(StepContext);
  const { t } = useTranslator();
  const { processData, saveProcessData, loadProcessData } = useProcessData();
  const { proposalsStore } = useProposals(processData._id);
  const errorMessage = useSignal<string | null>(null);
  const startsIn = useStore({ proposal: '', voting: '' });

  useTask$(async ({ track }) => {
    track(() => processData.proposalDates[0]);
    track(() => processData.votingDates[0]);

    const now = DateTime.now();
    const proposalStart = DateTime.fromMillis(processData.proposalDates[0]);
    const votingStart = DateTime.fromMillis(processData.votingDates[0]);

    const proposalDiff = proposalStart.diff(now).as('seconds');
    const votingDiff = votingStart.diff(now).as('seconds');

    startsIn.proposal = proposalDiff <= 60 
      ? await t('setup.startsImmediately')
      : await t('setup.startsIn', { duration: formatDuration(proposalDiff) });
    
    startsIn.voting = votingDiff <= 60 
      ? await t('setup.startsAfterProposal')
      : await t('setup.startsIn', { duration: formatDuration(votingDiff) });
  });

  useTask$(async () => {
    await loadProcessData();
    await saveProcessData();
  });

  const handleBackButtonClick = $(async () => {
    processData.step = 2;
    await saveProcessData();
    stepStore.step = 2;
  });

  const handleStartButtonClick = $(async () => {
    processData.proposals = proposalsStore.proposals;
    await saveProcessData();
    errorMessage.value = await t('setup.processStarted');
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
              <h2 class="item-title">{t('phases.proposal.title')}</h2>
              <p><span class="label">{t('phases.startAt')}:</span> {prettyFormatInTimezone(processData.proposalDates[0], processData.timezone || 'UTC')}</p>
              <p class="starts-in">{startsIn.proposal}</p>
              <p><span class="label">{t('phases.endsAt')}:</span> {prettyFormatInTimezone(processData.proposalDates[1], processData.timezone || 'UTC')}</p>
            </div>
          )}
          
          <div class="summary-item">
            <h2 class="item-title">{t('phases.voting.title')}</h2>
            {processData.votingDates[0] && (
              <>
                <p><span class="label">{t('phases.startAt')}:</span> {prettyFormatInTimezone(processData.votingDates[0], processData.timezone || 'UTC')}</p>
                <p class="starts-in">{startsIn.voting}</p>
              </>
            )}
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
      <div class="btn-container">
        <button id="backButton" class="cta-btn" onClick$={handleBackButtonClick}>{t('buttons.back')}</button>
        <button id="startButton" class="cta-btn secondary" onClick$={handleStartButtonClick}>{t('buttons.start')}</button>
      </div>
    </div>
  );
});