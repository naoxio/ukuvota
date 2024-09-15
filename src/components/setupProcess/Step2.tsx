import { component$, useStore, useTask$, $, useSignal } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { useTranslator } from '../../utils/i18n';
import ProposalsList from "../process/ProposalsList";
import TimeSelector from "../datetime/TimeSelector";
import TimezoneSelector from "../datetime/TimezoneSelector";
import { adjustDates, adjustVotingPhaseDates } from '../../utils/dateAdjustments';
import { sliderToDuration, durationToSlider } from '../../utils/logslider';
import { formatDuration, formatDateInTimezone } from '../../utils/dateUtils';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { isProposalEmpty } from '../../utils/proposalUtils';
import type IProposal from '../../interfaces/IProposal';

export interface Step2Props {
  phase: string;
  proposals: Array<IProposal>;
  proposalStartDate: number;
  proposalEndDate: number;
  votingStartDate: number;
  votingEndDate: number;
}

export default component$((props: Step2Props) => {
  const translator = useTranslator();
  const navigate = useNavigate();

  const store = useStore({
    phase: props.phase,
    proposals: props.proposals,
    timezone: 'UTC',
    pStart: 0,
    pEnd: 0,
    vStart: 0,
    vEnd: 0,
  });

  const errorMessage = useSignal<string | null>(null);

  useTask$(({ track }) => {
    track(() => [props.phase, props.proposalStartDate, props.proposalEndDate, props.votingStartDate, props.votingEndDate]);
    const { pStart, pEnd, vStart, vEnd } = adjustDates(
      props.phase,
      props.proposalStartDate,
      props.proposalEndDate,
      props.votingStartDate,
      props.votingEndDate
    );
    store.pStart = pStart;
    store.pEnd = pEnd;
    store.vStart = vStart;
    store.vEnd = vEnd;
  });

  useTask$(async ({ track }) => {
    track(() => store.timezone);
    // Fetch and set timezone logic here
    // For example:
    // const storedTimeZone = await localforage.getItem('userTimezone') || Intl.DateTimeFormat().resolvedOptions().timeZone;
    // store.timezone = storedTimeZone;
  });

  const handleTimezoneChange = $((newTimezone: string) => {
    store.timezone = newTimezone;
    // Update localforage or other storage mechanism here
  });

  const handleTimeChange = $((phase: string, startDate: number, endDate: number) => {
    if (phase === 'proposal') {
      store.pStart = startDate;
      store.pEnd = endDate;
      if (store.phase === 'full') {
        adjustVotingPhaseDates(store.pEnd, endDate, store, store.timezone);
      }
    } else if (phase === 'voting') {
      store.vStart = startDate;
      store.vEnd = endDate;
    }
  });

  const handleBackButtonClick = $(() => {
    navigate('/api/update-step?step=1');
  });

  const handleContinueButtonClick = $(() => {
    const formData = new FormData();
    formData.append('step', '2');

    if (store.phase === 'full') {
      formData.append('start-date-picker-proposal', store.pStart.toString());
      formData.append('end-date-picker-proposal', store.pEnd.toString());
      formData.append('start-date-picker-voting', store.vStart.toString());
      formData.append('end-date-picker-voting', store.vEnd.toString());
    } else if (store.phase === 'voting') {
      formData.append('start-date-picker-voting', store.vStart.toString());
      formData.append('end-date-picker-voting', store.vEnd.toString());
      formData.append('proposals', JSON.stringify(store.proposals));
    }

    formData.append('timezone', store.timezone);

    fetch('/api/process-store', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          navigate('/create-process/step3');
        } else {
          return response.text();
        }
      })
      .then((errorMessage) => {
        if (errorMessage) {
          errorMessage.value = errorMessage;
        }
      })
      .catch((error) => {
        console.error('Error sending request', error);
      });
  });

  return (
    <div id="step-2">
      {store.phase === "full" ? (
        <div>
          <h2 class="flex mt-4">{translator.t('setup.timeLeftHeading')}</h2>
          <TimezoneSelector onChange$={handleTimezoneChange} value={store.timezone} />
          <br />
          <div>
            <TimeSelector
              phase="proposal"
              startDate={store.pStart}
              endDate={store.pEnd}
              startMinDate={Date.now()}
              onTimeChange$={handleTimeChange}
            />  
            <TimeSelector
              phase="voting"
              startDate={store.vStart}
              endDate={store.vEnd}
              startMinDate={store.pEnd}
              onTimeChange$={handleTimeChange}
            />
          </div>
        </div>
      ) : store.phase === "voting" ? (
        <div>
          <h2 class="flex mt-4">{translator.t('setup.timeLeftVotingHeading')}</h2>
          <TimezoneSelector onChange$={handleTimezoneChange} value={store.timezone} />
          <br />
          <div>
            <TimeSelector
              hideTitle
              phase="voting"
              startDate={store.vStart}
              endDate={store.vEnd}
              startMinDate={Date.now()}
              onTimeChange$={handleTimeChange}
            />
            <br />
            <h2>{translator.t('setup.proposals')}</h2>    
            <ProposalsList proposals={store.proposals} isSetup/>
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
