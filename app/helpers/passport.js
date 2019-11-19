import passport from 'passport';
import passportlocal from 'passport-local';
import bearerStrategy from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import {UserDbHelper, AccessTokenHelper} from '../../db';
import {logger} from '../common';
const secret = process.env.PASSPORT_SECRET;

export default class PassportConfig {

    constructor(mySQlwrapper){
        this.userHelper = new UserDbHelper(mySQlwrapper);
        this.tokenHelper = new AccessTokenHelper(mySQlwrapper);
        this.logger = new logger();
    }

    getToken(user) {
        return jwt.sign({'user':user},secret);
    }

    SetStaregy() {
        const _localStaregy = passportlocal.Strategy;
        const _bearerStrategy = bearerStrategy.Strategy;
        
        var options = { // not required
            passReqToCallback: true // default false
        };

        passport.use(new _localStaregy(options,(req,username,password,done)=>{
            this.userHelper.isAuthenticated(username,password).then(result=>{
                var user = {username:result.username, id:result.id};                
                var res = {user: user, token:this.getToken(user)};
                this.tokenHelper.saveAccessToken(res).then((response,err)=>{
                    if(err){
                        this.logger.logError(ex,'SetStrategy');        
                    }
                    done(null,res);
                });
                
            }).catch(ex=>{
                this.logger.logError(ex,'SetStrategy');
                done(null,ex);
            });
        }));

        passport.use(new _bearerStrategy((token,done)=>{
            try {
                //decoding token and access user information from there.let  {user} = jwt.decode(token,secret);
                // checking token validity with database. we can make it time based also but here we are just checking// whether this token exist in database or not.this.tokenHelper.getUserIDFromBearerToken(token).then(x=>{// after successful validation we are sending request to callback.
                let  id = jwt.decode(token,secret);
                this.tokenHelper.getUserIDFromBearerToken(token).then(x => {
                    done(null, {id});
                }).catch(ex => {
                    done(ex,false);
                });   
            } catch(error) {
                console.log(error);
                done(error,false);
            }
        }));

        passport.serializeUser(function(user, done) {
            console.log('serializeUser');
            console.log(user);
            done(null, user); 
        });
        
        passport.deserializeUser(function(user, done) {
            console.log('deserializeUser');
            console.log(user);
            done(null, user);
        });

        return passport;
    }
}

