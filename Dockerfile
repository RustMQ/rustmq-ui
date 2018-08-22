FROM node:8.11.3

COPY package.json package.json

RUN npm install --silent
RUN npm install react-scripts -g --silent
RUN npm install serve -g --silent
COPY . .
RUN npm run build

CMD serve -p $PORT -s build
