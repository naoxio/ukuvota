import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import type { PropFunction } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { formatDateInTimezone } from '~/utils/dateUtils';
import { DateTime } from 'luxon';
import './date-time.css';


interface DateTimePickerProps {
  id: string;
  index: number;
  date: number; // milliseconds
  min: number; // milliseconds
  timezone: string;
  onChange$?: PropFunction<(newDate: number) => void>;
}

export const DateTimePicker = component$((props: DateTimePickerProps) => {
  const { t } = useTranslator();
  const formattedDateSignal = useSignal(formatDateInTimezone(props.date, props.timezone));
  const minDateSignal = useSignal(formatDateInTimezone(props.min, props.timezone));

  useVisibleTask$(({ track }) => {
    track(() => props.date);
    track(() => props.min);
    track(() => props.timezone);
    formattedDateSignal.value = formatDateInTimezone(props.date, props.timezone);
    minDateSignal.value = formatDateInTimezone(props.min, props.timezone);
  });

  const handleInputChange = $((e: Event) => {
    const target = e.target as HTMLInputElement;
    formattedDateSignal.value = target.value;
    const newDate = DateTime.fromISO(target.value, { zone: props.timezone });
    if (newDate.isValid) {
      props.onChange$?.(newDate.toMillis());
    }
  });

  return (
    <div id={props.id} class="date-time-picker">
      <label class="date-time-label">
        {props.index === 0
          ? t('phases.startAt')
          : t('phases.endsAt')}
      </label>
      <input
        type="datetime-local"
        min={minDateSignal.value}
        name={props.id}
        value={formattedDateSignal.value}
        onInput$={handleInputChange}
        class="date-time-input"
      />
    </div>
  );
});