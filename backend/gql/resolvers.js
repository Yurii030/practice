const sql = require("../db/dbExe");
const logger = require('../logger/winston');
const password  = require("../db/dbConfig");
const login = require("../auth/logins");

const log = (msg) => logger.info(msg);

const resolvers = {
    Query: {
        getcompanybyID: async (_, {
            companyID }
        ) => {
            try {
                log('getcompanybyID');
                console.log('getcompanybyID');
                let companyResult = JSON.stringify(companyID);

                let result = await sql.getCompanyByIdExe(companyResult);
                return result;
            }
            catch (err) {
                log("getcompanybyID error : " + err);
                throw err;
            }
        },
        getauthbyID: async (_,{
            authID}
        ) => {
            try {
                log(' getauthbyID');
                let authResult = JSON.stringify(authID);

                let result = await sql. getauthbyIDExe(authResult);
                return result;
            }
            catch (err) {
                log(" getauthbyID error : " + err);
                throw err;
            }
        },
        getdevicebyID: async (_, {
            deviceID } 
        ) => {
            try {
                log(' getdevicebyID');
                
                let results = await sql. getdevicebyIDExe(deviceID);
                return results;
            }
            catch (err) {
                log(" getdevicebyID error : " + err);
                throw err;
            }
        },
        getuserbyID: async (_, {
            userID } 
        ) => {
            try {
                log(' getuserbyID');
                
                let results = await sql. getuserbyIDExe(userID );
                return results;
            }
            catch (err) {
                log(" getuserbyID error : " + err);
                throw err;
            }
        },
        getloginbyID: async (_, {
            userID,password } 
        ) => {
            try {
                log(' getloginbyID');
                
                let results = await login.getloginbyIDExe(userID,password );
                return results;
            }
            catch (err) {
                log(" getloginbyID error : " + err);
                throw err;
            }
        },
 /*       getcountbyID: async (_, {
            deviceID,
            start_date,
            end_date

        
        } 
        ) => {
            try {
                log('getcountbyID');
                
                let results = await sql.getcountbyIDExe(deviceID,start_date,end_date );
                return results;
            }
            catch (err) {
                log(" getcountbyID error : " + err);
                throw err;
            }
        },
 */       

           
    },
    Mutation: {
       
        createcompany: async (_, {
            companyid = null,
            companyname= null,
        }) => {
            try {
                let data = {
                    "companyid": companyid,
                    "companyname": companyname,
                };
                const result = await sql.createcompanyExe(data);
                return { resultCount: result.affectedRows };
            } catch (error) {
                log(`createcompany error: ${error}`);
                throw error;
            }
        },

        deletecompany: async (_, {
            companyID

        }) => {
            try {
                const result = await sql.deletecompanyExe(companyID);
                return { resultCount: result.affectedRows };
            } catch (error) {
                log(`deletecompany error: ${error}`);
                throw error;
            }
        },
        createauth: async (_, {
            authID = null,
            companyno=null,
            username=null,
            userinfo=null,
        }) => {
            try {
                let data = {
                    "authID": authID,
                    "companyno" : companyno,
                    "username" : username,
                    "userinfo" : userinfo,
                };
                const result = await sql.createauthExe(data);
                return { resultCount: result.affectedRows };
            } catch (error) {
                log(`createcompany error: ${error}`);
                throw error;
            }
        },
    
        createdevice: async (_, {
            deviceId= null,
            Id = null,
            companyname= null,
            devicename = null,
        }) => {
            try {
                let data = {
                    "deviceId": deviceId,
                    "Id": Id,
                    "companyname": companyname,
                    "devicename": devicename,
                };
                const result = await sql.createdeviceExe(data);
                return { resultCount: result.affectedRows };
            } catch (error) {
                log(`createdevice error: ${error}`);
                throw error;
            }
        },
        updatedevice: async (_, {
            deviceId= null,
            Id = null,
            companyname= null,
            devicename = null,

        }) => {
            try {
                let data = {
                    "deviceId": deviceId,
                    "Id": Id,
                    "companyname": companyname,
                    "devicename": devicename,

                };
                const result = await sql.updatedeviceExe(data);
                return { resultCount: result.affectedRows };
            } catch (error) {
                log(`updatedevice error: ${error}`);
                throw error;
            }
        },
        deletedevice: async (_, {
            deviceId 
        }) => {
            try {
                const result = await sql.deletedeviceExe(deviceId);
                return { resultCount: result.affectedRows };
            } catch (error) {
                log(`deletedevice error: ${error}`);
                throw error;
            }
        },
        createuser: async (_, {
            id= null,
            companyname= null,
            pw = null,
            name = null,
            phone= null,
            address=null,
            cre_date=null,
            userinfo=null,
            
        }) => {
            console.log(cre_date)
            try {
                let data = {
                    "id": id,
                    "companyname": companyname,
                    "pw": pw,
                    "name": name,
                    "phone": phone,
                    "address" : address,
                    "cre_date": cre_date,
                    "userinfo" : userinfo,

                };
                const result = await sql.createuserExe(data);
                return { resultCount: result };
            } catch (error) {
                log(`createuser error: ${error}`);
                throw error;
            }
        },
        deleteuser: async (_, {
            id
        }) => {
            try {
                const result = await sql.deleteuserExe(id);
                return { resultCount: result.affectedRows };
            } catch (error) {
                log(`deleteuser error: ${error}`);
                throw error;
            }
        },
    },
    device: {

   




        id: async ({
    
          id
    
        }, req) => {
    
          //시스템 입력이므로 (root, args)의 root
          console.log(id);
    
          try {
    
            // log("Code is "+ root.Code);
    
            // const results = await sql.getCodeByCodeIdExe(GroupId);
    
            if (!id) return [];
    
            const result = await sql.getuserbyIDExe(id);
    
            console.log("Users: CorpId: " + JSON.stringify(result));
    
    
    
            return [result];
    
            // log("IPs part is " + JSON.stringify(results));
    
            // return results;
    
          } catch (err) {
    
            logger.error("error is " + err);
    
            throw err;
    
          }
    
        }
}
}
module.exports = resolvers;