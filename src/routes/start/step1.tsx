import { component$, useSignal, useStore, $, useVisibleTask$ } from "@builder.io/qwik";
import { Translator } from '@utils/i18n';
import weightingOptions from '@utils/weightingOptions';
import Modal from '@components/ui/Modal';
import ContentDoc from '@components/ui/ContentDoc';
import { createQuill, updateQuill } from '@utils/quillUtils';

export interface Step1Props {
  title: string;
  descriptionId?: string;
  weighting?: string;
}

export default component$((props: Step1Props) => {
  const translator = new Translator('en'); // Replace with your locale logic
  const timezoneOffset = new Date().getTimezoneOffset();

  const store = useStore({
    title: props.title,
    descriptionId: props.descriptionId || `description_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    weighting: props.weighting,
    quillOps: '',
  });

  const quillEditor = useSignal<any>(null);

  useVisibleTask$(() => {
    const quillContainer = document.getElementById('description') as HTMLElement;
    if (quillContainer) {
      quillContainer.style.display = 'block';
      quillContainer.innerText = '';
      quillEditor.value = createQuill('#description');

      // Retrieve the description data from localforage using the descriptionId
      if (typeof window !== 'undefined' && window.localforage) {
        window.localforage.getItem(store.descriptionId).then((descriptionData: string | null) => {
          if (descriptionData) {
            const quillOps = JSON.parse(descriptionData);
            updateQuill(quillEditor.value, quillOps);
            store.quillOps = descriptionData;
          }
        });
      }

      if (quillEditor.value) {
        quillEditor.value.on('text-change', $(() => {
          const quillOps = quillEditor.value.getContents();
          if (typeof window !== 'undefined' && window.localforage) {
            window.localforage.setItem(store.descriptionId, JSON.stringify(quillOps));
          }
          store.quillOps = JSON.stringify(quillOps);
        }));
      }
    }
  });

  const handleSubmit = $((event: Event, phase: string) => {
    event.preventDefault();
    // Handle form submission logic here
    // You might want to use Qwik City's API routes or server$ function
  });

  return (
    <form id="step-1" preventdefault:submit>
      <input type="hidden" name="step" value="1" />
      <input type="hidden" name="timezoneOffset" id="timezoneOffset" value={timezoneOffset} />

      <div id="scrollTopicQuestion" />
      <p>{translator.t('process.topic')}</p>
      <input 
        id="topicQuestion" 
        name="topicQuestion" 
        class="input input-bordered w-full" 
        type="text" 
        value={store.title} 
        onInput$={(event) => store.title = (event.target as HTMLInputElement).value}
        required 
        title={translator.t('alert.error.topicQuestion')}
      />
      <br/>
      <br/>
      <p>{translator.t('process.description')}</p>

      <input id="descriptionId" name="descriptionId" type="hidden" value={store.descriptionId} />
      <div id="description" class="hidden" data-description-id={store.descriptionId}>{translator.t('loadQuill')}</div>
      <input id="quillops" name="description" class="hidden" value={store.quillOps} />
      <br/>

      <div class="flex justify-between items-center">
        <span>{translator.t('process.weighting')}</span>
        <span class="flex justify-center items-center">
          <select 
            id="select" 
            name="weighting" 
            class="select mx-2 select-bordered mt-2" 
            value={store.weighting}
            onChange$={(event) => store.weighting = (event.target as HTMLSelectElement).value}
          >
            {Object.entries(weightingOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {Number(value) > 0 ? <span>{label}</span> : <span>&infin;</span>}
              </option>
            ))}
          </select>
          
          <Modal id="weightingInfo">
            <h3>{translator.t('process.weighting')}</h3>
            <ContentDoc file_name="NegativeScoreWeighting"/>
          </Modal>
        </span>
      </div>
      <br/>
      <div class="flex justify-around flex-wrap">
        <button onClick$={(e) => handleSubmit(e, 'full')} class="btn btn-primary m-2">
          {translator.t('process.phases.full')}
        </button>
        <button onClick$={(e) => handleSubmit(e, 'voting')} class="btn btn-primary m-2">
          {translator.t('process.phases.voting')}
        </button>
      </div>
    </form>
  );
});