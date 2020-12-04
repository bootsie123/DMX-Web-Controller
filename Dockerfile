FROM node:12-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

# Add Tini
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD ["node", "server.js"]

USER node
