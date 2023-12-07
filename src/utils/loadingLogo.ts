import logo from '@assets/logo.png';

export function loadingLogo() {
    return `
<style>
  .loading {
    filter: grayscale(100%);
    animation: rotation 2s infinite linear;

  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>
<center> 
  <img src="${logo}" class="loading" width="64px" />
</center>`
}