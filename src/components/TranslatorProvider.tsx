import { component$, Slot, useContextProvider, useStore, $ } from '@builder.io/qwik';
import { TranslatorContext } from '../utils/i18n'; // Refers to the updated TranslatorContext in the previous solution
import { translationsMap } from '../utils/i18n'; // The map with translations for each locale

export const TranslatorProvider = component$(() => {
  const state = useStore({
    locale: 'en', // Default to 'en', can be dynamic based on user preference
    translations: translationsMap['en'] // Initialize translations with the 'en' locale
  });

  // Update translator when locale changes
  const updateTranslations = $(() => {
    state.translations = translationsMap[state.locale] || translationsMap['en'];
  });

  // Watch for changes to locale and update translations accordingly
  state.locale && updateTranslations();

  // Provide the state to the TranslatorContext
  useContextProvider(TranslatorContext, state);

  return <Slot />;
});
