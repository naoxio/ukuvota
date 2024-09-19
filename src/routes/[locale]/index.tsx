import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useTranslator } from "~/i18n/translator";
import Footer from "~/components/footer/footer";

import './index.css';

export default component$(() => {
  const { t, locale } = useTranslator();

  return (
    <div class="app-container">

      <main class="main-content">
        <section class="hero">
          <h1>{t('ukuvota')}</h1>
          <p class="tagline">{t('tagline')}</p>

          <div class="cta-buttons">
            <Link href={`/${locale}/create-process`} class="cta-button">{t('createNewProcess')}</Link>
            <Link href={`/${locale}/download/android`} class="cta-button secondary">{t('getAndroidAPK')}</Link>
          </div>
          
        </section>

        <section class="features">
          <div class="feature">
            <h2>{t('weightedScoreVoting')}</h2>
            <p>{t('weightedScoreVotingDesc')}</p>
          </div>
          <div class="feature">
            <h2>{t('effortlessSharing')}</h2>
            <p>{t('effortlessSharingDesc')}</p>
          </div>
          <div class="feature">
            <h2>{t('consensusDrivenApproach')}</h2>
            <p>{t('consensusDrivenApproachDesc')}</p>
          </div>
          <div class="feature">
            <h2>{t('userFriendlyInterface')}</h2>
            <p>{t('userFriendlyInterfaceDesc')}</p>
          </div>
          <div class="feature">
            <h2>{t('transparentResults')}</h2>
            <p>{t('transparentResultsDesc')}</p>
          </div>
        </section>
      </main>

      <Footer/>
    </div>
  );
});