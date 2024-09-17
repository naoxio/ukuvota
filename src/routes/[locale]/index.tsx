import { component$ } from "@builder.io/qwik";
import { useTranslator } from "~/i18n/translator";

export default component$(() => {
  const { t } = useTranslator();

  return (
    <>
      <main>
        <section class="hero">
          <h1>{t('ukuvota')}</h1>
          <p>{t('tagline')}</p>
          <div class="cta-buttons">
            <a href="/app" class="cta-button">{t('launchWebApp')}</a>
            <a href="/download/android" class="cta-button">{t('getAndroidAPK')}</a>
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

      <footer class="footer">
        <p>&copy; 2024 NaoX</p>
        <div class="social-links">
          <a href="mailto:contact@ukuvota.com" aria-label="Email">📧</a>
          <a href="https://instagram.com/ukuvota" aria-label="Instagram">📷</a>
          <a href="https://x.com/ukuvota" aria-label="X">𝕏</a>
          <a href="https://github.com/ukuvota" aria-label="GitHub">🐙</a>
          <a href="https://t.me/ukuvota" aria-label="Telegram">📞</a>
        </div>
      </footer>
    </>
  );
});