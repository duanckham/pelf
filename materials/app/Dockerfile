FROM debian:buster-20180625

ENV PROJECT_NAME pelf
ENV MODE production

# Point /bin/sh to /bin/bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Create user `$PROJECT_NAME`
RUN useradd -ms /bin/bash $PROJECT_NAME

# Install dependencies
RUN apt-get update -y
RUN apt-get install -y apt-transport-https curl build-essential python git-core

# Set the timezone.
RUN echo "Asia/Shanghai" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

# Install `nvm`, `node`
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

# Install `pm2`
RUN npm install pm2 -g

# Pre-install modules
RUN mkdir /src
WORKDIR /src
COPY project/package.json /src
RUN npm install

# Deploy and Build
ADD project /tmp/project
RUN mv /tmp/project/* /src
RUN npm run build-prd

# Start
CMD MODE=$MODE pm2 start app.json --no-daemon

# Port
EXPOSE 10001