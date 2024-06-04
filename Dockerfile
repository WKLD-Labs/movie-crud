FROM node:20.14-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY package*.json ./
RUN npm install

COPY --chown=node:node . .

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN apk add --no-cache bash && chmod +x /wait-for-it.sh

CMD /wait-for-it.sh -t 60 $DB_HOST:3306 -- node server.js