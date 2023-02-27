
<script lang="ts" setup>
import { theme as userTheme } from '../../stores/userStore'

userTheme.set(window.localStorage.getItem("theme") || 'light')

const toggleTheme = () => {
  let theme = window.localStorage.getItem("theme")  
  theme = theme === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme
  document.documentElement.className = theme

  window.localStorage.setItem("theme", theme)
  userTheme.set(theme)
}

</script>
<template>
  <button @click="toggleTheme()" class="btn btn-ghost btn-sm">
    <slot/>
  </button>
</template>
