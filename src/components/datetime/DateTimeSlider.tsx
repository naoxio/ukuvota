import { $, component$, useStore, useTask$ } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { durationToSlider } from '~/utils/logslider';

interface DateTimeSliderProps {
  id: string;
  duration: number;
}

export const DateTimeSlider = component$((props: DateTimeSliderProps) => {
  const { t } =useTranslator();
  
  const state = useStore({
    sliderValue: durationToSlider(props.duration),
    durationText: '',
  });

  const updateDurationText = $(
    (value: number) => {
       state.durationText = `${value} ${t('setup.unit')}`; // Assuming 'setup.unit' is a key for unit text
     }
  );

  // Use useTask$ to handle side effects
  useTask$(() => {
    updateDurationText(state.sliderValue);
  });


  const handleSliderChange = $((event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    state.sliderValue = Number(target.value);
    updateDurationText(state.sliderValue);
  });

  return (
    <div id={props.id}>
      <span>{t('setup.duration')}:&nbsp;</span>
      <span class="duration-display" style={{ color: 'green' }}>{state.durationText}</span>
      <br />
      <input
        type="range"
        min="1"
        max="165"
        class="range"
        name={props.id}
        value={state.sliderValue}
        onInput$={handleSliderChange}
      />
    </div>
  );
});
