import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { format } from 'date-fns-tz';
import { Countdown } from '~/components/datetime/Countdown'; 

interface ProcessTimeLabelProps {
  phase: string;
  dates: number[];
  timezone: string;
  proposals_length?: number;
}

export const ProcessTimeLabel = component$((props: ProcessTimeLabelProps) => {
  const { t } =useTranslator();

  const state = useStore({
    startDateFormatted: '',
    currentDate: Date.now(),
  });

  useVisibleTask$(() => {
    const timezone = props.timezone || 'UTC';
    const startMillis = props.dates[0];
    const start = new Date(startMillis);
    state.startDateFormatted = format(start, 'MMMM d, yyyy h:mm a', { timeZone: timezone });
  });

  return (
    <process-time-label data-start={props.dates[0]} data-timezone={props.timezone}>
      <span>{t(`phases.${props.phase}.title`)}:&nbsp;</span>
      {props.dates[0] > state.currentDate ? (
        <>
          <br />
          <span>{t('phases.start')}:&nbsp;</span>
          <span id="start-date" class="link-success">{state.startDateFormatted}</span>
          <br />
          <span>{t('phases.lastFor')}:&nbsp;</span>
          <Countdown type="success" dates={props.dates} timezone={props.timezone} />
        </>
      ) : props.dates[1] > state.currentDate ? (
        <>
          {props.proposals_length === 0 ? (
            <span class="text-info">{t('skipped')}</span>
          ) : (
            <>
              <Countdown dates={props.dates} type="warning" timezone={props.timezone} />
              <span>&nbsp;({t('remainingTime')})</span>
            </>
          )}
        </>
      ) : (
        <>
          {props.proposals_length === 0 ? (
            <span class="text-info">{t('skipped')}</span>
          ) : (
            <span class="text-info">{t('done')}</span>
          )}
        </>
      )}
      <br />
    </process-time-label>
  );
});
