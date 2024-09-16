import { component$, useSignal, $ } from "@builder.io/qwik";
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';

import Step1 from '~/components/setupProcess/Step1';
import Step2 from '~/components/setupProcess/Step2';
import Step3 from '~/components/setupProcess/Step3';

import { LuX } from "@qwikest/icons/lucide";

export default component$(() => {
  const { t } =useTranslator();
  const processData = useProcessData();

  const currentStep = useSignal(1);
  const showExistingProcessModal = useSignal(false);

  const startNewProcess = $(() => {
    Object.assign(processData, {
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
    localStorage.removeItem('processData');
    showExistingProcessModal.value = false;
  });

  return (
    <div>
      <div id="jsContent">
        {showExistingProcessModal.value && (
          <div class="modal">
            <div class="modal-box">
              <button class="btn btn-sm btn-circle absolute right-2 top-2" onClick$={() => showExistingProcessModal.value = false}>
                <LuX width={22} height={22} />
              </button>
              <h3>{t('setup.continueEditing')}</h3>
              <p>{t('setup.existingProcessPrompt')}</p>
              <div class="process-details">
                {processData.title && <p><strong>{t('process.topic')}:</strong> {processData.title}</p>}
                {processData.weighting && <p><strong>{t('process.weighting')}:</strong> {processData.weighting}</p>}
              </div>

              <div class="flex justify-center">
                <button onClick$={startNewProcess} class="btn m-2">{t('setup.startNew')}</button>
                <button onClick$={() => showExistingProcessModal.value = false} class="btn m-2">{t('buttons.continue')}</button>
              </div>
            </div>
          </div>
        )}

        {currentStep.value === 1 ? (
          <Step1 />
        ) : currentStep.value === 2 ? (
          <Step2 />
        ) : currentStep.value === 3 ? (
          <Step3 />
        ) : null}
      </div>
    </div>
  );
});