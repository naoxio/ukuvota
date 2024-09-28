import type { PropFunction } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { DateTimePicker } from '~/components/date-time/date-time-picker';
import { DateTimeSlider } from '~/components/date-time/date-time-slider';
import { component$, QRL } from '@builder.io/qwik';

interface TimeSelectorProps {
  phase: string;
  startMinDate: Date;
  startDate: Date;
  endDate: Date;
  hideTitle?: boolean;
  onTimeChange$?: PropFunction<(phase: string, startDate: Date, endDate: Date) => void> | QRL<(phase: string, startDate: Date, endDate: Date) => Promise<void>>;
}

export const TimeSelector = component$((props: TimeSelectorProps) => {
  const { t } = useTranslator();
  const title = t(`phases.${props.phase}.title`);
  
  // Calculate the duration in minutes
  const duration = (props.endDate.getTime() - props.startDate.getTime()) / (1000 * 60);

  return (
    <div class="time-selector" data-phase={props.phase}>
      {!props.hideTitle && (
        <h3 class="title">{title}</h3>
      )}
      <br />
      <DateTimePicker
        index={0}
        date={props.startDate}
        min={props.startMinDate}
        id={`start-date-picker-${props.phase}`}
        onChange$={(newDate) => props.onTimeChange$?.(props.phase, newDate, props.endDate)}
      />
      <br />
      <DateTimePicker
        index={1}
        date={props.endDate}
        min={props.startDate}
        id={`end-date-picker-${props.phase}`}
        onChange$={(newDate) => props.onTimeChange$?.(props.phase, props.startDate, newDate)}
      />
      <br />
      <DateTimeSlider
        duration={duration}
        id={`datetime-slider-${props.phase}`}
        onChange$={(newDuration) => {
          const newEndDate = new Date(props.startDate.getTime() + newDuration * 60 * 1000);
          props.onTimeChange$?.(props.phase, props.startDate, newEndDate);
        }}
      />
      <br />
    </div>
  );
});