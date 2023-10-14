FROM node:19.7.0-alpine
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
CMD ["sh", "-c", "npm run build && npm run preview"]