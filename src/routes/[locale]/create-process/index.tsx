// src/routes/index.tsx
import { component$, useSignal, $, useVisibleTask$, useContext } from "@builder.io/qwik";
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import Step1 from '~/components/setup-process/step1';
import Step2 from '~/components/setup-process/step2';
import Step3 from '~/components/setup-process/step3';
import Modal from '~/components/modal/modal';
import { StepContext } from "~/contexts/stepContext";

export default component$(() => {
  const { t } = useTranslator();
  const processData = useProcessData();
  const stepStore = useContext(StepContext);
  const showExistingProcessModal = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const hasValidData = processData.title !== '' || processData.description !== '';

    if (stepStore.step === 2 && !processData.mode) {
      stepStore.step = 1;
    }

    if (hasValidData) {
      showExistingProcessModal.value = true;
    }
  });

  const startNewProcess = $(() => {
    processData.title = '';
    processData.description = '';
    processData.weighting = 'x1';
    processData.mode = undefined;
    stepStore.step = 1;
    showExistingProcessModal.value = false;
  });

  return (
    <div>
      <Modal id="existing-process-modal">
        {showExistingProcessModal.value && (
          <div class="modal-box">
            <h3 class="tagline">{t('setup.continueEditing')}</h3>
            <p>{t('setup.existingProcessPrompt')}</p>
            <div class="process-details">
              {processData.title && <p><strong>{t('process.topic')}:</strong> {processData.title}</p>}
              {processData.weighting && <p><strong>{t('process.weighting')}:</strong> {processData.weighting}</p>}
            </div>
            <div class="cta-btns">
              <button onClick$={startNewProcess} class="cta-btn">{t('setup.startNew')}</button>
              <button onClick$={() => showExistingProcessModal.value = false} class="cta-btn secondary">{t('buttons.continue')}</button>
            </div>
          </div>
        )}
      </Modal>
      {stepStore.step === 1 ? (
        <Step1 />
      ) : stepStore.step === 2 ? (
        <Step2 />
      ) : stepStore.step === 3 ? (
        <Step3/>
      ) : null}
    </div>
  );
});