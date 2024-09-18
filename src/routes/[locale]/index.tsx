import { component$ } from "@builder.io/qwik";
import { useTranslator } from "~/i18n/translator";
import Footer from "~/components/layout/Footer";

export default component$(() => {
  const { t } = useTranslator();

  return (
    <div class="app-container">
      <header class="header">
        <nav class="navbar">
          <a href="/" class="logo">{t('ukuvota')}</a>
          <div class="nav-links">
            <a href="/app" class="nav-link">{t('launchWebApp')}</a>
            <a href="/download/android" class="nav-link">{t('getAndroidAPK')}</a>
          </div>
        </nav>
      </header>

      <main class="main-content">
        <section class="hero">
          <h1>{t('ukuvota')}</h1>
          <p class="tagline">{t('tagline')}</p>
          <div class="cta-buttons">
            <a href="/app" class="cta-button">{t('launchWebApp')}</a>
            <a href="/download/android" class="cta-button secondary">{t('getAndroidAPK')}</a>
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