const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const api = require('../api');

module.exports = app => {
  app.use(logger(process.env.MODE === 'production' ? 'tiny' : 'dev'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(`${__dirname}/../../public`));

  // // CORS
  // app.use((req, res, next) => {
  // 	res.setHeader('Access-Control-Allow-Origin', req.headers && req.headers.origin ? req.headers.origin : '*');
  // 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // 	res.setHeader('Access-Control-Allow-Credentials', true);

  // 	if (req.method === 'OPTIONS') {
  //     return res.send(200);
  //   }

  // 	next();
  // });

  app.use('/api', api);

  app.get('*', (req, res) => {
    return fs.createReadStream(`${__dirname}/../../public/html/index.html`).pipe(res);
  });
};