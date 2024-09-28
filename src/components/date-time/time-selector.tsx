import { component$, useSignal, $ } from '@builder.io/qwik';
import type { PropFunction, QRL } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { DateTimePicker } from '~/components/date-time/date-time-picker';
import { DateTimeSlider } from '~/components/date-time/date-time-slider';

interface TimeSelectorProps {
  phase: string;
  startMinDate: number;
  startDate: number; 
  endDate: number; 
  timezone: string;
  hideTitle?: boolean;
  onTimeChange$?: PropFunction<(phase: string, startDate: number, endDate: number) => void> | QRL<(phase: string, startDate: number, endDate: number) => Promise<void>>;
}

export const TimeSelector = component$((props: TimeSelectorProps) => {
  const { t } = useTranslator();
  const title = t(`phases.${props.phase}.title`);
  
  const startDateSignal = useSignal(props.startDate);
  const endDateSignal = useSignal(props.endDate);

  const handleStartDateChange = $((newDateMillis: number) => {
    startDateSignal.value = newDateMillis;
    props.onTimeChange$?.(props.phase, newDateMillis, endDateSignal.value);
  });

  const handleEndDateChange = $((newDateMillis: number) => {
    endDateSignal.value = newDateMillis;
    props.onTimeChange$?.(props.phase, startDateSignal.value, newDateMillis);
  });

  const handleSliderChange = $((newDuration: number) => {
    const newEndDateMillis = startDateSignal.value + newDuration * 60 * 1000;
    endDateSignal.value = newEndDateMillis;
    props.onTimeChange$?.(props.phase, startDateSignal.value, newEndDateMillis);
  });

  return (
    <div class="time-selector" data-phase={props.phase}>
      {!props.hideTitle && (
        <h3 class="title">{title}</h3>
      )}
      <br />
      <DateTimePicker
        index={0}
        date={startDateSignal.value}
        min={props.startMinDate}
        timezone={props.timezone}
        id={`start-date-picker-${props.phase}`}
        onChange$={handleStartDateChange}
      />
      <br />
      <DateTimePicker
        index={1}
        date={endDateSignal.value}
        min={startDateSignal.value}
        timezone={props.timezone}
        id={`end-date-picker-${props.phase}`}
        onChange$={handleEndDateChange}
      />
      <br />
      <DateTimeSlider
        duration={(endDateSignal.value - startDateSignal.value) / (1000 * 60)}
        id={`datetime-slider-${props.phase}`}
        onChange$={handleSliderChange}
      />
      <br />
    </div>
  );
});