FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm install -g typescript
RUN tsc -p tsconfig.json
EXPOSE 5000
CMD ["npm", "run", "start"]