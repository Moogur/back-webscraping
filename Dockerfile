# First stage to build
FROM mhart/alpine-node:14.17 as builder

WORKDIR /usr/src

COPY . .

RUN npm ci \
  && npm run build:webpack

# Second stage to run
FROM mhart/alpine-node:slim-14.17

WORKDIR /usr/app

COPY --from=builder /usr/src/dist/main.js \
  /usr/src/node_modules/swagger-ui-dist/favicon* \
  /usr/src/node_modules/swagger-ui-dist/swagger-ui-bundle.js \
  /usr/src/node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js \
  /usr/src/node_modules/swagger-ui-dist/swagger-ui.css \
  /usr/app/

CMD ["node", "main"]
