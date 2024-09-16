import { component$ } from '@builder.io/qwik';
import { useTranslator } from '~/utils/i18n';

// Sample list of timezones; replace with your preferred list or dynamic values
const timezones = Intl.supportedValuesOf('timeZone');

export const TimezoneSelector = component$(() => {
  const translator = useTranslator();

  return (
    <div style={styles.container}>
      <label style={styles.label}>
        {translator.t('setup.timezone')}
      </label>
      <select id="timezone-select" style={styles.select}>
        {timezones.map((timezone: string) => (
          <option value={timezone} key={timezone}>
            {timezone}
          </option>
        ))}
      </select>
    </div>
  );
});

// Define your styles here
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    marginRight: '8px',
    color: '#333',
  },
  select: {
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
};
