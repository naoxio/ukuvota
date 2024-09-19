// in localeContext.ts
import { createContextId } from "@builder.io/qwik";

export interface LocaleContextValue {
  locale: string;
  setLocale: (newLocale: string) => void;
}

export const LocaleContext = createContextId<LocaleContextValue>('locale-context');

