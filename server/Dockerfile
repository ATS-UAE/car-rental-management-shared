FROM node:10.16.3-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install -g typescript
RUN npm install
COPY . .
RUN tsc -p tsconfig.json || true
EXPOSE 5000
CMD ["npm", "run", "start"]