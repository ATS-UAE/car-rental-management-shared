FROM node:10-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install -g typescript
RUN npm install
COPY . .
RUN tsc -p tsconfig.json
EXPOSE 5000
CMD ["npm", "run", "start"]