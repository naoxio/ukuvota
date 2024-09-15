import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Translator } from '@utils/i18n';
import { parseProcessCookie } from '@utils/parseProcessCookie';
import type { ProcessCookie } from '@utils/parseProcessCookie';
import Step1 from '@components/setupProcess/Step1';
import Step2 from '@components/setupProcess/Step2';
import Step3 from '@components/setupProcess/Step3';
import CreateProcessLayout from '@layouts/CreateProcessLayout';
import { Icon } from 'qwik-icon'; // You might need to find a Qwik equivalent for icons

export default component$(() => {
  const navigate = useNavigate();
  const translator = new Translator('en'); // You might want to use a different method to get the current locale

  const processCookie = useStore<ProcessCookie>({
    create: 'false',
    phase: '',
    weighting: '',
    title: '',
    descriptionId: '',
    startProposalDate: 0,
    endProposalDate: 0,
    startVotingDate: 0,
    endVotingDate: 0,
    step: '1',
    proposals: [],
    timezone: undefined,
  });

  const currentStep = useSignal(1);
  const showExistingProcessModal = useSignal(false);

  const initializeComponent = $(() => {
    // In Qwik, you'll need to handle cookie parsing differently
    // This is a placeholder for where you'd parse the cookie and set the state
    const parsedCookie = parseProcessCookie(""); // Replace with actual cookie value
    Object.assign(processCookie, parsedCookie);

    currentStep.value = Number(processCookie.step);

    if (currentStep.value === 1 && !processCookie.phase && !processCookie.weighting && !processCookie.title && !processCookie.descriptionId) {
      processCookie.create = 'false';
    }

    showExistingProcessModal.value = processCookie.create === 'true';
  });

  const startNewProcess = $(async () => {
    // Replace with your API call logic
    await fetch('/api/start-new-process', { method: 'POST' });
    showExistingProcessModal.value = false;
    // Reset processCookie state here
  });

  return (
    <CreateProcessLayout step={currentStep.value}>
      <div id="jsContent">
        {showExistingProcessModal.value && (
          <div class="modal">
            <div class="modal-box">
              <button class="btn btn-sm btn-circle absolute right-2 top-2" onClick$={() => showExistingProcessModal.value = false}>
                <Icon name="close" width={22} />
              </button>
              <h3>{translator.t('setup.continueEditing')}</h3>
              <p>{translator.t('setup.existingProcessPrompt')}</p>
              <div class="process-details">
                {processCookie.title && <p><strong>{translator.t('process.topic')}:</strong> {processCookie.title}</p>}
                {processCookie.weighting && <p><strong>{translator.t('process.weighting')}:</strong> {processCookie.weighting}</p>}
              </div>

              <div class="flex justify-center">
                <button onClick$={startNewProcess} class="btn m-2">{translator.t('setup.startNew')}</button>
                <button onClick$={() => showExistingProcessModal.value = false} class="btn m-2">{translator.t('buttons.continue')}</button>
              </div>
            </div>
          </div>
        )}

        {currentStep.value === 1 ? (
          <Step1 title={processCookie.title} descriptionId={processCookie.descriptionId} weighting={processCookie.weighting} />
        ) : currentStep.value === 2 ? (
          <Step2 
            phase={processCookie.phase} 
            proposalStartDate={processCookie.startProposalDate} 
            proposalEndDate={processCookie.endProposalDate} 
            votingStartDate={processCookie.startVotingDate} 
            votingEndDate={processCookie.endVotingDate} 
            proposals={processCookie.proposals} 
          />
        ) : currentStep.value === 3 ? (
          <Step3 
            title={processCookie.title} 
            descriptionId={processCookie.descriptionId} 
            weighting={processCookie.weighting} 
            timezone={processCookie.timezone as string} 
            proposalStartDate={processCookie.startProposalDate} 
            proposalEndDate={processCookie.endProposalDate} 
            votingStartDate={processCookie.startVotingDate} 
            votingEndDate={processCookie.endVotingDate} 
            proposals={processCookie.proposals} 
          />
        ) : null}
      </div>
    </CreateProcessLayout>
  );
});