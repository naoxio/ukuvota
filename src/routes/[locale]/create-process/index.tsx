import { component$, useSignal, $, useVisibleTask$, useContext } from "@builder.io/qwik";
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import Step1 from '~/components/setup-process/step1';
import Step2 from '~/components/setup-process/step2';
import Step3 from '~/components/setup-process/step3';
import Modal from '~/components/modal/modal';
import type { IProcess } from '~/types/IProcess';
import StoreManager from '~/utils/storeManager';
import { StepContext } from "~/contexts/stepContext";

export default component$(() => {
  const { t } = useTranslator();
  const processData = useProcessData();
  const stepStore = useContext(StepContext);
  const showExistingProcessModal = useSignal(false);

  const resetProcessData = $(async () => {
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
    await store.clear(); // Clear all existing data
    for (const [key, value] of Object.entries(newProcessData)) {
      await store.set(key, value);
    }
  });

  const startNewProcess = $(async () => {
    await resetProcessData();
    showExistingProcessModal.value = false;
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const store = new StoreManager('.processData.bin');
    const keys: (keyof IProcess)[] = [
      '_id', 'title', 'description', 'descriptionId', 'proposalDates',
      'votingDates', 'strategy', 'weighting', 'proposals', 'voters',
      'timezone', 'phase', 'step'
    ];

    let hasValidData = false;

    for (const key of keys) {
      try {
        const value = await store.get(key);
        if (value !== null) {
          (processData as any)[key] = value;
          if (key === 'title' || key === 'description') {
            hasValidData = true;
          }
        }
      } catch (error) {
        console.error(`Error retrieving data for key ${key}:`, error);
        // If there's an error retrieving, set to default value
        (processData as any)[key] = (processData as any)[key] || undefined;
      }
    }

    // Check if there's existing valid process data
    if (hasValidData) {
      showExistingProcessModal.value = true;
    } else {
      // If no valid data, reset the process data
      await resetProcessData();
    }
  });


  return (
    <div>
      <Modal id="existing-process-modal" >
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