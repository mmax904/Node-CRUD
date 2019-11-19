import dbcon from '../../config/MySQL';
import moment from 'moment';
import uuid from 'uuid';

class User {
    /**
     * class constructor
     * @param {object} data
     */
    constructor() {
        this.table = 'users';
        this.users = [];
    }
    /**
     * 
     * @returns {object} contact object
     */
    store(data) {
        var dbval = [];
        const newUser = {
            id: uuid.v4(),
            username: data.username || '',
            password: data.password || '',
            full_name: data.full_name || '',
            photo: data.files.filename ? this.table+'/'+data.files.filename : '',
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        };

        var dbData = Object.assign({},newUser);
        dbData = Object.values(dbData);
        dbval.push(dbData);

        /** getting table fields from model */
        var db_field = Object.keys(newUser).join(',');

        var sql = `INSERT INTO ${this.table} (${db_field}) values ?`;

       dbcon.query(sql, [dbval], function(err,result) {
            if (err) {
                // console.log(query.sql,'QUERY')
                // console.log(err,'ERROR');
            } else {
                // console.log('No ERROR');
            }
            //process.exit(0);
        });

        this.contacts.push(newUser);
        return newUser
    }
    /**
     * 
     * @param {uuid} id
     * @param {object} data 
     */
    update(id, data, cb) {
        const updatedUser = {
            username: data.username || '',
            photo: data.files.filename ? this.table+'/'+data.files.filename : '',
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        };

        var sql = `UPDATE ${this.table} SET ? WHERE id=?`;

        var query = dbcon.query(sql, [updatedUser,id], function(err,result) {
            if (err) {
                console.log(query.sql,'QUERY')
                // console.log(err,'ERROR');
            } else {
                // console.log('No ERROR');
            }
            //process.exit(0);
        });
        return updatedUser
    }
    /**
     * 
     * @param {uuid} id 
     */
    delete(id, cb) {
        var sql = `DELETE FROM ${this.table} WHERE id = ?`;
        dbcon.query(sql, [id], function (err, list, fields) {
            if (err) {
                cb(false);
            } else {
                cb(true);
            }
        });        
    }
    /**
     * 
     * @param {uuid} id
     * @returns {object} contact object
     */
    findOne(id,cb) {
        var sql = `SELECT * FROM ${this.table} WHERE id=?`;
        dbcon.query(sql,[id], function (err, list, fields) {
            var contact = {};
            if (err) {
                cb(contact);
            } else {
                contact = Object.assign({}, list[0]);
                cb(contact);
            }
        });
    }
    /**
     * @returns {object} returns all contacts
      */
    findAll(cb) {
        var _self = this;
        var sql = `SELECT * FROM ${this.table}`;
        dbcon.query(sql, function (err, list, fields) {
            if (err) {
                cb(_self.contacts);
            } else {
                var ii = list.length;
                _self.contacts = [];
                //console.log(`User Data: ${JSON.stringify(list, undefined, gConfig.json_indentation)}`);
                list.forEach((v,i) => {
                    ii--;
                    v = Object.assign({}, v);
                    _self.contacts.push(v);
                });
                if(ii <= 0){
                    cb(_self.contacts);
                }
            }
        });
    }
    /*setDate() {
        this.setState({
            day : moment().date(),
            month : moment().format('MMM'),
            year : moment().year(),
            weekday : moment().format('dddd')
        });
    }*/
}
export default new User();