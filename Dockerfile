# this is where docker gets the image from
FROM node:10.16.3

# code executes in the command line INSIDE the docker container
RUN mkdir -p /usr/app

# set your working directory so that . is now /usr/src/app
WORKDIR /usr/app

# this copies everything you need into from local into your docker container to start
COPY ./public /usr/app/public/
COPY ./src /usr/app/src/
COPY ./knexfile.js /usr/app/
COPY ./package*.json /usr/app/
COPY ./tsconfig.json /usr/app/
COPY ./postcss.config.js /usr/app/
COPY ./webpack.config.js /usr/app/

# set up your docker environment with nodemon
RUN npm install -g nodemon
RUN npm ci
RUN npx webpack


# this command defaults to start our node server
# however, our compose file over writes this so we get reloading
# the reason we put this here is so that production would start
CMD ["node", "./src/backend/server.js"]