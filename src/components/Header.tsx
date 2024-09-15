import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { useTranslator } from "../utils/i18n";
import { LuSun, LuMoon } from "@qwikest/icons/lucide";

export default component$(() => {
  const loc = useLocation();
  const navigate = useNavigate();
  const translator = useTranslator();

  const supportedLanguages = ["en", "de", "it"];
  const currentLanguage = loc.locale || 'en';
  const primaryLocale = 'en';

  const store = useStore({
    theme: 'light', // You'll need to implement theme persistence
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
    // Implement language change logic here
    const newPath = `${newLang !== primaryLocale ? '/' + newLang : ''}${pathnameWithoutLanguage.value}`;
    navigate(newPath);
  });

  const toggleTheme = $(() => {
    store.theme = store.theme === 'light' ? 'dark' : 'light';
    // Implement theme change logic here
  });

  return (
    <header>
      <div class="navbar bg-base-100">
        <div class="flex-1 items-center">      
          <a class={'btn btn-link ' + (loc.url.pathname.includes('/') ? 'selected' : '')} href="/">
            {translator.t('buttons.home')}
          </a>
        </div>
        <div class="flex-none items-center">
          <div class="mx-2 flex items-center">
            <select 
              class="select select-xs mx-2" 
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

          <button onClick$={toggleTheme} class="btn btn-ghost btn-sm">
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