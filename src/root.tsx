import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { TranslatorProvider } from "./components/TranslatorProvider";
import { RouterHead } from "./components/RouterHead";
import Header from "./components/Header";

import "./global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <RouterHead />
      </head>
      <body>
        <TranslatorProvider>
          <Header />
          <main>
            <RouterOutlet />
          </main>
        </TranslatorProvider>
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});