import type { App } from 'vue';
import I18NextVue from "i18next-vue";

import i18next, { t } from "i18next";

export default (app: App) => {
  app.use(I18NextVue, { i18next })
  return app
}