import express from 'express';
import createError from 'http-errors';

// Web routes
import webRouter from './web';
// API routes
import apiRouter from './api';

var router = express.Router();

router.use('/api/v1', apiRouter);
router.use('/', webRouter);

// catch 404 and forward to error handler
router.use(function(req, res, next) {
    next(createError(404));
});

module.exports = router;