import express from 'express';

class AuthRoutes {

    constructor(strategy,userHelper){
        this.strategy = strategy;
        this.userHelper = userHelper;
        this.router = express.Router();
    }

    routes() {
        this.router.post('/login',this.strategy.authenticate('local',{session:true}),(req,res) => {
            if(req.user != undefined || req.user != null) {
                res.send(req.user);
            }else{
                res.send("not able to generate the token.username or password incorrect.");
            }
        });
        
        this.router.post('/register',(req,res) => {
            if(req.body !== undefined && req.body !== null){
                this.userHelper.registerUser(req.body.username, req.body.password).then(() => {
                    res.send("user registered successfully.");
                }).catch( ex => {
                    console.log(ex);
                    res.send("not able to generate the token.username or password incorrect.",ex);
                })
            }
        });

        return this.router
    }
}

module.exports = AuthRoutes;