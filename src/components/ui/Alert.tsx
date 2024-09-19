import { component$, Slot, useSignal, useTask$, $ } from '@builder.io/qwik';
import { LuInformation, LuAlertCircle, LuAlertTriangle, LuCheckCircle } from '@qwikest/icons/lucide';

interface Props {
  error?: boolean;
  success?: boolean;
  warning?: boolean;
  info?: boolean;
  icon: string;
}

export default component$((props: Props) => {
  const { error, success, warning, info, icon } = props;
  const visible = useSignal(false);
  const showAlertId = `show-alert-${Math.random().toString(36).slice(2, 11)}`;

  const classList = `alert flex w-80 shadow-lg m-2 cursor-pointer ${
    error ? 'alert-error' : success ? 'alert-success' : warning ? 'alert-warning' : info ? 'alert-info' : ''
  }`;

  useTask$(() => {
    visible.value = true;
  });

  const handleClick$ = $(() => {
    visible.value = false;
  });

  const IconComponent = () => {
    switch (icon) {
      case 'information':
        return <LuInformation width={32} height={32} />;
      case 'alert-circle':
        return <LuAlertCircle width={32} height={32} />;
      case 'alert-triangle':
        return <LuAlertTriangle width={32} height={32} />;
      case 'check-circle':
        return <LuCheckCircle width={32} height={32} />;
      default:
        return <LuInformation width={32} height={32} />;
    }
  };

  return (
    <div
      id={showAlertId}
      class={classList}
      style={{ display: visible.value ? 'flex' : 'none', pointerEvents: 'auto' }}
      onClick$={handleClick$}
    >
      <IconComponent />
      <span>
        <Slot />
      </span>
    </div>
  );
});