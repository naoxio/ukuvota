// src/routes/index.tsx
import { component$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';

export default component$(() => {
  const nav = useNavigate();
  
  // Redirect to default locale (e.g., 'en')
  nav('/en/');
  
  return null;
});