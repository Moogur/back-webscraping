# First stage to build
FROM node:14.17.0-alpine as builder

WORKDIR /usr/src

COPY . .

RUN npm ci \
  && npm run build

# Second stage to run
FROM node:14.17.0-alpine

WORKDIR /usr/app

COPY --from=builder /usr/src/dist ./

ENTRYPOINT ["/usr/app"]

CMD ["node", "main"]
