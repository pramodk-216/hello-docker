from node:20-alpine

ENV BACKEND_URL=http://127.0.0.1:8000

WORKDIR /app

ADD . /app

RUN npm install

ENTRYPOINT ["node"]

CMD ["app.js"]