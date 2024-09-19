import { component$, useSignal, $ } from "@builder.io/qwik";
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import Step1 from '~/components/setup-process/step1';
import { LuX } from "@qwikest/icons/lucide";

export default component$(() => {
  const { t } = useTranslator();
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
    <div class="main-content">
      {showExistingProcessModal.value && (
        <div class="modal">
          <div class="modal-box">
            <button class="btn-ghost" onClick$={() => showExistingProcessModal.value = false}>
              <LuX width={22} height={22} />
            </button>
            <h3 class="tagline">{t('setup.continueEditing')}</h3>
            <p>{t('setup.existingProcessPrompt')}</p>
            <div class="process-details">
              {processData.title && <p><strong>{t('process.topic')}:</strong> {processData.title}</p>}
              {processData.weighting && <p><strong>{t('process.weighting')}:</strong> {processData.weighting}</p>}
            </div>
            <div class="cta-buttons">
              <button onClick$={startNewProcess} class="cta-button">{t('setup.startNew')}</button>
              <button onClick$={() => showExistingProcessModal.value = false} class="cta-button secondary">{t('buttons.continue')}</button>
            </div>
          </div>
        </div>
      )}
      {currentStep.value === 1 ? (
        <Step1 />
      ) : currentStep.value === 2 ? (
        <div />
      ) : currentStep.value === 3 ? (
        <div />
      ) : null}
    </div>
  );
});