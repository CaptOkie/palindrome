FROM alpine
RUN apk update \
    && apk add nodejs \
    && mkdir -p /usr/src/palindrome
COPY . /usr/src/palindrome
RUN cd /usr/src/palindrome/common \
    && npm install \
    && cd /usr/src/palindrome/browser \
    && npm install \
    && npm run build \
    && cd /usr/src/palindrome/server \
    && npm install \
    && rm -rf /usr/src/palindrome/browser
EXPOSE 3000
WORKDIR /usr/src/palindrome/server
CMD CONFIG=docker npm run start