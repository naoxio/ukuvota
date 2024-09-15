import { component$, Slot, useStyles$, useStore, $ } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { useTranslator } from '@utils/i18n';

export interface CreateProcessLayoutProps {
  step: number;
}

export default component$((props: CreateProcessLayoutProps) => {
  const translator = useTranslator();

  useStyles$(`
    .brown-ring {
      --tw-ring-color: var(--link-hover-color);
    }
    .dark .brown-ring {
      --tw-ring-color: var(--link-hover-color-dark);
    }
    .ring-bg {
      background-color: var(--link-color);
    }
    .dark .ring-bg {
      background-color: var(--link-color-dark);
    }
    .ring-bg:hover {
      background-color: var(--link-hover-color);
    }
    .dark .ring-bg:hover {
      background-color: var(--link-hover-color-dark);
    }
  `);

  const location = useLocation();
  const navigate = useNavigate();
  const processCookie = useStore<ProcessCookie>(parseProcessCookie(location.url.searchParams.get('process') || ''));

  const steps = [
    { stepNumber: 1, disabled: false },
    { stepNumber: 2, disabled: (!processCookie.title || !processCookie.phase) },
    { stepNumber: 3, disabled: (!processCookie.title || !processCookie.phase || !processCookie.endVotingDate) }
  ];

  const updateStep = $((stepNumber: number) => {
    // Here you would update your process cookie or state
    // For now, we'll just navigate to the new step
    navigate(`/create-process/step${stepNumber}`);
  });

  return (
    <>
      <h1 class="text-center">{translator.t('setup.process')}</h1>
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