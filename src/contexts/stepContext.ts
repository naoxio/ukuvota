// src/contexts/stepContext.ts
import { createContextId } from '@builder.io/qwik';

export interface StepStore {
  step: number;
}

export const StepContext = createContextId<StepStore>('step-context');
