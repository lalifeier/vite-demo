# build stage
FROM node:lts-alpine AS build-stage

# RUN npm install -g yarn
RUN yarn config set registry https://registry.npm.taobao.org

WORKDIR /app

COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

# production stage
FROM nginx:stable-alpine AS production-stage
LABEL MAINTAINER="lalifeier@gmail.com"

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
