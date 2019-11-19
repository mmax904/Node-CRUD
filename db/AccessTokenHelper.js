export class AccessTokenHelper {
    constructor(mySqlwarapper){
        this.sqlWrapper = mySqlwarapper;
    }

    saveAccessToken(input) {
        const query = `insert into access_tokens(access_token,user_id) values('${input.token}', '${input.user.id}') ON DUPLICATE KEY UPDATE access_token = "${input.token}"`;
        return this.sqlWrapper.query(query);
    }

    getUserIDFromBearerToken(bearerToken) {
        console.log('input for getUserIDFromBearerToken: ',bearerToken);
        const getUserIDQuery = `SELECT * FROM access_tokens WHERE access_token = '${bearerToken}';`;
        return this.sqlWrapper.query(getUserIDQuery);
    }

}