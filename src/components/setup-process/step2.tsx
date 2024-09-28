import { component$, useSignal, $ } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import { useProposals } from '~/hooks/useProposals';
import ProposalsList from "~/components/process/proposals-list";
import { TimeSelector } from "~/components/date-time/time-selector";
import { TimezoneSelector } from "~/components/date-time/timezone-selector";
import { adjustDates, adjustVotingPhaseDates } from '~/utils/dateAdjustments';
import StoreManager from '~/utils/storeManager';

import './setup-process.css';

export interface Step2Props {
  setStep: (step: number) => void;
}

export default component$((props: Step2Props) => {
  const { t } = useTranslator();
  const processData = useProcessData();
  const { proposalsStore, addProposal, removeProposal } = useProposals(processData._id);

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
    processData.proposalDates = [newPStart.getTime(), newPEnd.getTime()];
    processData.votingDates = [newVStart.getTime(), newVEnd.getTime()];
  });

  const handleTimezoneChange = $(async (newTimezone: string) => {
    processData.timezone = newTimezone;
    const store = new StoreManager('.processData.bin');
    await store.set('timezone', newTimezone);
    await store.save();
  });

  const handleTimeChange = $(async (phase: 'proposal' | 'voting', startDate: number, endDate: number) => {
    const store = new StoreManager('.processData.bin');
    if (phase === 'proposal') {
      processData.proposalDates = [startDate, endDate];
      if (processData.phase === 'full') {
        adjustVotingPhaseDates(new Date(endDate), new Date(processData.votingDates[1]), processData, processData.timezone || 'UTC');
      }
      await store.set('proposalDates', processData.proposalDates);
    } else if (phase === 'voting') {
      processData.votingDates = [startDate, endDate];
      await store.set('votingDates', processData.votingDates);
    }
    await store.save();
  });

  const handleBackButtonClick = $(() => {
    props.setStep(1);
  });

  const handleContinueButtonClick = $(async () => {
    if (processData.phase === 'voting' && proposalsStore.proposals.length === 0) {
      errorMessage.value = await t('error.noProposals');
      return;
    }

    processData.proposals = proposalsStore.proposals;
    const store = new StoreManager('.processData.bin');
    await store.set('proposals', processData.proposals);
    await store.save();
    props.setStep(3);
  });

  return (
    <div id="step-2">
      {processData.phase === "full" ? (
        <div>
          <h2 class="flex mt-4">{t('setup.timeLeftHeading')}</h2>
          <TimezoneSelector onChange$={handleTimezoneChange} value={processData.timezone || 'UTC'} />
          <br />
          <div>
            <TimeSelector
              phase="proposal"
              startDate={processData.proposalDates[0]}
              endDate={processData.proposalDates[1]}
              startMinDate={Date.now()}
              onTimeChange$={handleTimeChange}
            />  
            <TimeSelector
              phase="voting"
              startDate={processData.votingDates[0]}
              endDate={processData.votingDates[1]}
              startMinDate={processData.proposalDates[1]}
              onTimeChange$={handleTimeChange}
            />
          </div>
        </div>
      ) : processData.phase === "voting" ? (
        <div>
          <h2 class="flex mt-4">{t('setup.timeLeftVotingHeading')}</h2>
          <TimezoneSelector onChange$={handleTimezoneChange} value={processData.timezone || 'UTC'} />
          <br />
          <div>
            <TimeSelector
              hideTitle
              phase="voting"
              startDate={processData.votingDates[0]}
              endDate={processData.votingDates[1]}
              startMinDate={Date.now()}
              onTimeChange$={handleTimeChange}
            />
            <br />
            <h2>{t('setup.proposals')}</h2>    
            <ProposalsList 
              proposals={proposalsStore.proposals} 
              isSetup={true}
              onAdd$={addProposal}
              onRemove$={removeProposal}
            />
            {errorMessage.value && (
              <div id="errorMessage" class="text-red-500 mt-4">{errorMessage.value}</div>
            )}
          </div>
        </div>
      ) : null}
      <div class="justify-around mt-5 flex">
        <button id="backButton" class="btn" onClick$={handleBackButtonClick}>{t('buttons.back')}</button>
        <button id="continueButton" class="btn btn-primary" onClick$={handleContinueButtonClick}>{t('buttons.continue')}</button>
      </div>
    </div>
  );
});