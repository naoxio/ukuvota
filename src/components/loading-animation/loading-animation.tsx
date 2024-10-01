import { component$ } from "@builder.io/qwik";
import { useTranslator } from '~/i18n/translator';
import ImgLogo from '~/assets/logo.png?jsx';
import './loading-animation.css';

export default component$(() => {
  const { t } = useTranslator();

  return (
    <div class="loading-container">
      <div class="loading-content">
        <ImgLogo class="loading-logo" alt="Ukuvota Logo" />
        <p class="loading-text">{t('loading.message')}</p>
      </div>
    </div>
  );
});