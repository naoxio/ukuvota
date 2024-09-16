import { component$, Slot } from '@builder.io/qwik';
import { LuInfo, LuX } from '@qwikest/icons/lucide';

interface Props {
  id: string;
  icon?: 'info' | 'custom'; 
  btn?: string;
}

export default component$((props: Props) => {
  const { id, icon = 'info', btn } = props;

  const IconComponent = icon === 'info' ? LuInfo : LuInfo; // Default to info icon if custom is not provided

  return (
    <>
      {btn ? (
        <button class="btn btn-sm">
          <label for={id}>{btn}</label>
        </button>
      ) : (
        <label for={id} class="btn btn-ghost btn-sm btn-circle">
          <IconComponent width={22} height={22} />
        </label>
      )}

      <input type="checkbox" id={id} class="modal-toggle" />
      <label for={id} class="modal cursor-pointer">
        <label class="modal-box relative" for="">
          <label for={id} class="btn btn-sm btn-circle absolute right-2 top-2">
            <LuX width={22} height={22} />
          </label>
          <Slot />
        </label>
      </label>
    </>
  );
});