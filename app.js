const express = require('express');
const app = express();
const approot = require('app-root-path');
const bodyParser = require('body-parser');
const configfile = require(`${approot}/config/config.json`);
const runmode = configfile.run_mode;
const config = configfile[runmode];
const indexRouter = require('./routes/index');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/', indexRouter);
// app.get('/*', function (req, res) {
//   res.redirect('/chat');
// });

const port = config.API_SERVICE_PORT;
app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});
