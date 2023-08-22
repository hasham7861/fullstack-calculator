FROM node:19.7.0
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]