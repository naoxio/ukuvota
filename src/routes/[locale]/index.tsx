import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useTranslator } from "~/i18n/translator";
import Footer from "~/components/footer/footer";
import './index.css';

export default component$(() => {
  const { t, locale } = useTranslator();

  const features = [
    'weightedScoreVoting',
    'effortlessSharing',
    'consensusDrivenApproach',
    'userFriendlyInterface',
    'transparentResults'
  ];

  return (
    <div class="app-container">
      <main class="main-content">
        <section class="hero">
          <h1>{t('ukuvota')}</h1>
          <p class="tagline">{t('tagline')}</p>
          <div class="cta-buttons">
            <Link href={`/${locale}/create-process`} class="cta-button">{t('buttons.createNewProcess')}</Link>
            <Link href={`/${locale}/download/android`} class="cta-button secondary">{t('launch.androidAPK')}</Link>
          </div>
        </section>
        <section class="features">
          {features.map((feature) => (
            <div class="feature" key={feature}>
              <h2>{t(`features.${feature}.title`)}</h2>
              <p>{t(`features.${feature}.description`)}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer/>
    </div>
  );
});