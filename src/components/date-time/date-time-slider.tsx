
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
  const initialSliderValue = durationToSlider(props.duration / 60); // Convert seconds to minutes
  const sliderValue = useSignal(initialSliderValue);
  const durationDisplay = useSignal('');

  const updateDurationDisplay = $((value: number) => {
    const durationInSeconds = sliderToDuration(value) * 60; // Convert minutes to seconds
    durationDisplay.value = formatDuration(durationInSeconds);
    props.onDurationChange$?.(durationInSeconds);
  });

  useTask$(({ track }) => {
    const value = track(() => sliderValue.value);
    updateDurationDisplay(value);
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
        onInput$={(event) => sliderValue.value = Number((event.target as HTMLInputElement).value)}
      />
    </div>
  );
});
