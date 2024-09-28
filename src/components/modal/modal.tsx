import { component$, Slot, useSignal, $ } from '@builder.io/qwik';
import { LuInfo, LuX } from '@qwikest/icons/lucide';
import './modal.css';

interface Props {
  id: string;
  icon?: 'info' | 'custom';
  btn?: string;
}

export default component$((props: Props) => {
  const { id, icon, btn } = props;
  const isOpen = useSignal(false);
  
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
      ) : icon ? (
        <button class="btn btn-ghost btn-sm btn-circle" onClick$={openModal}>
          <LuInfo width={22} height={22} />
        </button>
      ) : null}
      
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