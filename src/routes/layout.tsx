import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

// Import your CSS files
import quillSnowCSS from "../assets/quill.snow.css?inline";
import globalCSS from "../assets/global.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  useStyles$(quillSnowCSS);
  useStyles$(globalCSS);

  return (
    <>
      <main>
        <Slot />
      </main>
      <br/>
    </>
  );
});