import type { PropFunction} from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import './date-time.css';

const timezones = Intl.supportedValuesOf('timeZone');

interface TimezoneSelectorProps {
  onTimezoneChange$: PropFunction<(newTimezone: string) => Promise<void>>;
  timezone: string;
}

export const TimezoneSelector = component$<TimezoneSelectorProps>(({ onTimezoneChange$, timezone }) => {
  const { t } = useTranslator();

  return (
    <div class="timezone-container">
      <label class="timezone-label">
        {t('setup.timezone')}
      </label>
      <select
        id="timezone-select"
        class="timezone-select"
        value={timezone}
        onChange$={(event) => onTimezoneChange$((event.target as HTMLSelectElement).value)}
      >
        {timezones.map((tz: string) => (
          <option value={tz} key={tz}>
            {tz}
          </option>
        ))}
      </select>
    </div>
  );
});