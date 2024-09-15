import { component$, Slot } from '@builder.io/qwik';
import { QwikIcon } from 'path-to-qwik-icon-component'; // You'll need to implement or find a Qwik-compatible icon component

interface Props {
  id: string;
  icon?: string;
  btn?: string;
}

export default component$((props: Props) => {
  const { id, icon = "information", btn } = props;

  return (
    <>
      {btn ? (
        <button class="btn btn-sm">
          <label for={id}>{btn}</label>
        </button>
      ) : (
        <label for={id} class="btn btn-ghost btn-sm btn-circle">
          <QwikIcon width={22} name={icon} />
        </label>
      )}

      <input type="checkbox" id={id} class="modal-toggle" />
      <label for={id} class="modal">
        <label class="modal-box">
          <label for={id} class="btn btn-sm btn-circle absolute right-2 top-2">
            <QwikIcon width={22} name="close" />
          </label>
          <Slot />
        </label>
      </label>
    </>
  );
});