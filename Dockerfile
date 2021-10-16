# First stage to build
FROM node:14.17.0 as builder
RUN mkdir -p /usr/src && chown -R node:node /usr/src

USER node
WORKDIR /usr/src

COPY . .

RUN npm ci \
  && npm run build

# Second stage to run
FROM node:14.17.0-alpine
RUN mkdir -p /usr/app && chown -R node:node /usr/app

USER node
WORKDIR /usr/app

COPY --from=builder /usr/src/dist ./

ENTRYPOINT ["/usr/app"]

CMD ["node", "main"]
