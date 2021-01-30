FROM node:15.5-alpine

RUN apk update && \
    apk add --update --no-cache --virtual=.build-dependencies g++ && \
    apk add --update python && \
    apk add --update make