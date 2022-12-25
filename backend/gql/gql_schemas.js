const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Query {
    getcompanybyID(
        companyID: String!
    ): company

    getauthbyID(
        authID: Int!
    ): auth

    getdevicebyID(
        deviceID: Int!
        id:String!
        companyname:String!
        devicename:String!
    ): [device]
    
    getdevice:[device]

    getuserbyID(
        userID:String!
        companyname: String!
        name : String!
        userinfo : String!
        phone : String!
        address : String!
        
    ) : user   

    getloginbyID(
        userID:String!
        password:String!
    ) : LoginResult
    
# 기기조회
#    getcountbyID(
#        companyId : String
#        start_date : String!
#        end_date : String!
#    ) :  device
   
}

type LoginResult{
    token: String
    user: user
}

type CompanyUpdateResult{
    resultCount: Int!
}

type userUpdateResult{
    resultCount: Int
}

type deviceUpdateResult{
    resultCount: Int!
}

type authUpdateResult{
    resultCount: Int!
}

type Result{
    resultCount: Int!
}

type company {
    companyno: Int!
    companyid: String!
    companyname:String!
   }

type auth {
    authid : Int!
}
type device {
    deviceid: Int!
    id:[user]
    companyname:String!
    devicename:String!
    cre_date : String!
}
type user {
    id: String!
    authno: Int!
    companyname: String!
    pw:String!
    name : String!
    userinfo : String!
    phone : String!
    address : String!
    cre_date : String!
}

type Mutation {

    createcompany(
        companyname:String!
        companyid:String!
    ): CompanyUpdateResult


    
    deletecompany(
        companyno: Int!
        companyname:String!
        companyid: Int!
    ): CompanyUpdateResult

    createauth(
        authno: Int!
    ): Int

    #유저생성
    createuser(
        id: String!
        pw:String!
        name : String!
        phone : String!
        address : String!
        companyname : String!
        cre_date:String!
        userinfo:String!
    ): userUpdateResult



    deleteuser(
        id: String!
    ): Result

    createdevice(
        deviceId: Int!
        Id:String!
        companyname : String!
        devicename:String!
        ): Result

    updatedevice(
        deviceId: Int!
        Id:String!
        companyname: String!
        devicename:String!
    ): deviceUpdateResult

    deletedevice(
        deviceId: Int!
    ): Result
}
`;

module.exports = [typeDefs];
