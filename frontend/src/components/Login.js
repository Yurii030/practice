import React, { useState } from "react";
import styled from "@emotion/styled/macro";
import { useHistory } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { LOGINUSER } from "../graphql/query";


const Base = styled.section`
  text-align: center;
  height: 100vh;
  width: 100vw;
  background-color: #f7f7f7;
`;

const Title = styled.div`
  padding-top: 20%;
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

const LoginContainer = styled.div`
  width: 300px;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: 1px solid gray;
`;

const LoginInput = styled.input`
  width: 90%;
  height: 80%;
  padding-top: 2%;
  background-color: #f7f7f7;
  border: none;
`;

const PasswordContainer = styled.div`
  width: 300px;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: 1px solid gray;
`;

const PasswordInput = styled.input`
  width: 90%;
  height: 80%;
  padding-top: 2%;
  background-color: #f7f7f7;
  border: none;
`;

const LoginButton = styled.button`
  width: 302px;
  height: 44px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: #ffcc66;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background-color: green;
  }
`;


function Login() {
  const history = useHistory();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onIdHandler = (e) => {
    setId(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const id = e.target.id.value
    const password =e.target.password.value
    console.log(id,password)
    login({
      variables:{userID:id, password:password},
      onCompleted:(_,data) =>{
        if (_) {
        localStorage.setItem("login-token", _.getloginbyID.token);
        alert("로그인됏습니다");
        history.push({
          pathname: "/now",
          state: id,
        });
      } else {
        alert("회원정보가 없습니다.");
      }
      },
      onError:(e)=> {
        console.log(e)
      }
    })
  };

  const [login,{ data }] = useLazyQuery(LOGINUSER, {
    variables: {
      userID: id,
      password: password,
    },
  });
  

  return (
    <Base>
      <Title>INFOFLA</Title>
      <Container onSubmit={onSubmitHandler}>
        <LoginContainer>
          <LoginInput
            id="id"
            placeholder="아이디"
            type="text"
            value={id}
            onChange={onIdHandler}
          />
        </LoginContainer>
        <PasswordContainer>
          <PasswordInput
            id="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onPasswordHandler}
          />
        </PasswordContainer>
        <LoginButton >로그인</LoginButton>
      </Container>
    </Base>
  );
}

export default Login;