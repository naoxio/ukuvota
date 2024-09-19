import { component$, Slot, $, PropFunction } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import './index.css';

export interface CreateProcessLayoutProps {
  step: number;
  setStep: PropFunction<(step: number) => void>;
}

export default component$((props: CreateProcessLayoutProps) => {
  const { t } = useTranslator();
  const processData = useProcessData();

  const steps = [
    { stepNumber: 1, disabled: false },
    { stepNumber: 2, disabled: (!processData.title || !processData.phase) },
    { stepNumber: 3, disabled: (!processData.title || !processData.phase || !processData.votingDates[1]) }
  ];

  const updateStep = $((stepNumber: number) => {
    if (!steps[stepNumber - 1].disabled) {
      props.setStep(stepNumber);
    }
  });

  return (
    <div class="main-content">
      <h1 class="tagline">{t('setup.process')}</h1>
      <div class="step-indicator">
        {steps.map(({ stepNumber, disabled }) => (
          <button
            key={stepNumber}
            onClick$={() => updateStep(stepNumber)}
            class={`${
              props.step === stepNumber ? 'active' :
              props.step > stepNumber ? 'completed' : ''
            } ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
          ></button>
        ))}
      </div>
      <Slot />
    </div>
  );
});