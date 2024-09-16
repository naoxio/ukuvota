import { useLocation } from '@builder.io/qwik-city';

export function useLocale() {
  const location = useLocation();
  const locale = location.params.locale || 'en';
  return locale || 'en'; 
}
