import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import weightingOptions from '~/utils/weightingOptions';
import Modal from '~/components/modal/modal';
import ContentDoc from '../content-doc/content-doc';
import StoreManager from '~/utils/storeManager';

import './setup-process.css';

export default component$(() => {
  const { t } = useTranslator();
  const processData = useProcessData();
  const timezoneOffset = new Date().getTimezoneOffset();
  const descriptionSignal = useSignal(processData.description || '');
  
  // eslint-disable-next-line
  useVisibleTask$(async () => {
    const store = new StoreManager('processData.bin');
    const savedDescription = await store.get('description') as string | null;
    if (savedDescription) {
      descriptionSignal.value = savedDescription;
      processData.description = savedDescription;
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

  const handleSubmit = $(async (event: Event, phase: string) => {
    event.preventDefault();
    processData.phase = phase;
    const store = new StoreManager('processData.bin');
    await store.set('title', processData.title);
    await store.set('description', processData.description);
    await store.set('weighting', processData.weighting);
    await store.set('phase', processData.phase);
    await store.set('timezoneOffset', timezoneOffset);
    await store.save();
  });

  return (
    <form id="step-1" class="process-form" preventdefault:submit>
      <input type="hidden" name="step" value="1" />
      <input type="hidden" name="timezoneOffset" id="timezoneOffset" value={timezoneOffset} />
      <div id="scrollTopicQuestion" />
      <label class="form-label">{t('process.topic')}</label>
      <input
        id="topicQuestion"
        name="topicQuestion"
        class="form-input"
        type="text"
        value={processData.title}
        onInput$={(event) => processData.title = (event.target as HTMLInputElement).value}
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
            value={processData.weighting}
            onChange$={(event) => processData.weighting = (event.target as HTMLSelectElement).value}
          >
            {Object.entries(weightingOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {Number(value) > 0 ? label : '\u221E' /* Unicode for infinity symbol */}
              </option>
            ))}
          </select>
          <Modal id="weightingInfo">
            <h3 class="modal-title">{t('process.weighting')}</h3>
            <ContentDoc fileName="NegativeScoreWeighting"/>
          </Modal>
        </div>
      </div>
      <div class="cta-buttons">
        <button onClick$={(e) => handleSubmit(e, 'full')} class="cta-button">
          {t('process.phases.full')}
        </button>
        <button onClick$={(e) => handleSubmit(e, 'voting')} class="cta-button secondary">
          {t('process.phases.voting')}
        </button>
      </div>
    </form>
  );
});