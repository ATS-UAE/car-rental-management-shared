FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install --no-package-lock
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "start"]