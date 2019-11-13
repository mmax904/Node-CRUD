const CsrfCheck = (req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
	res.locals.csrfToken = req.csrfToken();
	res.locals.title = 'Express Ejs';
	res.locals.section = '../index';
	next();
}

export default CsrfCheck;