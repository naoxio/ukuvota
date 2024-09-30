import { component$, useSignal, $, useVisibleTask$, useContext } from "@builder.io/qwik";
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import weightingOptions from '~/utils/weightingOptions';
import Modal from '~/components/modal/modal';
import './setup-process.css';
import { StepContext } from "~/contexts/stepContext";

export default component$(() => {
  const stepStore = useContext(StepContext);
  const { t } = useTranslator();
  const { processData, saveProcessData, loadProcessData } = useProcessData();
  const timezoneOffset = new Date().getTimezoneOffset();
  const descriptionSignal = useSignal(processData.description || '');
  const titleSignal = useSignal(processData.title || '');
  const weightingSignal = useSignal(processData.weighting || 'x1');
  const errorMessageSignal = useSignal('');

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    await loadProcessData();
    descriptionSignal.value = processData.description || '';
    titleSignal.value = processData.title || '';
    weightingSignal.value = processData.weighting || 'x1';

    if (!processData.weighting) {
      processData.weighting = 'x1';
      await saveProcessData();
    }
  });

  const handleDescriptionChange = $((event: Event) => {
    const newDescription = (event.target as HTMLTextAreaElement).value;
    descriptionSignal.value = newDescription;
    processData.description = newDescription;
  });

  const handleTitleChange = $((event: Event) => {
    const newTitle = (event.target as HTMLInputElement).value;
    titleSignal.value = newTitle;
    processData.title = newTitle;
  });

  const handleWeightingChange = $((event: Event) => {
    const newWeighting = (event.target as HTMLSelectElement).value;
    if (newWeighting && Object.prototype.hasOwnProperty.call(weightingOptions, newWeighting)) {
      weightingSignal.value = newWeighting;
      processData.weighting = newWeighting;
    } else {
      weightingSignal.value = 'x1';
      processData.weighting = 'x1';
    }
  });
  
  const handleSubmit = $(async (event: Event, mode: 'full' | 'voting') => {
    event.preventDefault();
    if (!titleSignal.value.trim()) {
      errorMessageSignal.value = await t('setup.errorNoTitle');
      return;
    }
    errorMessageSignal.value = '';
    
    const currentDate = new Date().getTime();
    
    Object.assign(processData, {
      mode,
      title: titleSignal.value,
      description: descriptionSignal.value,
      weighting: weightingSignal.value || 'x1',
      timezone: timezoneOffset.toString(),
      proposalDates: mode === 'full' ? [currentDate, currentDate + 7 * 24 * 60 * 60 * 1000] : undefined,
      votingDates: mode === 'full' 
        ? [currentDate + 7 * 24 * 60 * 60 * 1000, currentDate + 14 * 24 * 60 * 60 * 1000]
        : [currentDate, currentDate + 7 * 24 * 60 * 60 * 1000],
      step: 2
    });

    await saveProcessData();
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
      <div class="btn-container">
        <button 
          onClick$={(e) => handleSubmit(e, 'full')} 
          class="cta-btn"
        >
          {t('process.modes.full')}
        </button>
        <button 
          onClick$={(e) => handleSubmit(e, 'voting')} 
          class="cta-btn secondary"
        >
          {t('process.modes.voting')}
        </button>
      </div>
    </div>
  );
});