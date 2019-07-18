FROM node:8.16.0-alpine AS builder
WORKDIR /var/www/car-booking-v2
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./ ./

FROM nginx
COPY --from=builder /var/www/car-booking-v2/build /var/www/car-booking-v2/build
WORKDIR /
COPY ./nginx.conf /etc/nginx/
