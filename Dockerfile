FROM node:18-alpine
ENV NODE_ENV production
WORKDIR /code_front/

COPY public/ /code_front/public
COPY src/ /code_front/src
COPY package.json /code_front/
COPY package-lock.json /code_front/

RUN npm install && npm install -g serve && npm run build

CMD ["serve", "-s", "build"]