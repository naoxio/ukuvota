import { component$, useStore, $ } from '@builder.io/qwik';
import type { PropFunction } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { formatDate } from '~/utils/dateUtils';

interface DateTimePickerProps {
  id: string;
  index: number;
  date: Date;
  min: Date;
  onChange$?: PropFunction<(newDate: Date) => void>;
}

export const DateTimePicker = component$((props: DateTimePickerProps) => {
  const { t } = useTranslator();
  const state = useStore({
    formattedDate: formatDate(props.date.getTime()),
    minDate: formatDate(props.min.getTime())
  });

  const handleInputChange = $((e: Event) => {
    const target = e.target as HTMLInputElement;
    state.formattedDate = target.value;
    const newDate = new Date(target.value);
    props.onChange$?.(newDate);
  });

  return (
    <div id={props.id} class="flex justify-between items-center flex-wrap">
      <h4>
        {props.index === 0
          ? t('phases.startAt')
          : t('phases.endsAt')}
      </h4>
      <input
        type="datetime-local"
        min={state.minDate}
        name={props.id}
        value={state.formattedDate}
        onInput$={handleInputChange}
      />
    </div>
  );
});