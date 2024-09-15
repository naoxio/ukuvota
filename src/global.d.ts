import { ClassList } from "@builder.io/qwik";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: { class?: ClassList; 'data-theme'?: string };
      html: { 'data-theme'?: string };
      // Add other elements as needed
    }
  }
}
