import { component$, useVisibleTask$, useStore } from '@builder.io/qwik';
import { useTranslator } from '~/utils/i18n';
import { formatDuration } from '~/utils/dateUtils';

interface CountdownProps {
  dates: number[];
  type: string;
  timezone?: string;
}

export const Countdown = component$((props: CountdownProps) => {
  const translator = useTranslator();
  
  const state = useStore({
    targetDate: new Date(props.dates[1]).getTime(),
    currentDate: Date.now(),
    duration: '',
    doneText: translator.t('done'),
    statusClass: '',
  });

  const updateCountdown = () => {
    state.currentDate = Date.now();
    const diff = state.targetDate - state.currentDate;

    if (diff > 0) {
      state.duration = formatDuration(diff / 1000);

      if (props.type === 'warning' && diff > 300000) {
        state.statusClass = 'link-warning';
      } else if (props.type === 'warning' && diff <= 300000) {
        state.statusClass = 'text-error';
      } else if (props.type === 'success') {
        state.statusClass = 'link-success';
      }
    } else {
      state.duration = state.doneText;
      state.statusClass = 'text-info';
    }
  };

  useVisibleTask$(() => {
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div class={`countdown ${state.statusClass}`}>
      <span id="count">{state.duration}</span>
    </div>
  );
});
