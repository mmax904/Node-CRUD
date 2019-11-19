import uuid from 'uuid';
import bcrypt from 'bcryptjs';
import  {responseHelper, logger}  from '../app/common';

export class UserDbHelper{

    constructor(mySqlWrapper){
        this.sqlWrapper = mySqlWrapper;
        this.logger = new logger();
        this.responsehelper = new responseHelper;
    }

    registerUser(username,password){     
        return new Promise((resolve,reject)=>{
            let self = this;
            bcrypt.genSalt(10).then((salt,err)=>{
                if(err){
                    this.logger.logError(err,'registerUser');
                    reject(err);
                }

                bcrypt.hash(password,salt).then((hash,err)=>{
                    if(err){
                        this.logger.logError(err,'registerUser');
                        reject(err);
                    }
                    let query = `insert into users(id, username, password) value('${uuid.v4()}', '${username}','${hash}');`
                    resolve(self.sqlWrapper.query(query));
                });
            }).catch(err=>{
                this.logger.logError(err,'registerUser');
            });
        });
    }


    isAuthenticated(username,password){
        return new Promise((resolve, reject)=>{
            this.logger.logToConsole(username,'isAuthenticated');
            let query = `select * from users where username ='${username}';`;
            let self = this;
            this.sqlWrapper.query(query).then((result,err)=>{
                if(err){
                    self.logger.logError(err,'isAuthenticated:sqlWrapper');
                    reject(err);
                }
                let user = JSON.parse(result.results);
                
                //compare password
                bcrypt.compare(password,user[0].password).then((result,err)=>{
                    if(err){
                        self.logger.logError(err,'isAuthenticated:bcrypt');
                        reject(err);
                    }
                    resolve(user[0]);
                }).catch(ex=>{
                    self.logger.logError(err,'isAuthenticated:bcrypt>catch');
                    reject(ex);
                });
                
            }).catch(ex=>{
                self.logger.logError(ex,'isAuthenticated:main>catch');
                var obj = this.responsehelper.rejectReponse(ex,null);
                console.log(obj);
                reject(obj);
            });
        });
    }
}