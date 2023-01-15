import type { App } from 'vue';
import I18NextVue from "i18next-vue";
import i18next, {t} from "i18next";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


export default (app: App) => {
  app.use(I18NextVue, { i18next })
  app.component('Datepicker', Datepicker);
  return app
}