FROM node:alpine
WORKDIR /app
RUN npm install -g typescript
COPY ./package.json ./
RUN npm install
COPY . .
RUN tsc
EXPOSE 5000
CMD ["npm", "run", "start"]