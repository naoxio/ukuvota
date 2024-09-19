import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import Step1 from '~/components/setup-process/step1';
import Step2 from '~/components/setup-process/step2';
import Step3 from '~/components/setup-process/step3';
import Modal from '~/components/modal/modal';
import type { IProcess } from '~/types/IProcess';
import StoreManager from '~/utils/storeManager';

export default component$(() => {
  const { t } = useTranslator();
  const processData = useProcessData();
  const currentStep = useSignal(1);
  const showExistingProcessModal = useSignal(false);

  const startNewProcess = $(async () => {
    const newProcessData: IProcess = {
      _id: '',
      title: '',
      description: '',
      descriptionId: '',
      proposalDates: [0, 0],
      votingDates: [0, 0],
      strategy: '',
      weighting: '',
      proposals: [],
      voters: [],
      timezone: undefined,
      phase: undefined,
      step: '1',
    };

    Object.assign(processData, newProcessData);
    
    const store = new StoreManager('.processData.bin');
    for (const [key, value] of Object.entries(newProcessData)) {
      await store.set(key, value);
    }
    await store.save();

    showExistingProcessModal.value = false;
  });

  const setStep = $((step: number) => {
    currentStep.value = step;
  });

  // Load existing process data
  useVisibleTask$(async () => {
    const store = new StoreManager('.processData.bin');
    const keys: (keyof IProcess)[] = [
      '_id', 'title', 'description', 'descriptionId', 'proposalDates',
      'votingDates', 'strategy', 'weighting', 'proposals', 'voters', 
      'timezone', 'phase', 'step'
    ];
    for (const key of keys) {
      const value = await store.get(key);
      if (value !== null) {
        (processData as any)[key] = value;
      }
    }

    // Check if there's existing process data
    if (processData.title || processData.description) {
      showExistingProcessModal.value = true;
    }
  });

  return (
    <div class="main-content">
      <Modal id="existing-process-modal" icon="custom">
        {showExistingProcessModal.value && (
          <div class="modal-box">
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
        )}
      </Modal>
      {currentStep.value === 1 ? (
        <Step1 setStep={setStep} />
      ) : currentStep.value === 2 ? (
        <Step2 setStep={setStep} />
      ) : currentStep.value === 3 ? (
        <Step3 setStep={setStep} />
      ) : null}
    </div>
  );
});