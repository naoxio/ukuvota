import { component$, useSignal, useStore, $, useTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate, Link } from "@builder.io/qwik-city";
import { useTranslator } from "~/i18n/translator";
import { LuSun, LuMoon } from "@qwikest/icons/lucide";

export default component$(() => {

  const loc = useLocation();
  const navigate = useNavigate();
  const { t, setLocale, locale } = useTranslator();

  const supportedLanguages = ["en", "de", "it"];
  const primaryLocale = 'en';

  const store = useStore({
    theme: 'light',
  });

  const languageNames: Record<string, string> = {
    'en': 'English',
    'de': 'Deutsch',
    'it': 'Italiano',
  };

  const removeLanguageFromPath = $((path: string) => {
    const pathSegments = path.split('/').filter(Boolean);
    if (supportedLanguages.includes(pathSegments[0])) {
      pathSegments.shift(); 
    }
    return '/' + pathSegments.join('/'); 
  });

  const pathnameWithoutLanguage = useSignal(removeLanguageFromPath(loc.url.pathname));

  const updateLanguage = $((newLang: string) => {
    setLocale(newLang);
    const newPath = `${newLang !== primaryLocale ? '/' + newLang : ''}${pathnameWithoutLanguage.value}`;
    navigate(newPath);
  });

  const toggleTheme = $(() => {
    store.theme = store.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', store.theme);
    localStorage.setItem('theme', store.theme);
  });

  useTask$(({ track }) => {
    track(() => store.theme);
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        store.theme = savedTheme;
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        store.theme = prefersDark ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', store.theme);
    }
  });
  return (
    <header>
      <nav class="navbar">
        <div>      
          <Link class={`btn btn-link ${loc.url.pathname === '/' ? 'selected' : ''}`} href="/">
            {t('buttons.home')}
          </Link>
        </div>
        <div>
          <select 
            class="select" 
            onChange$={(event) => updateLanguage((event.target as HTMLSelectElement).value)}
            value={locale.value}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {languageNames[lang]}
              </option>
            ))}
          </select>      

          <button onClick$={toggleTheme} class="btn btn-ghost">
            {store.theme === 'dark' ? (
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