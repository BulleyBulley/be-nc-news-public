const apiRouter = require('./routes/api-router.js');
const express = require('express');
const app = express();
const { handle500Errors, handleCustomErrors, handlePSQL400Errors } = require('./errors/errors.js')
app.use(express.json());

app.use('/api', apiRouter);

app.use(handlePSQL400Errors)
app.use(handleCustomErrors);
app.use(handle500Errors);

app.all('*', (req, res) => {
  //console.log('Got all the way down here........')
    res.status(404).send({ msg: 'Invalid URL' })
  })

module.exports = app;