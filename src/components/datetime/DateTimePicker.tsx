import { component$, useStore } from '@builder.io/qwik';
import { useTranslator } from '~/utils/i18n';
import { formatDate } from '~/utils/dateUtils';

interface DateTimePickerProps {
  id: string;
  index: number;
  date: Date;
  min: Date;
}

export const DateTimePicker = component$((props: DateTimePickerProps) => {
  const translator = useTranslator();

  const state = useStore({
    formattedDate: formatDate(props.date.getTime()),
    minDate: formatDate(props.min.getTime())
  });

  const handleInputChange = (e: any) => {
    state.formattedDate = e.target.value;
  };

  return (
    <div id={props.id} class="flex justify-between items-center flex-wrap">
      <h4>
        {props.index === 0
          ? translator.t('phases.startAt')
          : translator.t('phases.endsAt')}
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
