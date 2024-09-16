import { component$, useSignal, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { useTranslator } from '~/utils/i18n';
import { useProcessData } from '~/hooks/useProcessData';
import { useProposals } from '~/hooks/useProposals';
import ProposalsList from "~/components/process/ProposalsList";
import TimeSelector from "~/components/datetime/TimeSelector";
import TimezoneSelector from "~/components/datetime/TimezoneSelector";
import { adjustDates, adjustVotingPhaseDates } from '~/utils/dateAdjustments';


export default component$(() => {
  const translator = useTranslator();
  const navigate = useNavigate();
  const processData = useProcessData();
  const { proposalsStore, addProposal, removeProposal } = useProposals(processData._id);

  const errorMessage = useSignal<string | null>(null);

  $(() => {
    const [pStart, pEnd] = processData.proposalDates;
    const [vStart, vEnd] = processData.votingDates;
    const { pStart: newPStart, pEnd: newPEnd, vStart: newVStart, vEnd: newVEnd } = adjustDates(
      processData.phase ?  processData.phase  : '',
      pStart,
      pEnd,
      vStart,
      vEnd
    );
    processData.proposalDates = [newPStart.getTime(), newPEnd.getTime()];
    processData.votingDates = [newVStart.getTime(), newVEnd.getTime()];
  });

  const handleTimezoneChange = $((newTimezone: string) => {
    processData.timezone = newTimezone;
  });

  const handleTimeChange = $((phase: 'proposal' | 'voting', startDate: number, endDate: number) => {
    if (phase === 'proposal') {
      processData.proposalDates = [startDate, endDate];
      if (processData.phase === 'full') {
        adjustVotingPhaseDates(new Date(endDate), new Date(processData.votingDates[1]), processData, processData.timezone || 'UTC');
      }
    } else if (phase === 'voting') {
      processData.votingDates = [startDate, endDate];
    }
  });

  const handleBackButtonClick = $(() => {
    navigate('/create-process/step1');
  });

  const handleContinueButtonClick = $(async () => {
    if (processData.phase === 'voting' && proposalsStore.proposals.length === 0) {
      errorMessage.value = await translator.t('error.noProposals');
      return;
    }

    processData.proposals = proposalsStore.proposals;
    navigate('/create-process/step3');
  });

  return (
    <div id="step-2">
      {processData.phase === "full" ? (
        <div>
          <h2 class="flex mt-4">{translator.t('setup.timeLeftHeading')}</h2>
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
          <h2 class="flex mt-4">{translator.t('setup.timeLeftVotingHeading')}</h2>
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
            <h2>{translator.t('setup.proposals')}</h2>    
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
        <button id="backButton" class="btn" onClick$={handleBackButtonClick}>{translator.t('buttons.back')}</button>
        <button id="continueButton" class="btn btn-primary" onClick$={handleContinueButtonClick}>{translator.t('buttons.continue')}</button>
      </div>
    </div>
  );
});