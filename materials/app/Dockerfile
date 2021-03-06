FROM debian:latest

ENV PROJECT_NAME app
ENV MODE production

# Point /bin/sh to /bin/bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Create user `$PROJECT_NAME`
RUN useradd -ms /bin/bash $PROJECT_NAME

# Install dependencies
RUN apt-get update -y
RUN apt-get install -y apt-transport-https curl build-essential python git-core

# Set the timezone.
RUN ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

# Install `nvm`, `node`
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs

# Install `pm2`
RUN npm install pm2 -g

# Pre-install modules
RUN mkdir /src
WORKDIR /src
COPY project/package.json /src
RUN npm i

# Deploy and Build
ADD project /tmp/project
RUN mv /tmp/project/* /src
RUN mv /tmp/project/.babelrc /src/.babelrc
RUN npm run build-prd

# Start
CMD MODE=$MODE pm2 start app.json --no-daemon

# Port
EXPOSE 10001