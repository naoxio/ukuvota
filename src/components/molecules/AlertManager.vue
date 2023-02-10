<template>
    <div class="z-50 fixed top-0 left-0 items-center w-full h-0 flex flex-col ">
        <slot/>
    </div>
</template>
<style>
    .alert-list {
      top: 2rem;
      left: 0;
      right: 0;
      z-index: 1000;
    }
</style>