'use strict';

require('zone.js/dist/zone-node');

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');

const appServer = require('./dist-server/main.bundle');

function angularRouter(req, res) {

  res.render('index', { req, res });

}

const app = express();

app.get('/', angularRouter);

app.use(express.static(`${__dirname}/dist`));

app.engine('html', ngUniversal.ngExpressEngine({
  aot: true,
  bootstrap: appServer.AppServerModuleNgFactory
}));
app.set('view engine', 'html');
app.set('views', 'dist');

app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`);
});
