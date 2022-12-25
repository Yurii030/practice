const db = require("./dbCreate");
const logger = require('../logger/winston');
const debug = require("redis/lib/debug");
const log = (msg) => logger.info(msg);
module.exports = {

    // Query
    getauthbyIDExe: async function (authID = null) {
        try {
            let queryString =
                "select * " +
                "from auth ";

            if (authID) {
                queryString +=
                    "where authid = " + authID;
            }

            let result;
            log('getauthByIdExe executed');
            result = await db.exe(queryString);
            return result[0];
        }
        catch (err) {
            console.error("getauthByIdExe Error: " + err);
            throw err;
        }
    },

    getuserbyIDExe: async function (userID = null) {
        try {
            let queryString =
                "select * " +
                "from user ";

            if (userID) {
                queryString +=
                    "where id = '" + userID+"'";
            }

            let result;
            log('getuserByIdExe executed');
            result = await db.exe(queryString);
            return result[0];
        }
        catch (err) {
            console.error("getuserByIdExe Error: " + err);
            throw err;
        }
    },

    getdevicebyIDExe: async function (deviceId = null) {
        try {
            let queryString =
                "select * " +
                "from device ";

            if (deviceId) {
                queryString +=
                    "where deviceid = " + deviceId;
            }

            let result;
            log('getdeviceByIdExe executed');
            result = await db.exe(queryString);
            return result;
        }
        catch (err) {
            console.error("getdeviceByIdExe Error: " + err);
            throw err;
        }
    },

    getCompanyByIdExe: async function (companyId = null) {
        try {
            let queryString =
                "select * from company";

            if (companyId) {
                queryString += " where companyid = " + companyId;
            }
            
            log('getCompanyByIdExe executed');
            const result = await db.exe(queryString);

            return result[0];
        }
        catch (err) {
            console.error("getCompanyByIdExe Error: " + err);
            throw err;
        }
    },  
    getloginbyIDExe: async function (userId = null,password=null) {
        try {
            let queryString =
                "select * from user";

            if (userId,password) {
                queryString += " where id = " + userId+" AND  pw='"+password + "'";
            }
            
            log('getloginbyIDExe executed');
            const result = await db.exe(queryString);

            return result[0];
        }
        catch (err) {
            console.error("getloginbyIDExe Error: " + err);
            throw err;
        }
    },
   /* getcountbyIDExe: async function (deviceID= null,createdate=null) {
        try {
            let queryString =
                "select * from device";

            if (createdate) {
                queryString += " where cre_date = " +start_date +" AND cre_date = '" +end_date + "'";
            }
            if(deviceID){
                queryString += " where deviceid = " + deviceID;
            }

            
            log('getcountbyIDExe executed');
            const result = await db.exe(queryString);

            return result[0];
        }
        catch (err) {
            console.error("getcountbyIDExe Error: " + err);
            throw err;
        }
    },
*/


    // Mutation
    createauthExe: async function (data) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "insert into auth (authno) " +
                "value (" +
                "NULLIF(" + conn.escape(data['authno']) + ", null), " +
                ")";

            const result = conn.query(queryString);
            log("query statement : " + queryString);
            return result;
        } catch (error) {
            log("createauthExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },

    createdeviceExe: async function (data) {
        let conn;
        console.log(data);
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "insert into device (deviceid, id, companyname, devicename) " +
                "value (" +
                "NULLIF(" + conn.escape(data['deviceId']) + ", null), " +
                "NULLIF(" + conn.escape(data['Id']) + ", null), " +
                "NULLIF(" + conn.escape(data['companyname']) + ", null), " +
                "NULLIF(" + conn.escape(data['devicename']) + ", null) " +
                ")";
            const result = await conn.query(queryString);
            log("query statement : " + queryString);
            return result;
          } catch (error) {
            log("createdeviceExe error :" + error);
            throw error;
          }
          finally {
            if (conn) await db.endPoolConnection(conn);
          }
        },
    
    updatedeviceExe: async function (inputList) {
        let conn;
        try {
            conn = await db.getPoolConnection();


            let queryString =
                "update device " +
                "set deviceid = nullif(" + (JSON.stringify(inputList["deviceId"])) + ",null)," +
                "id = nullif(" + (JSON.stringify(inputList["Id"])) + ",null)," +
                "companyname = nullif(" + (JSON.stringify(inputList["companyname"])) + ",null)," +
                "devicename = nullif(" + (JSON.stringify(inputList["devicename"])) + ",null)" +
                "where deviceid = " + inputList["deviceId"];
            let result;
            result = await conn.query(queryString);
            log("query statement : " + queryString);
            return result;
        } catch (error) {
            log("updatedeviceExe error :  " + error);
            throw error;
        } finally {
            if (conn) {
                await db.endPoolConnection(conn);
            }
        }
    },

    deletedeviceExe: async function (deviceId) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "delete from device " +
                "where deviceid = " + conn.escape(deviceId);
            const result = conn.query(queryString);
            log("query statement : " + queryString);
            return result;
        } catch (error) {
            log(`deletedeviceExe error : ` + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },
    createcompanyExe: async function (data) {
        let conn;
        console.log(data);
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "insert into company (companyid,companyname) " +
                "value (" +
                "NULLIF(" + conn.escape(data['companyid']) + ", null), " +
                "NULLIF(" + conn.escape(data['companyname']) + ", null) " +
                ")";
            const result = conn.query(queryString);
            log("query statement : " + queryString);
            return result;
          } catch (error) {
            log("createcompanyExe error :" + error);
            throw error;
          }
          finally {
            if (conn) await db.endPoolConnection(conn);
          }
        },

    deletecompanyExe: async function (companyId) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "delete from company " +
                "where companyid = " + conn.escape(companyId);
            const result = conn.query(queryString);
            log("query statement : " + queryString);
            return result;
        } catch (error) {
            log(`deletecompanyExe error : ` + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },
    createuserExe: async function (data) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "insert into user (id, companyname, pw, name,phone,address,cre_date,userinfo)" +
                "values (" +
                "NULLIF(" + conn.escape(data['id']) + ", null), " +
                "NULLIF(" + conn.escape(data['companyname']) + ", null), " +
                "NULLIF(" + conn.escape(data['pw']) + ", null), " +
                "NULLIF(" + conn.escape(data['name']) + ", null), " +
                "NULLIF(" + conn.escape(data['phone']) + ", null), " +
                "NULLIF(" + conn.escape(data['address']) + ", null), " +
                "NULLIF(" + conn.escape(data['cre_date']) + ", null), " +
                "NULLIF(" + conn.escape(data['userinfo']) + ", null) " +
                ")"; 
            const result = await conn.query(queryString);
            log("query statement : " + queryString);
            console.log(result);
            
            if(result.affectedRows){
                console.log(result.affectedRows);
                return result.affectedRows;
            }
            return null;
          } catch (error) {
            log("createuserExe error :" + error);
            throw error;
          }
          finally {
            if (conn) await db.endPoolConnection(conn);
          }
        },
    

    deleteuserExe: async function (id) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "delete from user " +
                "where id = " + conn.escape(id);
            const result = conn.query(queryString);
            log("query statement : " + queryString);
            return result;
        } catch (error) {
            log(`deleteuserExe error : ` + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },
    
    
    
}