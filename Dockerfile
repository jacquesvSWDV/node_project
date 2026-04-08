#use node base image
FROM node:22-alpine

#set working directory
WORKDIR /app

#copy package.json contents
COPY package*.json ./

#install dependencies
RUN npm install
RUN npm install -g nodemon

#copy the rest of the application code
COPY . .

#expose the port that nodejs runs on
EXPOSE 3000

#run the application
CMD ["nodemon", "app.js"]