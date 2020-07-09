/* istanbul ignore file */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('../api');
const { errorMiddleware } = require('../middlewares/error');
const middlewareMonitoring = require('../middlewares/monitoring');

/**
* Express instance
* @public
*/
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Monitoring
app.use(middlewareMonitoring);

//Health status
const healthRoute = express.Router();
healthRoute.get('/health', (req, res) => res.send('OK'));
app.use('/', healthRoute);

// mount api routes
app.use('/api', api);

// if error is not an instanceOf APIError, convert it.
app.use(errorMiddleware.converter);

// catch 404 and forward to error handler
app.use(errorMiddleware.notFound);

// error handler, send stacktrace only during development
app.use(errorMiddleware.handler);

module.exports = app;
