FROM node:14.5
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3030
CMD [ "node", "index.js" ]