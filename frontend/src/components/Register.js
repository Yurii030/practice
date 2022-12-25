import React, { useEffect, useState } from "react"; //
import { useHistory } from "react-router-dom";
import { CREACTUSER } from "../graphql/query";
import { useMutation } from "@apollo/client";

function Register() {
  const history = useHistory();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [select, setSelect] = useState("0");

  const onIdHandler = (e) => {
    setId(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onNameHandler = (e) => {
    setName(e.target.value);
  };

  const onAddressHandler = (e) => {
    setAddress(e.target.value);
  };

  const onSelectHandler = (e) => {
    setSelect(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await createUser();
  };

  const [createUser, { data, loading, error }] = useMutation(CREACTUSER, {
    variables: {
      createUserId: id,
      password: password,
      name: name,
      address: address,
      admin: parseInt(select),
    },
  });

  useEffect(() => {
    if (data) {
      console.log("data", data);
      history.push("/login");
    }
    if (loading) {
      console.log("loading", loading);
    }
    if (error) {
      console.log("error", error);
      alert("같은 아이디 또는 닉네임이 존재합니다.");
    }
  }, [data, loading, error, history]);

  return (
    <Base>
      <Title>INFOFLA</Title>
      <Container onSubmit={onSubmitHandler}>
        <TextContainer>
          <TextInput
            placeholder="아이디를 입력하세요"
            type="text"
            value={id}
            onChange={onIdHandler}
          />
        </TextContainer>
        <TextContainer>
          <TextInput
            placeholder="비밀번호를 입력하세요"
            type="password"
            value={password}
            onChange={onPasswordHandler}
          />
        </TextContainer>
        <TextContainer>
          <TextInput
            placeholder="이름(기업명)을 입력하세요"
            type="text"
            value={name}
            onChange={onNameHandler}
          />
        </TextContainer>
        <TextContainer>
          <TextInput
            placeholder="닉네임(기업명)을 입력하세요"
            type="text"
            value={nickName}
            onChange={onNickNameHandler}
          />
        </TextContainer>
        <TextContainer>
          <TextInput
            placeholder="주소를 입력하세요"
            type="text"
            value={address}
            onChange={onAddressHandler}
          />
        </TextContainer>
        <RadioContainer>
          <RadioInput
            type="radio"
            id="0"
            name="goal"
            value="0"
            checked={select === "0"}
            onChange={onSelectHandler}
          />
          <label htmlFor="goal">user</label>
          <RadioInput
            type="radio"
            id="1"
            name="goal"
            value="1"
            checked={select === "1"}
            onChange={onSelectHandler}
          />
          <label htmlFor="goal">infofla</label>
        </RadioContainer>
      </Container>
    </Base>
  );
}

export default Register;
