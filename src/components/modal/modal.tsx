import { component$, Slot, useSignal, $ } from '@builder.io/qwik';
import { LuInfo, LuX } from '@qwikest/icons/lucide';
import './modal.css';

interface Props {
  id: string;
  icon?: 'info' | 'custom';
  btn?: string;
}

export default component$((props: Props) => {
  const { id, icon = 'info', btn } = props;
  const isOpen = useSignal(false);
  const IconComponent = icon === 'info' ? LuInfo : LuInfo; // Default to info icon if custom is not provided

  const openModal = $(() => {
    isOpen.value = true;
  });

  const closeModal = $(() => {
    isOpen.value = false;
  });

  const handleOutsideClick = $((event: Event) => {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      closeModal();
    }
  });

  return (
    <>
      {btn ? (
        <button class="btn btn-sm" onClick$={openModal}>
          {btn}
        </button>
      ) : (
        <button class="btn btn-ghost btn-sm btn-circle" onClick$={openModal}>
          <IconComponent width={22} height={22} />
        </button>
      )}
      {isOpen.value && (
        <div class="modal-overlay" onClick$={handleOutsideClick}>
          <div class="modal-content" onClick$={(e) => e.stopPropagation()}>
            <button class="btn btn-sm btn-circle close-btn" onClick$={closeModal}>
              <LuX width={22} height={22} />
            </button>
            <Slot />
          </div>
        </div>
      )}
    </>
  );
});