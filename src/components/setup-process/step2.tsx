import type { QRL } from '@builder.io/qwik';
import { component$, useSignal, $, useContext } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import { useProposals } from '~/hooks/useProposals';
import ProposalsList from "~/components/proposals-list/proposals-list";
import { TimeSelector } from "~/components/date-time/time-selector";
import { adjustDates, adjustVotingPhaseDates } from '~/utils/dateAdjustments';
import StoreManager from '~/utils/storeManager';
import { StepContext } from "~/contexts/stepContext";
import { TimezoneSelector } from "~/components/date-time/timezone-selector";

import './setup-process.css';
import type { IProposal } from '~/types';
import { DateTime } from 'luxon';


export default component$(() => {
  const stepStore = useContext(StepContext);
  const { t } = useTranslator();
  const processData = useProcessData();
  const { addProposal, removeProposal } = useProposals(processData._id);
  
  const errorMessage = useSignal<string | null>(null);

  $(() => {
    const [pStart, pEnd] = processData.proposalDates;
    const [vStart, vEnd] = processData.votingDates;
    const { pStart: newPStart, pEnd: newPEnd, vStart: newVStart, vEnd: newVEnd } = adjustDates(
      processData.phase || '',
      pStart,
      pEnd,
      vStart,
      vEnd
    );
    processData.proposalDates = [newPStart.toMillis(), newPEnd.toMillis()];
    processData.votingDates = [newVStart.toMillis(), newVEnd.toMillis()];
  });

  const handleTimezoneChange = $(async (newTimezone: string) => {
    processData.timezone = newTimezone;
    const store = new StoreManager('processData.bin');
    await store.set('timezone', newTimezone);
    await store.save();
  });
  const handleTimeChange: QRL<(phase: string, startDate: Date, endDate: Date) => Promise<void>> = $(async (phase, startDate, endDate) => {
    const store = new StoreManager('processData.bin');
    if (phase === 'proposal') {
      processData.proposalDates = [startDate.getTime(), endDate.getTime()];
      if (processData.phase === 'full') {
        adjustVotingPhaseDates(
          DateTime.fromJSDate(endDate),
          DateTime.fromMillis(processData.votingDates[1]),
          processData,
          processData.timezone || 'UTC'
        );
      }
      await store.set('proposalDates', processData.proposalDates);
    } else {
      // This is the voting phase
      processData.votingDates = [startDate.getTime(), endDate.getTime()];
      await store.set('votingDates', processData.votingDates);
    }
    await store.save();
  });

  const handleBackButtonClick = $(() => {
    stepStore.step = 1;
  });

  const handleContinueButtonClick = $(async () => {
    const store = new StoreManager(`proposals_${processData._id}.bin`);
    const proposals = await store.get('proposals') as IProposal[] | null;

    if (processData.phase === 'voting' && (!proposals || proposals.length === 0)) {
      errorMessage.value = await t('error.noProposals');
      return;
    }

    if (proposals) {
      processData.proposals = proposals;
      const processStore = new StoreManager('processData.bin');
      await processStore.set('proposals', processData.proposals);
      await processStore.save();
    }

    stepStore.step = 3;
  });
  
  return (
    <div id="step-2" class="step-container">
      {processData.phase === "full" ? (
        <div class="phase-container">
          <h2 class="section-heading">{t('setup.timeLeftHeading')}</h2>
          <TimezoneSelector onTimezoneChange$={handleTimezoneChange} timezone={processData.timezone || 'UTC'} />
          <div class="spacer"></div>
          <div class="time-selectors">
            <TimeSelector
              phase="proposal"
              startDate={new Date(processData.proposalDates[0])}
              endDate={new Date(processData.proposalDates[1])}
              startMinDate={new Date()}
              onTimeChange$={handleTimeChange}
            />  
            <TimeSelector
              phase="voting"
              startDate={new Date(processData.votingDates[0])}
              endDate={new Date(processData.votingDates[1])}
              startMinDate={new Date(processData.proposalDates[1])}
              onTimeChange$={handleTimeChange}
            />
          </div>
        </div>
      ) : processData.phase === "voting" ? (
        <div class="phase-container">
          <h2 class="section-heading">{t('setup.timeLeftVotingHeading')}</h2>
          <TimezoneSelector onTimezoneChange$={handleTimezoneChange} timezone={processData.timezone || 'UTC'} />
          <div class="spacer"></div>
          <div class="time-selectors">

          <TimeSelector
              hideTitle
              phase="voting"
              startDate={new Date(processData.votingDates[0])}
              endDate={new Date(processData.votingDates[1])}
              startMinDate={new Date()}
              onTimeChange$={handleTimeChange}
            />
          </div>
          <div class="spacer"></div>
          <h2 class="section-heading">{t('setup.proposals')}</h2>  
          <ProposalsList 
            processId={processData._id}
            isSetup={true}
            onAdd$={addProposal}
            onRemove$={removeProposal}
          />
          {errorMessage.value && (
            <div id="errorMessage" class="error-message">{errorMessage.value}</div>
          )}
        </div>
      ) : null}
      <div class="button-group">
        <button id="backButton" class="cta-btn secondary" onClick$={handleBackButtonClick}>{t('buttons.back')}</button>
        <button id="continueButton" class="cta-btn primary" onClick$={handleContinueButtonClick}>{t('buttons.continue')}</button>
      </div>
    </div>
  );
});