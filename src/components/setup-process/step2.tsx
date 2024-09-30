import { component$, useSignal, $, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import { useProposals } from '~/hooks/useProposals';
import ProposalsList from "~/components/proposals-list/proposals-list";
import { TimeSelector } from "~/components/date-time/time-selector";
import { adjustDates, adjustVotingPhaseDates } from '~/utils/dateAdjustments';
import { StepContext } from "~/contexts/stepContext";
import { TimezoneSelector } from "~/components/date-time/timezone-selector";
import './setup-process.css';
import { DateTime } from 'luxon';

export default component$(() => {
  const stepStore = useContext(StepContext);
  const { t } = useTranslator();
  const { processData, saveProcessData, loadProcessData } = useProcessData();
  const { addProposal, removeProposal } = useProposals(processData._id);
  
  const errorMessage = useSignal<string | null>(null);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    await loadProcessData();
    const [pStart, pEnd] = processData.proposalDates;
    const [vStart, vEnd] = processData.votingDates;
    const { pStart: newPStart, pEnd: newPEnd, vStart: newVStart, vEnd: newVEnd } = adjustDates(
      processData.mode || '',
      pStart,
      pEnd,
      vStart,
      vEnd
    );
    
    Object.assign(processData, {
      proposalDates: [newPStart.toMillis(), newPEnd.toMillis()],
      votingDates: [newVStart.toMillis(), newVEnd.toMillis()]
    });
    await saveProcessData();
  });

  const handleTimezoneChange = $(async (newTimezone: string) => {
    processData.timezone = newTimezone;
    await saveProcessData();
  });

  const handleTimeChange = $(async (phase: string, startDate: number, endDate: number) => {
    if (phase === 'proposal') {
      processData.proposalDates = [startDate, endDate];
      if (processData.mode === 'full') {
        adjustVotingPhaseDates(
          DateTime.fromMillis(endDate),
          DateTime.fromMillis(processData.votingDates[1]),
          processData,
          processData.timezone || 'UTC'
        );
      }
    } else {
      processData.votingDates = [startDate, endDate];
    }
    await saveProcessData();
  });

  const handleBackButtonClick = $(async () => {
    processData.step = 1;
    await saveProcessData();
    stepStore.step = 1;
  });

  const handleContinueButtonClick = $(async () => {
    if (processData.mode === 'voting' && processData.proposals.length === 0) {
      errorMessage.value = await t('error.noProposals');
      return;
    }

    processData.step = 3;
    await saveProcessData();
    stepStore.step = 3;
  });
  
  return (
    <div id="step-2" class="step-container">
      {processData.mode === "full" ? (
        <div class="phase-container">
          <h2 class="section-heading">{t('setup.timeLeftHeading')}</h2>
          <TimezoneSelector onTimezoneChange$={handleTimezoneChange} timezone={processData.timezone || 'UTC'} />
          <div class="spacer"></div>
          <div class="time-selectors">
            <TimeSelector
              phase="proposal"
              startDate={processData.proposalDates[0]}
              endDate={processData.proposalDates[1]}
              startMinDate={DateTime.now().toMillis()}
              timezone={processData.timezone || 'UTC'}
              onTimeChange$={handleTimeChange}
            />  
            <TimeSelector
              phase="voting"
              startDate={processData.votingDates[0]}
              endDate={processData.votingDates[1]}
              startMinDate={processData.proposalDates[1]}
              timezone={processData.timezone || 'UTC'}
              onTimeChange$={handleTimeChange}
            />
          </div>
        </div>
      ) : processData.mode === "voting" ? (
        <div class="phase-container">
          <h2 class="section-heading">{t('setup.timeLeftVotingHeading')}</h2>
          <TimezoneSelector onTimezoneChange$={handleTimezoneChange} timezone={processData.timezone || 'UTC'} />
          <div class="spacer"></div>
          <div class="time-selectors">
            <TimeSelector
              hideTitle
              phase="voting"
              startDate={processData.votingDates[0]}
              endDate={processData.votingDates[1]}
              startMinDate={DateTime.now().toMillis()}
              timezone={processData.timezone || 'UTC'}
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
      <div class="btn-container">
        <button id="backButton" class="cta-btn" onClick$={handleBackButtonClick}>{t('buttons.back')}</button>
        <button id="continueButton" class="cta-btn secondary" onClick$={handleContinueButtonClick}>{t('buttons.continue')}</button>
      </div>
    </div>
  );
});