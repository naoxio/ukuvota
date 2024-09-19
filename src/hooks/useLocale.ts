import { useLocation } from '@builder.io/qwik-city';

export function useLocale() {
  const location = useLocation();
  const urlLocale = location.params.locale;
  if (urlLocale && ['en', 'de', 'it'].includes(urlLocale)) {
    return urlLocale;
  }
  return getBrowserLocale() || 'en';
}

export function getBrowserLocale() {
  if (typeof navigator === 'undefined') return null;
  
  const browserLang = navigator.language.split('-')[0];
  const supportedLocales = ['en', 'de', 'it']; // Add all your supported locales here
  
  return supportedLocales.includes(browserLang) ? browserLang : null;
}