FROM node:boron
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6 \
    && echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.4 main" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list \
    && apt-get update \
    && apt-get install -y mongodb-org --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
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
CMD [ "npm", "run", "start" ]