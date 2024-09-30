import { component$ } from "@builder.io/qwik";
import ImgLogo from '~/assets/logo.png?jsx';
import './loading-animation.css';

export default component$(() => {
  return (
    <div class="loading-container">
      <ImgLogo class="loading-logo" alt="Ukuvota Logo" />
    </div>
  );
});
