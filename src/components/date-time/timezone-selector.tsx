import { component$ } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import './date-time.css';

const timezones = Intl.supportedValuesOf('timeZone');

export const TimezoneSelector = component$(() => {
  const { t } = useTranslator();

  return (
    <div class="container">
      <label class="label">
        {t('setup.timezone')}
      </label>
      <select id="timezone-select" class="select">
        {timezones.map((timezone: string) => (
          <option value={timezone} key={timezone}>
            {timezone}
          </option>
        ))}
      </select>
    </div>
  );
});
