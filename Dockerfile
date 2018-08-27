# Build image
FROM node:8.11-alpine as build

ARG REACT_APP_API_HOST
ENV REACT_APP_API_HOST ${REACT_APP_API_HOST}

WORKDIR /usr/src/app
COPY ["package.json", "./", "./"]

RUN npm install --silent
RUN npm run build
RUN ls -al

# Final image
FROM node:8.11-alpine
RUN npm install serve -g --silent
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build ./
RUN ls -al
CMD serve -p $PORT
