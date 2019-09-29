FROM node:10.16.3-alpine AS builder
WORKDIR /var/www/car-booking-v2
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /var/www/car-booking-v2/build /usr/share/nginx/html
