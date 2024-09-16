import { component$, useContextProvider } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "./components/RouterHead";
import Header from "./components/layout/Header";
import { TranslatorContext, setTranslatorContext } from "~/i18n/translator";
import { useLocale } from "~/i18n/useLocale";

import "./global.css";

export default component$(() => {
  const locale = useLocale();
  const translatorContext = setTranslatorContext(locale);

  useContextProvider(TranslatorContext, translatorContext);

  return (
    <QwikCityProvider>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <RouterHead />
      </head>
      <body>
        <Header />
        <main>
          <RouterOutlet />
        </main>
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});