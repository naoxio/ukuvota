<template>
    <div class="alert-manager">
        <div class="alert-list m-0 p-0 flex flex-col items-center">
            <slot/>
        </div>
    </div>
</template>
<style>
    .alert-list {
      position: fixed;
      top: 2rem;
      left: 0;
      right: 0;
      z-index: 1000;
    }
</style>