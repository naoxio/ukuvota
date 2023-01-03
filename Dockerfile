FROM node:18

RUN     mkdir /app
WORKDIR /app
ADD     astro.config.mjs package.json package-lock.json /app/
ADD     tailwind.config.cjs astro-i18next.config.ts tsconfig.json /app/
ADD     server /app/server
ADD     public /app/public
ADD     src /app/src
RUN     npm install
RUN     npm run build

CMD     npm start
