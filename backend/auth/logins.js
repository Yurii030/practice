const jwt = require('jsonwebtoken');
const db = require('../db/dbCreate');
const logger = require('../Logger/winston');
const log = (msg) => logger.info(msg);
const SECRET_KEY = "SeCrEtKeY1234";

module.exports={
    getloginbyIDExe: async function (userID,password){
        let conn;
        try {
            conn = await db.getPoolConnection();

            const queryString =
                "select * from user " +
                "where id = " + conn.escape(userID) + 
                " and pw = " + conn.escape(password) + "";

            const result = await conn.query(queryString);
            log('getloginbyIDExe result : ' + JSON.stringify(result));
            
            if(result.length == 0) {
                throw new Error("No such id");
            }

            // 배열에서 필요한 정보만 빼기
            let user = result.shift();
            
            const token = jwt.sign({
                userID : user.userID,
                password : user.password,
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