import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import weightingOptions from '~/utils/weightingOptions';
import Modal from '../ui/Modal';
import ContentDoc from '../ui/ContentDoc';
import { Store } from '@tauri-apps/plugin-store';

export default component$(() => {
  const { t } = useTranslator();
  const processData = useProcessData();
  const timezoneOffset = new Date().getTimezoneOffset();
  const descriptionSignal = useSignal(processData.description || '');

  useVisibleTask$(async () => {
    const store = new Store('processData.bin');
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
    const store = new Store('processData.bin');
    await store.set('description', newDescription);
    await store.save();
  });

  const handleSubmit = $(async (event: Event, phase: string) => {
    event.preventDefault();
    processData.phase = phase;
    
    const store = new Store('processData.bin');
    await store.set('title', processData.title);
    await store.set('description', processData.description);
    await store.set('weighting', processData.weighting);
    await store.set('phase', processData.phase);
    await store.set('timezoneOffset', timezoneOffset);
    await store.save();
  });

  return (
    <form id="step-1" preventdefault:submit>
      <input type="hidden" name="step" value="1" />
      <input type="hidden" name="timezoneOffset" id="timezoneOffset" value={timezoneOffset} />
      <div id="scrollTopicQuestion" />
      <p>{t('process.topic')}</p>
      <input
        id="topicQuestion"
        name="topicQuestion"
        class="input input-bordered w-full"
        type="text"
        value={processData.title}
        onInput$={(event) => processData.title = (event.target as HTMLInputElement).value}
        required
        title={t('alert.error.topicQuestion')}
      />
      <br/>
      <br/>
      <p>{t('process.description')}</p>
      <textarea
        id="description"
        name="description"
        class="textarea textarea-bordered w-full"
        rows={5}
        value={descriptionSignal.value}
        onInput$={handleDescriptionChange}
      ></textarea>
      <br/>
      <div class="flex justify-between items-center">
        <span>{t('process.weighting')}</span>
        <span class="flex justify-center items-center">
          <select
            id="select"
            name="weighting"
            class="select mx-2 select-bordered mt-2"
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
            <h3>{t('process.weighting')}</h3>
            <ContentDoc fileName="NegativeScoreWeighting"/>
          </Modal>
        </span>
      </div>
      <br/>
      <div class="flex justify-around flex-wrap">
        <button onClick$={(e) => handleSubmit(e, 'full')} class="btn btn-primary m-2">
          {t('process.phases.full')}
        </button>
        <button onClick$={(e) => handleSubmit(e, 'voting')} class="btn btn-primary m-2">
          {t('process.phases.voting')}
        </button>
      </div>
    </form>
  );
});