import { component$, useSignal, $, useVisibleTask$, useContext } from "@builder.io/qwik";
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import Step1 from '~/components/setup-process/step1';
import Step2 from '~/components/setup-process/step2';
import Step3 from '~/components/setup-process/step3';
import Modal from '~/components/modal/modal';
import { StepContext } from "~/contexts/stepContext";
import LoadingAnimation from '~/components/loading-animation/loading-animation';
import weightingOptions from '~/utils/weightingOptions';

export default component$(() => {
  const { t, locale } = useTranslator();
  const { processData, clearProcessData, loadProcessData } = useProcessData();
  const stepStore = useContext(StepContext);
  const showExistingProcessModal = useSignal(false);
  const isLoading = useSignal(true);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    await loadProcessData();
    track(() => processData);
    const hasExistingData = processData.title || processData.description;
    showExistingProcessModal.value = hasExistingData ? true : false;
    isLoading.value = false;
  });

  const startNewProcess = $(async () => {
    await clearProcessData();
    stepStore.step = 1;
    showExistingProcessModal.value = false;
    window.location.href = `/${locale}/create-process`;
  });

  const continueProcess = $(async () => {
    showExistingProcessModal.value = false;
    stepStore.step = processData.step || 1;
  });

  const getWeightingLabel = (value: string) => {
    if (value in weightingOptions) {
      return Number(value) > 0 ? weightingOptions[value] : '\u221E'; // Unicode for infinity symbol
    }
    return value;
  };

  return (
    <div>
      {isLoading.value ? (
        <LoadingAnimation />
      ) : (
        <>
          <Modal id="existing-process-modal" isOpen={showExistingProcessModal.value}>
            <div class="modal-box">
              <h3 class="tagline">{t('setup.continueEditing')}</h3>
              <p>{t('setup.existingProcessPrompt')}</p>
              <div class="process-details-content">
                {processData.title && (
                  <div class="process-detail-item">
                    <span class="detail-label">{t('process.topic')}</span>
                    <span class="detail-value">{processData.title}</span>
                  </div>
                )}
                {processData.weighting && (
                  <div class="process-detail-item">
                    <span class="detail-label">{t('process.weighting')}</span>
                    <span class="detail-value">{getWeightingLabel(processData.weighting)}</span>
                  </div>
                )}
              </div>
              <div class="btn-container">
                <button onClick$={startNewProcess} class="cta-btn">{t('setup.startNew')}</button>
                <button onClick$={continueProcess} class="cta-btn secondary">{t('buttons.continue')}</button>
              </div>
            </div>
          </Modal>
          {stepStore.step === 1 ? (
            <Step1 />
          ) : stepStore.step === 2 ? (
            <Step2 />
          ) : stepStore.step === 3 ? (
            <Step3/>
          ) : null}
        </>
      )}
    </div>
  );
});