import { gql } from "@apollo/client";

export const LOGINUSER = gql`
  query NoTokenAPI($userID: String!, $password: String!) {
    getloginbyID(userID: $userID, password: $password) {
      token
      user {
        id
        companyname
        pw
        name
      }
    }
  }
`;

export const get_device = gql`
  query NoTokenAPI($deviceID: Int!) {
    getdeviceID(id: $deviceID) {
      deviceID
      id
      companyname
      devicename
    }
  }
`;
export const getdevice = gql`
  query NoTokenAPI {
    getdevicebyID {
      deviceID
      id
      companyname
      devicename
    }
  }
`;


export const get_user= gql`
  query NoTokenAPI {
    getuserbyID{
      userID
      companyname
      name 
      userinfo 
      phone 
      address
    }
  }
`;

///////////////////////////////////////////////////// mutation

export const createuser = gql`
  mutation NoTokenAPI(
    $createuserid: String!
    $password: String!
    $name: String!
    $phone : String!
    $address: String!
    $companyname : String!
    $cre_date : String!
    $user_info: String!
  ) {
    createUser(
      id: $createuserid
      password: $password
      name: $name
      phone : $phone
      address: $address
      companyname: $companyname
      cre_date : $cre_date
      user_info: $user_info
    )
  }
`;
export const deleteuser = gql`
  mutation NoTokenAPI($deleteuserid: Int!) {
    deleteuser(id: $deleteuserid)
  }
`;

export const createdevice = gql`
  mutation NoTokenAPI(
    $deviceId: String!
    $Id: String!
    $companyname: String!
    $devicename: String!
  ) {
    createdevice(
      deviceId: $deviceId
      Id: $Id
      companyname: $companyname
      devicename: $devicename
    )
  }
`;

export const deletedevice = gql`
  mutation NoTokenAPI($deviceId: Int!) {
    deletedevice(id: $deviceId)
  }
`;

export const updatedevice = gql`
  mutation NoTokenAPI(
    $deviceId: Int!
    $Id: String!
    $companyname: String!
    $devicename: String!
  ) {
    updatedevice(
      deviceId: $deviceId
      Id: $Id
      devicename: $devicename
    )
  }
`;


