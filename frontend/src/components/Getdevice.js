//기기조회
import React from "react";
import styled from "@emotion/styled/macro";
import Text from "../elements/Text";
import Grid from "../elements/Grid";
import { useMutation, useQuery } from "@apollo/client";
import {get_device } from "../graphql/query";
import { useHistory, useLocation } from "react-router-dom";
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
//메인화면에서 기기 정보를 전달받아 기기 정보를 렌더링
const Getdevice= ({ userData }) => {
  const history = useHistory();
  const { data } = useQuery(get_device, {
    variables: {
      deviceId: userData.getdevicebyID[0].deviceId,
    },
  });

  const deletePro = (data) => {
    console.log("data", data.id);
    deletedevice({ variables: { deletedeviceExe: data.id } });
    window.location.reload();
  };
  const [deletedevice, deleteResult] = useMutation(deletedevice);
  if (deleteResult.data) {
    console.log(deleteResult.data);
  } else if (deleteResult.loading) {
    console.log(deleteResult.loading);
  } else {
    console.log(deleteResult.error);
  }

  console.log(userData.getdevicebyID[0].deviceId);

  return (
    <>
      {data
        ? data.getdevicebyID.map((data) => (
            <Base key={data.deviceid}>
              <Grid
                width="300px"
                height="420px"
                margin="20px 5px 50px 50px"
                bg="#f9fafa"
                _onClick={() => {
                  history.push({
                    pathname: `/deviceinfo/${data.deviceid}`,
                    state: userData,
                  });
                }}
              >
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
                    <ListName2>{data.devicename}</ListName2>
                    <get_device>총 기기등록 수: {data.get_device}</get_device>
                  </div>
                </Grid>
              </Grid>
              <DeleteButton onClick={() => deletePro(data)}>삭제</DeleteButton>
            </Base>
          ))
        : console.log("로딩")}
    </>
  );
};

export default Getdevice;
