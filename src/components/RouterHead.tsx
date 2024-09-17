import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

import { useLocale } from '~/i18n/useLocale';

export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  const supportedLanguages = ["en", "de", "it"];
  const display_title = `Ukuvota ${head.title ? `- ${head.title}` : ''}`;

  // Use the useLocale function to get the current locale
  const currentLocale = useLocale();

  return (
    <>
      <title>{display_title}</title>
      <meta name="description" content={head.meta.find(m => m.name === "description")?.content} />
      <meta name="keywords" content="evotico, ukuvota, voting, democracy, consensus, collaborative" />
      <meta name="author" content="NaoX" />
      <meta name="locale" content={currentLocale} />

      {supportedLanguages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hreflang={lang}
          href={`/${lang}${loc.url.pathname}`}
        />
      ))}

      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />

      <meta property="og:title" content={display_title} />
      <meta property="og:description" content={head.meta.find(m => m.name === "description")?.content} />
      <meta property="og:image" content={`${loc.url.origin}/social_logo.png`} />
      <meta property="og:url" content={loc.url.href} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={display_title} />
      <meta name="twitter:description" content={head.meta.find(m => m.name === "description")?.content} />
      <meta name="twitter:image" content={`${loc.url.origin}/social_logo.png`} />
    </>
  );
});
