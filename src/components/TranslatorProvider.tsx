import { component$, Slot, useContextProvider, useStore, $, noSerialize } from '@builder.io/qwik';
import { Translator, TranslatorContext } from '../utils/i18n';

export const TranslatorProvider = component$(() => {
  const state = useStore({
    locale: 'en', // Default to 'en', you can make this dynamic
    translator: noSerialize(new Translator('en'))
  });

  // Update translator when locale changes
  $(() => {
    state.translator = noSerialize(new Translator(state.locale));
  });

  useContextProvider(TranslatorContext, state);

  return <Slot />;
});