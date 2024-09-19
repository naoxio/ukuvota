import { component$, Slot, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';
import './index.css';

export interface CreateProcessLayoutProps {
  step: number;
}

export default component$((props: CreateProcessLayoutProps) => {
  const { t } = useTranslator();
  const processData = useProcessData();
  const navigate = useNavigate();

  const steps = [
    { stepNumber: 1, disabled: false },
    { stepNumber: 2, disabled: (!processData.title || !processData.phase) },
    { stepNumber: 3, disabled: (!processData.title || !processData.phase || !processData.votingDates[1]) }
  ];

  const updateStep = $((stepNumber: number) => {
    navigate(`/create-process/step${stepNumber}`);
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