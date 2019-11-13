process.env.NODE_ENV = 'dev';
var NodeEnviRonment = '.env.'+process.env.NODE_ENV;

import dotenv from 'dotenv';
dotenv.config({path: NodeEnviRonment});

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import validator from 'express-validator';
import session from 'express-session';
import flash from 'express-flash';
import helmet from 'helmet';

import "babel-polyfill";

// environment variables
process.env.NODE_ENV = 'development';

// uncomment below line to test this code against staging environment
// process.env.NODE_ENV = 'staging';

// config variables
import config from './config/config.js';
// import mysqlcon from './config/MySQL';

// middlewares
import ErrorHandler from './app/middlewares/ErrorHandler'
import CrossOrigin from './app/middlewares/CrossOrigin'

const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
process.env.TZ = process.env.SERVER_TIMEZONE;

// view engine setup
app.set('views', path.join(__dirname, 'resources/views'));

/**
 * app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts') }));
 * app.set('view engine', 'hbs');
 */
app.set('view engine', 'ejs');



const middlewares = [
	validator(),
	session({
		secret: 'super-secret-key',
		key: 'super-secret-cookie',
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 60000 }
	}),
	flash(),
	helmet()
]

//app.use(layout());
app.use(logger('dev'));

/**
 * app.use(express.json());
 * app.use(express.urlencoded({ extended: false }));
 */

app.use(cookieParser());

app.use(middlewares);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'storage/uploads')));

/** 
 * bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
}));

/**
 * bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json({limit: '50mb'}));

/**
 * parse application/vnd.api+json as json
 */
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(CrossOrigin);

// Routing
import routes from './routes';

app.use('/', routes);

// error handler
app.use(ErrorHandler);

module.exports = app;