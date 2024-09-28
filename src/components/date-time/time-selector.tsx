import { component$ } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { DateTimePicker } from '~/components/date-time/date-time-picker';
import { DateTimeSlider } from '~/components/date-time/date-time-slider';

interface TimeSelectorProps {
  phase: string;
  startMinDate: Date;
  startDate: Date;
  endDate: Date;
  hideTitle?: boolean;
}

export const TimeSelector = component$((props: TimeSelectorProps) => {
  const { t } =useTranslator();
  
  const title = t(`phases.${props.phase}.title`);

  // Calculate the duration in minutes
  const duration = (new Date(props.endDate).getTime() - new Date(props.startDate).getTime()) / 1000 / 60;

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
      />
      <br />
      <DateTimePicker
        index={1}
        date={props.endDate}
        min={props.startDate}
        id={`end-date-picker-${props.phase}`}
      />
      <br />
      <DateTimeSlider
        duration={duration}
        id={`datetime-slider-${props.phase}`}
      />
      <br />
    </div>
  );
});
