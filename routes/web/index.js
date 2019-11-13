import contactRouter from './contact';
import express from 'express';
import csrf from 'csurf';
import CsrfCheck from '../../app/middlewares/CsrfCheck'
var router = express.Router();

const nonApiStuff = [
	csrf({ cookie: true }),
	CsrfCheck
]

router.use(nonApiStuff);

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('layouts/index', { title: 'Express' });
});

router.use('/contact', contactRouter);

module.exports = router;