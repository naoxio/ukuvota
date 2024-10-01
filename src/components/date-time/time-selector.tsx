import { component$, useSignal, $, useTask$ } from '@builder.io/qwik';
import type { PropFunction } from '@builder.io/qwik';
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
  onTimeChange$?: PropFunction<(phase: string, startDate: number, endDate: number) => void>;
}

export const TimeSelector = component$((props: TimeSelectorProps) => {
  const { t } = useTranslator();
  const title = t(`phases.${props.phase}.title`);
  const startDateSignal = useSignal(props.startDate);
  const endDateSignal = useSignal(props.endDate);
  const durationSignal = useSignal((props.endDate - props.startDate) / 1000);

  useTask$(({ track }) => {
    track(() => props.startDate);
    track(() => props.endDate);
    startDateSignal.value = props.startDate;
    endDateSignal.value = props.endDate;
    durationSignal.value = (props.endDate - props.startDate) / 1000;
  });

  const handleStartDateChange = $((newDateMillis: number) => {
    startDateSignal.value = newDateMillis;
    durationSignal.value = (endDateSignal.value - newDateMillis) / 1000;
    props.onTimeChange$?.(props.phase, newDateMillis, endDateSignal.value);
  });

  const handleEndDateChange = $((newDateMillis: number) => {
    endDateSignal.value = newDateMillis;
    durationSignal.value = (newDateMillis - startDateSignal.value) / 1000;
    props.onTimeChange$?.(props.phase, startDateSignal.value, newDateMillis);
  });

  const handleSliderChange = $((newDuration: number) => {
    const newEndDateMillis = startDateSignal.value + newDuration * 1000;
    endDateSignal.value = newEndDateMillis;
    durationSignal.value = newDuration;
    props.onTimeChange$?.(props.phase, startDateSignal.value, newEndDateMillis);
  });

  return (
    <div class="time-selector" data-phase={props.phase}>
      {!props.hideTitle && <h3 class="title">{title}</h3>}
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
        duration={durationSignal.value}
        id={`datetime-slider-${props.phase}`}
        onDurationChange$={handleSliderChange}
      />
      <br />
    </div>
  );
});