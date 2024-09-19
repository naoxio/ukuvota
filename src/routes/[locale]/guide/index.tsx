import { component$, useSignal } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import ContentDoc from '~/components/content-doc/content-doc';

export default component$(() => {
  const { t } = useTranslator();
  const noGuide = useSignal(true);

  return (
    <div class="container mx-auto p-4">
      <ContentDoc fileName="Guide" />
      <label class="cursor-pointer label" for="noGuide">
        <span class="label-text">{t('guide.checkboxLabel')}</span>
        <input 
          type="checkbox" 
          id="noGuide" 
          class="checkbox checkbox-primary" 
          checked={noGuide.value}
          onChange$={(event) => noGuide.value = (event.target as HTMLInputElement).checked}
        />
      </label>
      <div class="flex justify-center">
        <button 
          type="button" 
          class="btn text-btn m-2"
          onClick$={() => {
            // Handle create process action
            console.log('Create process', { noGuide: noGuide.value });
          }}
        >
          {t('guide.createProcessButton')}
        </button>
      </div>
    </div>
  );
});
