import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { useLocale } from '~/hooks/useLocale';

export default component$(() => {
  const nav = useNavigate();
  const locale = useLocale();
  
  // eslint-disable-next-line
  useVisibleTask$(() => {
    nav(`/${locale}/`);
  });

  return <div class="loading">Loading...</div>;
});