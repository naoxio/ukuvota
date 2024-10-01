
// DateTimeSlider.tsx
import { component$, useSignal, useTask$, $ } from '@builder.io/qwik';
import type { PropFunction } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { durationToSlider, sliderToDuration } from '~/utils/logslider';
import { formatDuration } from '~/utils/dateUtils';
import './date-time.css';

interface DateTimeSliderProps {
  id: string;
  duration: number;
  onDurationChange$?: PropFunction<(newDuration: number) => void>;
}

export const DateTimeSlider = component$((props: DateTimeSliderProps) => {
  const { t } = useTranslator();
  const sliderValue = useSignal(durationToSlider(props.duration / 60));
  const durationDisplay = useSignal('');

  useTask$(({ track }) => {
    const duration = track(() => props.duration);
    sliderValue.value = durationToSlider(duration / 60);
    durationDisplay.value = formatDuration(duration);
  });

  const handleSliderChange = $((event: Event) => {
    const value = Number((event.target as HTMLInputElement).value);
    const newDuration = sliderToDuration(value) * 60;
    durationDisplay.value = formatDuration(newDuration);
    props.onDurationChange$?.(newDuration);
  });

  return (
    <div id={props.id} class="duration-slider">
      <div class="duration-label">
        <span>{t('setup.duration')}:&nbsp;</span>
        <span class="duration-display">{durationDisplay.value}</span>
      </div>
      <input
        type="range"
        min="1"
        max="165"
        class="form-range"
        name={props.id}
        value={sliderValue.value}
        onInput$={handleSliderChange}
      />
    </div>
  );
});
