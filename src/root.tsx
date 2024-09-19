import { $, component$, useContextProvider, useStore } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { isDev } from "@builder.io/qwik/build";
import Header from "./components/header/header";
import { LocaleContext } from "./i18n/localeContext";
import "./global.css";

export default component$(() => {
  const localeStore = useStore({
    locale: 'en',
    setLocale: null as unknown as (newLocale: string) => void
  });

  // Define setLocale function after localeStore is initialized
  localeStore.setLocale = $((newLocale: string) => {
    localeStore.locale = newLocale;
  });

  useContextProvider(LocaleContext, localeStore);


  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body>
        <Header />
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});