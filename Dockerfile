FROM node:8.11.2
EXPOSE 8080
COPY index.js .

RUN npm install

CMD node index.js
