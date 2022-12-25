import React from "react";
import Text from "../elements/Text";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import { useQuery } from "@apollo/client";
import { get_user } from "../graphql/query";
import { useHistory } from "react-router-dom";

const Base = styled.div`
  display: inline-block;
  position: relative;
`;

const ListName2 = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: #4e4e4e;
  margin: 3px 0 0 0;
  height: 20px;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  width: 274px;
`;

const Profit = styled.div`
  position: absolute;
  top: 15px;
  right: 10px;
  color: #a1a1a1;
  font-size: 13px;
`;

const DeleteButton = styled.button`
  background-color: #ffcc66;
  border: 1px solid #ffcc66;
  border-radius: 10px;
  position: absolute;
  padding: 10px;
  font-weight: bold;
  top: 380px;
  right: 20px;
  :hover {
    background-color: white;
  }
`;
//메인화면에서 유저정보를 전달받아 유저 정보를 렌더링
const get_user = ( userData) => {
  const history = useHistory();
  const { userData } = useQuery(get_user);

  return (
    <>
      {data
        ? data.get.map((data) => (
            <Grid
              width="300px"
              height="420px"
              margin="20px 5px 50px 50px"
              bg="#f9fafa"
              key={data.id}
              _onClick={() => {
                history.push({
                  pathname: `//${data.id}`,
                  state: userData,
                });
              }}
            >"
            
              <Image
                src={process.env.REACT_APP_ROOT_URL + data.img_url}
                width="100%"
                height="300px"
              />
              <Grid height="97px" padding="0 5%">
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "272px",
                    cursor: "pointer",
                  }}
                >
                  <Text color="#A1A1A1" margin="14px 0px 0px" size="13px">
                    {data.mall_name}
                  </Text>
                  <ListName2>{data.user_name}</ListName2>
                </div>
                <Grid margin="14px 0 0 0">
                  <Text margin="0" size="1.25em" bold>
                    {data.get_user}
                    <span style={{ fontSize: "0.6em" }}>유저관리</span>
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          ))
        : console.log("로딩")}
    </>
  );
};

export default get_user;
