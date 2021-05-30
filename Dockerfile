FROM node:14

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["./start.sh"]
EXPOSE 80