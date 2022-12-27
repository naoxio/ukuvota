FROM node:18

RUN     mkdir /app
WORKDIR /app
ADD     astro.config.mjs package.json package-lock.json /app/
ADD     tailwind.config.cjs astro.i18n.config.ts /app/
ADD     api /app/api
ADD     public /app/public
ADD     src /app/src
RUN     npm install
RUN     npm run build

CMD     npm start
