FROM debian:buster-20180625

ENV PROJECT_NAME pelf
ENV MODE production
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.12.0
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Point /bin/sh to /bin/bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Create user `$PROJECT_NAME`
RUN useradd -ms /bin/bash $PROJECT_NAME

# Install dependencies
RUN apt-get update -y
RUN apt-get install -y apt-transport-https curl build-essential python git-core apt-transport-https

# Set the timezone.
RUN echo "Asia/Shanghai" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

# Install `nvm`, `node`
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# Install `pm2`
RUN npm install pm2 -g

# Deploy and Build
ADD project /home/$PROJECT_NAME/project
WORKDIR /home/$PROJECT_NAME/project
RUN npm install
RUN npm run build-prd

# Start
CMD MODE=$MODE pm2 start app.json --no-daemon

# Port
EXPOSE 10001