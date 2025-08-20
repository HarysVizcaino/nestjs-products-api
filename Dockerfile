FROM node:20-alpine

WORKDIR /app


RUN apk add --no-cache postgresql-client

COPY package*.json ./
RUN npm ci

COPY . .


COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN npm run build

EXPOSE 3000


ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]


CMD ["npm", "run", "start:prod"]