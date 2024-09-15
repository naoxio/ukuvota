import { component$, useSignal, useStore, $, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { useTranslator } from "../../utils/i18n";
import { LuSun, LuMoon } from "@qwikest/icons/lucide";

export default component$(() => {
  const loc = useLocation();
  const navigate = useNavigate();
  const translator = useTranslator();

  const supportedLanguages = ["en", "de", "it"];
  const currentLanguage = loc.locale || 'en';
  const primaryLocale = 'en';

  const store = useStore({
    theme: 'light',
  });

  const languageNames: any = {
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
    const newPath = `${newLang !== primaryLocale ? '/' + newLang : ''}${pathnameWithoutLanguage.value}`;
    navigate(newPath);
  });

  const toggleTheme = $(() => {
    store.theme = store.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', store.theme);
    localStorage.setItem('theme', store.theme);
  });

  useVisibleTask$(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      store.theme = savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      store.theme = prefersDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', store.theme);
  }, { strategy: 'document-ready' });

  return (
    <header>
      <div class="navbar">
        <div>      
          <a class={`btn btn-link ${loc.url.pathname.includes('/') ? 'selected' : ''}`} href="/">
            {translator.t('buttons.home')}
          </a>
        </div>
        <div>
          <div style="display: inline-block; margin: 0 0.5rem;">
            <select 
              class="select" 
              onChange$={(event) => updateLanguage((event.target as HTMLSelectElement).value)}
            >
              {supportedLanguages.map((lang) => (
                <option 
                  key={lang}
                  selected={lang === currentLanguage} 
                  value={lang}
                >
                  {languageNames[lang]}
                </option>
              ))}
            </select>      
          </div>

          <button onClick$={toggleTheme} class="btn btn-ghost">
            {store.theme === 'dark' ? (
              <LuSun width="22" height="22" />
            ) : ( 
              <LuMoon width="22" height="22" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
});