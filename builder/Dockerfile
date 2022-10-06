FROM node:16 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install 

COPY ./public ./public
COPY ./src ./src

RUN npm run build

FROM nginx:1.23

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]