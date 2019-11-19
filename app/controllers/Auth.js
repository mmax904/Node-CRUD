const Auth = {
    /**
     * 
     * @param {object} req 
     * @param {object} res
     * @returns {object} user object 
     */
    signIn(req, res) {
        // if (!req.body.success && !req.body.lowPoint && !req.body.takeAway) {
        //     return res.status(400).send({'message': 'All fields are required'})
        // }
        return res.status(200).send({'user':'login'});
    },
}

export default Auth;