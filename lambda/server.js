require('zone.js/dist/zone-node');
const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');
const appServer = require('../dist-server/main.bundle');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');


function angularRouter(req, res) {

  res.render('../dist/index', { req, res });

}

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());

app.get('/', angularRouter);

app.use(express.static('dist'));

app.engine('html', ngUniversal.ngExpressEngine({
  bootstrap: appServer.AppServerModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', 'dist');

module.exports = app;
