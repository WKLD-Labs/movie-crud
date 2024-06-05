FROM node:20.12.0-alpine

# Retrieve wait-for-it.sh script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN apk add --no-cache bash && chmod +x /wait-for-it.sh

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

# Wait for DB_HOST:3306 before running the server
CMD /wait-for-it.sh -t 60 $DB_HOST:3306 -- node server.js

# CMD [ "node", "server.js" ]