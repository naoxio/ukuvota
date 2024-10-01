import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useTranslator } from "~/i18n/translator";
import Footer from "~/components/footer/footer";
import ImgLogo from '~/assets/logo.png?jsx';
import './index.css';

export default component$(() => {
  const { t, locale } = useTranslator();
  return (
    <div>
      <main class="app-container">
        <section class="hero">
          <div class="hero-content">
            <ImgLogo class="logo" alt="Ukuvota Logo" />
            <h1>Ukuvota</h1>
            <h2>{t('home.subheader')}</h2>
          </div>
        </section>
        <section class="features-grid">
          <div class="feature-card">
            <h3>{t('home.weightedScoreTitle')}</h3>
            <p>{t('home.weightedScoreDescription')}</p>
          </div>
          <div class="feature-card">
            <h3>{t('home.effortlessSharingTitle')}</h3>
            <p>{t('home.effortlessSharingDescription')}</p>
          </div>
          <div class="feature-card">
            <h3>{t('home.consensusDrivenTitle')}</h3>
            <p>{t('home.consensusDrivenDescription')}</p>
          </div>
          <div class="feature-card">
            <h3>{t('home.userFriendlyTitle')}</h3>
            <p>{t('home.userFriendlyDescription')}</p>
          </div>
          <div class="feature-card">
            <h3>{t('home.transparentResultsTitle')}</h3>
            <p>{t('home.transparentResultsDescription')}</p>
          </div>
        </section>
        <section class="cta">
          <Link href={`/${locale}/create-process`} class="btn primary">{t('home.webAppCardButton')}</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
});