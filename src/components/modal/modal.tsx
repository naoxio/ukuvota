import type { PropFunction } from '@builder.io/qwik';
import { component$, Slot, useSignal, $ } from '@builder.io/qwik';
import { LuInfo, LuX } from '@qwikest/icons/lucide';
import './modal.css';

interface Props {
  id: string;
  icon?: 'info' | 'custom';
  btn?: string;
  isOpen?: boolean;
  onClose?: PropFunction<() => void>;
}

export default component$((props: Props) => {
  const { icon, btn, isOpen: propIsOpen, onClose } = props;
  const internalIsOpen = useSignal(false);

  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen.value;

  const openModal = $(() => {
    if (propIsOpen === undefined) {
      internalIsOpen.value = true;
    }
  });

  const closeModal = $(() => {
    if (propIsOpen === undefined) {
      internalIsOpen.value = false;
    } else if (onClose) {
      onClose();
    }
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
      {isOpen && (
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