FROM node:8
WORKDIR /app/server
COPY package*.json ./

COPY . .
RUN npm install
EXPOSE 38380

CMD ["npm","start"]
