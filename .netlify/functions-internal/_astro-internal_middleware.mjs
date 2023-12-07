import 'kleur/colors';
import './chunks/astro_fCW-vF1L.mjs';
import 'clsx';
import 'cookie';
import '@astrojs/internal-helpers/path';
import { y as ys } from './chunks/pages/donate_1vqIitFd.mjs';

function sequence(...handlers) {
  const filtered = handlers.filter((h) => !!h);
  const length = filtered.length;
  if (!length) {
    const handler = defineMiddleware((context, next) => {
      return next();
    });
    return handler;
  }
  return defineMiddleware((context, next) => {
    return applyHandle(0, context);
    function applyHandle(i, handleContext) {
      const handle = filtered[i];
      const result = handle(handleContext, async () => {
        if (i < length - 1) {
          return applyHandle(i + 1, handleContext);
        } else {
          return next();
        }
      });
      return result;
    }
  });
}

function defineMiddleware(fn) {
  return fn;
}

const astroI18n = ys(
  void 0,
  void 0
);
const onRequest$1 = sequence(astroI18n);

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
