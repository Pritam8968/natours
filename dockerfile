FROM node:alpine

WORKDIR /projects/natours

COPY package.json /projects/natours/

COPY pnpm*.yaml /projects/natours/

RUN npm install -g pnpm && pnpm install

COPY . /projects/natours/

CMD ["pnpm", "start"]