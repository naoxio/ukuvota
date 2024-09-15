import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>
      <style>{`
        .alert-list {
          position: fixed;
          top: 2rem;
          left: 0;
          right: 0;
          pointer-events: none;
        }
      `}</style>
      <div class="alert-list m-0 p-0 flex flex-col items-center">
        <Slot />
      </div>
    </>
  );
});