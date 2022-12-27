FROM node:18

RUN     mkdir /app
WORKDIR /app
ADD     astro.config.mjs package.json pnpm-lock.yaml /app/
ADD     tailwind.config.cjs astro.i18n.config.ts /app/
ADD     api /app/api
ADD     public /app/public
ADD     src /app/src
RUN     npm install -g pnpm
RUN     pnpm install
RUN     pnpm build

CMD     pnpm start
