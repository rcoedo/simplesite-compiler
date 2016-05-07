FROM node:6.0.0
MAINTAINER "Roman Coedo" <romancoedo@gmail.com>
RUN mkdir /node && mkdir /app
WORKDIR /node
ADD resources/package.json /node/
RUN npm install && npm install -g gulp
ADD resources/gulpfile.babel.js /node/
ADD resources/babelrc /node/.babelrc
#CMD ["gulp", "build"]
ENTRYPOINT ["/bin/bash", "-c"]
