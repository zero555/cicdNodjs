FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json index.ts ./

RUN npm install
RUN npm run-script build

EXPOSE 8081

CMD [ "npm", "start" ]

