FROM node:10-alpine
WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm config set registry https://registry.npm.taobao.org

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
