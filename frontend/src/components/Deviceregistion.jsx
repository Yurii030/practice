// 기기등록

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import { useHistory, useLocation } from "react-router-dom";
import { createdevice, CREATE_device } from "../graphql/query";
import { useMutation } from "@apollo/client";

const Base = styled.section`
  text-align: center;
  height: 100vh;
  width: 100vw;
  background-color: #f7f7f7;
`;

const Title = styled.div`
  padding-top: 7%;
  padding-bottom: 2%;
  font-size: 50px;
  font-weight: bold;
  color: #444;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const TextInput = styled.input`
  width: 90%;
  height: 80%;
  padding-top: 2%;
  background-color: #f7f7f7;
  border: none;
`;

const DetailContainer = styled.div`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const DetailInput = styled.textarea`
  width: 90%;
  height: 95%;
  padding-top: 2%;
  background-color: #f7f7f7;
  border: none;
`;

const RegisterButton = styled.button`
  width: 302px;
  height: 44px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  color: white;
  background-color: #ffcc66;
  border: none;
  cursor: pointer;
  :hover {
    background-color: green;
  }
`;

const RegisterText = styled.div`
  font-size: 13px;
  color: #666666;
  margin: -10px 0 10px 0;
`;

function DeviceRegistion() {
  const history = useHistory();
  const location = useLocation();
  const [deviceid, setdeviceid] = useState("");
  const [devicename, setdevicename] = useState("");
  const [id, setid] = useState("");
  const [companyname, setcompanyname] = useState("");
  
  const ondeviceidHandler = (e) => {
    setdeviceid(e.target.value);
  };

  const ondevicenameHandler = (e) => {
    setdevicename(e.target.value);
  };

  const ondidHandler = (e) => {
    setid(e.target.value);
  };

  const oncompanynameHandler = (e) => {
    setcompanyname(e.target.value);
  };


  const oncreateHandler = async (event) => {
    event.preventDefault();
    await createdevice();
  };

  const [createdevice, { data, loading, error }] = useMutation(
    createdevice,
    {
      variables: {
      deviceid: deviceid,
      id: id,
      companyname: companyname,
      devicename: devicename,
       },
    }
  );

  useEffect(() => {
    if (data) {
      console.log("data", data);
      history.push({
        pathname: "/createdevice",
        state: location.state,
      });
    }
    if (loading) {
      console.log("loading", loading);
    }
    if (error) {
      console.log("error", error);
    }
  }, [data, loading, error, history, location.state]);

  return (
    <Base>
      { <><Title>INFOFLA</Title><Container onSubmit={onSubmitHandler}>
        <TextContainer>
          <TextInput
            placeholder="deviceid를 입력하세요"
            type="text"
            value={deviceid}
            onChange={ondeviceidHandler} />
        </TextContainer>
        <TextContainer>
          <TextInput
            placeholder="id를 입력하세요"
            type="text"
            value={id}
            onChange={ondidHandler} />
        </TextContainer>
        <TextContainer>
          <TextInput
            placeholder="companyname을 입력하세요"
            type="text"
            value={companyname}
            onChange={oncompanynameHandler} />
        </TextContainer>
        <RegisterText>ex 15000</RegisterText>
        <DetailContainer>
          <DetailInput
            placeholder="devicename을 적어주세요"
            type="text"
            value={detail}
            onChange={ondevicenameHandler} />
        </DetailContainer>
        <RegisterButton>기기등록 </RegisterButton>
      </Container></> }
    </Base>
  );
}

export default DeviceRegistion;