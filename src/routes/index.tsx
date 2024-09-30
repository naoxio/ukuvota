import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { useLocale } from '~/hooks/useLocale';
import LoadingAnimation from '~/components/loading-animation/loading-animation';

export default component$(() => {
  const nav = useNavigate();
  const locale = useLocale();
  
  // eslint-disable-next-line
  useVisibleTask$(() => {
    nav(`/${locale}/`);
  });

  return <LoadingAnimation/>;
});