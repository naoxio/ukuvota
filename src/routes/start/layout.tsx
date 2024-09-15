import { component$, Slot, useStyles$, useStore } from '@builder.io/qwik';
import { useLocation, Form } from '@builder.io/qwik-city';
import BaseLayout from '@layouts/BaseLayout';
import type { ProcessCookie } from '@utils/parseProcessCookie';
import { parseProcessCookie } from '@utils/parseProcessCookie';
import { Translator } from '@utils/i18n';

export interface CreateProcessLayoutProps {
  step: number;
}

export default component$((props: CreateProcessLayoutProps) => {
  const translator = new Translator('en'); // Replace with your locale logic

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
  const processCookie = useStore<ProcessCookie>(parseProcessCookie(location.url.searchParams.get('process') || ''));

  const steps = [
    { stepNumber: 1, disabled: false },
    { stepNumber: 2, disabled: (!processCookie.title || !processCookie.phase) },
    { stepNumber: 3, disabled: (!processCookie.title || !processCookie.phase || !processCookie.endVotingDate) }
  ];

  return (
    <BaseLayout title={translator.t('setup.process')} description={translator.t('description')}>
      <h1 class="text-center">{translator.t('setup.process')}</h1>
      <div class="flex justify-center space-x-2 m-2">
        {steps.map(({ stepNumber, disabled }) => (
          <Form key={stepNumber} action="/api/update-step" method="POST">
            <input type="hidden" name="step" value={stepNumber} />
            <button 
              type="submit" 
              class={`w-4 h-4 rounded-full ${
                props.step === stepNumber ? 'ring-bg ring brown-ring ring-2' : 
                props.step > stepNumber ? 'ring-bg' : 
                'bg-gray-300'
              } ${disabled ? 'bg-gray-500 pointer-events-none' : ''}`} 
              disabled={disabled}
            ></button>
          </Form>
        ))}
      </div>
      <Slot />
    </BaseLayout>
  );
});