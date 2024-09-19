import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate, Link } from "@builder.io/qwik-city";
import { useTranslator } from "~/i18n/translator";
import { LuSun, LuMoon } from "@qwikest/icons/lucide";
import { Store } from '@tauri-apps/plugin-store';

import './header.css';

export default component$(() => {
  const loc = useLocation();
  const navigate = useNavigate();
  const { t, setLocale, locale } = useTranslator();
  const supportedLanguages = ["en", "de", "it"];
  const theme = useSignal('dark');
  const languageNames: Record<string, string> = {
    'en': 'English',
    'de': 'Deutsch',
    'it': 'Italiano',
  };

  const updateLanguage = $((newLang: string) => {
    setLocale(newLang);
    const newPath = `/${newLang}${loc.url.pathname.replace(/^\/[a-z]{2}/, '') || '/'}`;
    navigate(newPath);
  });

  const toggleTheme = $(async () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light';
    theme.value = newTheme;
    const store = new Store('settings.bin');
    await store.set('theme', newTheme);
    await store.save();
    document.documentElement.setAttribute('data-theme', newTheme);
  });

  // eslint-disable-next-line
  useVisibleTask$(async () => {
    const store = new Store('settings.bin');
    const savedTheme = await store.get('theme') as string | null;
    if (savedTheme) {
      theme.value = savedTheme;
    } else {
      theme.value = 'dark';
      await store.set('theme', 'dark');
      await store.save();
    }
    document.documentElement.setAttribute('data-theme', theme.value);
  });
  

  return (
    <header class="header">
      <nav class="navbar">
        <div class="nav-group">
          <Link class={`btn btn-link ${loc.url.pathname === '/' || loc.url.pathname === `/${locale}` ? 'selected' : ''}`} href={`/${locale}`}>
            {t('buttons.home')}
          </Link>
        </div>
        <div class="nav-group">
          <select
            class="select"
            onChange$={(event) => updateLanguage((event.target as HTMLSelectElement).value)}
            value={locale}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {languageNames[lang]}
              </option>
            ))}
          </select>
          <button onClick$={toggleTheme} class="btn btn-ghost">
            {theme.value === 'dark' ? (
              <LuSun width="22" height="22" />
            ) : (
              <LuMoon width="22" height="22" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
});