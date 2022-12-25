const jwt = require('jsonwebtoken');
const db = require('../db/dbCreate');
const logger = require('../Logger/winston');
const log = (msg) => logger.info(msg);
const SECRET_KEY = "SeCrEtKeY1234";

module.exports={
    getregisterbyID: async function (userID,password,username,address,phone,companyname){
        let conn;
        try {
            conn = await db.getPoolConnection();

            const queryString =
                "insert  into'ojt'.'user' " +
                "values = (" + conn.escape(userID)+","+  conn.escape(password)
                + conn.escape(username)+ conn.escape(address)+ conn.escape(phone)+ conn.escape(companyname) + ")";

            const result = await conn.query(queryString);
            log('getregisterbyID result : ' + JSON.stringify(result));
            
            if(result.length == 0) {
                throw new Error("No such id");
            }

            // 배열에서 필요한 정보만 빼기
            let user = result.shift();
            
            const token = jwt.sign({
                userID : user.userID,
                username : user.name,
                phone : user.phone,
                companyname : user.companyname,
                address : user.address,

            },SECRET_KEY,{
                expiresIn: '7d'
            });

            return {
                token,
                user
            };
        } catch (error) {
            log(`loginExe erorr : ${error}`);
        }
        finally{
            if(conn) db.endPoolConnection(conn);
        }
    },

    checkAuth: async function (token) {
        try {
            log('checkAuth data : ' + token);

            if (!token) throw new Error('Please Sign in.');

            try {
                const decoded = jwt.verify(token, SECRET_KEY);
                console.log('통과?')
                console.log(decoded);
                return decoded;  
            } catch (error) {
                log(`invalid token error : ${error}`);
                throw error;
            }
             
        } catch (error) {
            log(`no token error : ${error}`);
            throw error;
        }
    }


}