FROM node:19

WORKDIR /usr/src


COPY package*.json ./


RUN npm install


COPY . .

CMD ["npm", "run", "dev"]