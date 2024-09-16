import { component$, Slot, useStyles$, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { useTranslator } from '~/i18n/translator';
import { useProcessData } from '~/hooks/useProcessData';

export interface CreateProcessLayoutProps {
  step: number;
}

export default component$((props: CreateProcessLayoutProps) => {
  const { t } =useTranslator();
  const processData = useProcessData();

  useStyles$(`
    // ... (styles remain the same)
  `);

  const navigate = useNavigate();

  const steps = [
    { stepNumber: 1, disabled: false },
    { stepNumber: 2, disabled: (!processData.title || !processData.phase) },
    { stepNumber: 3, disabled: (!processData.title || !processData.phase || !processData.endVotingDate) }
  ];

  const updateStep = $((stepNumber: number) => {
    navigate(`/create-process/step${stepNumber}`);
  });

  return (
    <>
      <h1 class="text-center">{t('setup.process')}</h1>
      <div class="flex justify-center space-x-2 m-2">
        {steps.map(({ stepNumber, disabled }) => (
          <button 
            key={stepNumber}
            onClick$={() => updateStep(stepNumber)}
            class={`w-4 h-4 rounded-full ${
              props.step === stepNumber ? 'ring-bg ring brown-ring ring-2' : 
              props.step > stepNumber ? 'ring-bg' : 
              'bg-gray-300'
            } ${disabled ? 'bg-gray-500 pointer-events-none' : ''}`} 
            disabled={disabled}
          ></button>
        ))}
      </div>
      <Slot />
    </>
  );
});