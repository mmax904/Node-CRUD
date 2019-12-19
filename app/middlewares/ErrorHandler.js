const ErrorHandler = (err, req, res, next) => {
	console.log('This is the invalid field ->', err.field)
    // set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
}

export default ErrorHandler;