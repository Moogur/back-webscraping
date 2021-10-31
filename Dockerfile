# First stage to build
FROM mhart/alpine-node:14.17 as builder

WORKDIR /usr/src

COPY . .

RUN npm ci \
  && npm run build:webpack

COPY . .

RUN npm ci --production

# Second stage to run
FROM mhart/alpine-node:slim-14.17

WORKDIR /usr/app

COPY --from=builder /usr/src/node_modules /usr/app/node_modules
COPY --from=builder /usr/src/dist/server.js /usr/app/dist

ENTRYPOINT ["/usr/app"]

CMD ["node", "dist/server"]
