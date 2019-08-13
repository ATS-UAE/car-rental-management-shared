FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN tsc
EXPOSE 5000
CMD ["npm", "run", "start"]