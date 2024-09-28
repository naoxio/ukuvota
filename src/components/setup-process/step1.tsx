import { component$, useSignal, $, useVisibleTask$, useContext } from "@builder.io/qwik";
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import weightingOptions from '~/utils/weightingOptions';
import Modal from '~/components/modal/modal';
import StoreManager from '~/utils/storeManager';
import './setup-process.css';
import { StepContext } from "~/contexts/stepContext";

export default component$(() => {
  const stepStore = useContext(StepContext);

  const { t } = useTranslator();
  const processData = useProcessData();
  const timezoneOffset = new Date().getTimezoneOffset();
  const descriptionSignal = useSignal(processData.description || '');
  const titleSignal = useSignal(processData.title || '');
  const weightingSignal = useSignal(processData.weighting || 'x1');
  const errorMessageSignal = useSignal('');

  // eslint-disable-next-line
  useVisibleTask$(async () => {
    const store = new StoreManager('processData.bin');
    const savedDescription = await store.get('description') as string | null;
    if (savedDescription) {
      descriptionSignal.value = savedDescription;
      processData.description = savedDescription;
    }
    const savedTitle = await store.get('title') as string | null;
    if (savedTitle) {
      titleSignal.value = savedTitle;
      processData.title = savedTitle;
    }
    const savedWeighting = await store.get('weighting') as string | null;
    if (savedWeighting) {
      weightingSignal.value = savedWeighting;
      processData.weighting = savedWeighting;
    }
  });

  const handleDescriptionChange = $(async (event: Event) => {
    const newDescription = (event.target as HTMLTextAreaElement).value;
    descriptionSignal.value = newDescription;
    processData.description = newDescription;
    const store = new StoreManager('processData.bin');
    await store.set('description', newDescription);
    await store.save();
  });

  const handleTitleChange = $(async (event: Event) => {
    const newTitle = (event.target as HTMLInputElement).value;
    titleSignal.value = newTitle;
    processData.title = newTitle;
    const store = new StoreManager('processData.bin');
    await store.set('title', newTitle);
    await store.save();
  });

  const handleWeightingChange = $(async (event: Event) => {
    const newWeighting = (event.target as HTMLSelectElement).value;
    weightingSignal.value = newWeighting;
    processData.weighting = newWeighting;
    const store = new StoreManager('processData.bin');
    await store.set('weighting', newWeighting);
    await store.save();
  });

  const handleSubmit = $(async (event: Event, phase: 'full' | 'voting') => {
    event.preventDefault();
    if (!titleSignal.value.trim()) {
      errorMessageSignal.value = await t('setup.errorNoTitle');
      return;
    }
    errorMessageSignal.value = '';
    
    processData.phase = phase;
    processData.title = titleSignal.value;
    processData.description = descriptionSignal.value;
    processData.weighting = weightingSignal.value || 'x1';

    const store = new StoreManager('processData.bin');
    await store.set('title', processData.title);
    await store.set('description', processData.description);
    await store.set('weighting', processData.weighting);
    await store.set('phase', processData.phase);
    await store.set('timezone', timezoneOffset.toString());

    // Update the step and dates
    processData.step = '2';
    const currentDate = new Date().getTime();
    if (phase === 'full') {
      processData.proposalDates = [currentDate, currentDate + 7 * 24 * 60 * 60 * 1000];
      processData.votingDates = [processData.proposalDates[1], processData.proposalDates[1] + 7 * 24 * 60 * 60 * 1000];
    } else {
      processData.votingDates = [currentDate, currentDate + 7 * 24 * 60 * 60 * 1000];
    }

    // Save the updated process data
    await store.set('step', processData.step);
    await store.set('proposalDates', processData.proposalDates);
    await store.set('votingDates', processData.votingDates);
    await store.save();

    // Move to the next step
    stepStore.step = 2;
  });
  
  return (
    <div id="step-1" class="step-container">
      <input type="hidden" name="step" value="1" />
      <input type="hidden" name="timezoneOffset" id="timezoneOffset" value={timezoneOffset} />
      <div id="scrollTopicQuestion" />
      <label class="form-label">{t('process.topic')}</label>
      <input
        id="topicQuestion"
        name="topicQuestion"
        class="form-input"
        type="text"
        value={titleSignal.value}
        onInput$={handleTitleChange}
        required
      />
      <label class="form-label">{t('process.description')}</label>
      <textarea
        id="description"
        name="description"
        class="form-textarea"
        rows={5}
        value={descriptionSignal.value}
        onInput$={handleDescriptionChange}
      ></textarea>
      <div class="form-row">
        <span class="form-label">{t('process.weighting')}</span>
        <div class="form-input-group">
          <select
            id="select"
            name="weighting"
            class="select"
            value={weightingSignal.value}
            onChange$={handleWeightingChange}
          >
            {Object.entries(weightingOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {Number(value) > 0 ? label : '\u221E' /* Unicode for infinity symbol */}
              </option>
            ))}
          </select>
          <Modal id="weightingInfo" icon="info">
            <h3 class="modal-title">{t('process.weighting')}</h3>
            <div>{t('negativeScoreWeighting')}</div>
          </Modal>
        </div>
      </div>
      <div id="errorMessage" class={`error-message ${errorMessageSignal.value ? '' : 'hidden'}`}>
        <p>{errorMessageSignal.value}</p>
      </div>
      <div class="button-container">
        <button 
          onClick$={(e) => handleSubmit(e, 'full')} 
          class="cta-button"
        >
          {t('process.phases.full')}
        </button>
        <button 
          onClick$={(e) => handleSubmit(e, 'voting')} 
          class="cta-button secondary"
        >
          {t('process.phases.voting')}
        </button>
      </div>
    </div>
  );
});