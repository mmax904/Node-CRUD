import connection from '../config/MySQL';
import {} from  'dotenv/config';
import dotenv from 'dotenv';

let NodeEnviRonment = '.env.'+process.env.NODE_ENV;
dotenv.config({path: NodeEnviRonment});

export class MySQlWrapper {

    constructor(){
        /**
         * this.connection = mysql.createConnection({
         *      host:process.env.db_host,
         *      user:process.env.db_user,
         *      password:process.env.db_password,
         *      database:process.env.db_database
         * });
         */
        this.connection = connection;
    }

    query(queryString){
        return  new Promise((resolve,reject)=>{
            try {
                var self = this;
                this.connection.query(queryString,function(error,results,fields){
                    if(error){
                        console.log('err',error);
                        reject(self.createResponseObject(error,null));
                    }
                    resolve(self.createResponseObject(error,results));
                });    
            } catch(ex) {
                console.log('ex',ex);
                reject(self.createResponseObject(ex,null));
            }           
            
        });
    }

    close(){
        return new Promise((resolve,reject)=>{
            this.connection.end( err =>{
                if(err){
                    return reject(err);
                }
                resolve();
            });
        });
        
    }

    createResponseObject(error,results) {
        return {
            error: error,
            results: results === undefined ? null : results === null ? null : JSON.stringify(results)
        }
    }

}
