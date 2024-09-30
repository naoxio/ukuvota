import { component$, Slot, useStore, useContextProvider, $ } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import type { StepStore } from '~/contexts/stepContext';
import { StepContext } from '~/contexts/stepContext';
import './index.css';

export default component$(() => {
  const { t } = useTranslator();
  const processData = useProcessData();
  const stepStore = useStore<StepStore>({ step: 1 });

  useContextProvider(StepContext, stepStore);

  const setStep = $((newStep: number) => {
    stepStore.step = newStep;
  });

  const steps = [
    { stepNumber: 1, disabled: false },
    { stepNumber: 2, disabled: (!processData.title || !processData.mode) },
    { stepNumber: 3, disabled: (!processData.title || !processData.mode || !processData.votingDates[1]) }
  ];

  return (
    <div class="main-content">
      <h1 class="page-title">{ t('setup.process') }</h1>
      <div class="step-indicator">
        {steps.map(({ stepNumber, disabled }) => {
          const isClickable = stepNumber <= stepStore.step || !disabled;
          return (
            <button
              key={stepNumber}
              onClick$={() => {
                if (isClickable) {
                  setStep(stepNumber);
                }
              }}
              class={`step-button ${
                stepStore.step === stepNumber ? 'active' :
                stepStore.step > stepNumber ? 'completed' :
                isClickable ? 'clickable' : 'disabled'
              }`}
              style={{
                cursor: isClickable ? 'pointer' : 'not-allowed'
              }}
            >
              {stepNumber}
            </button>
          );
        })}
      </div>
      <Slot />
    </div>
  );
});