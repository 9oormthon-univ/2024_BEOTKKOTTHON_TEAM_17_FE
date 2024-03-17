import React from "react";
import Spinner from "../images/Spinner.gif";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { subscribeCard } from "../uitls/axios";

const QrRedirect = () => {
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];
  const navigate = useNavigate();
  const memberId = new URL(window.location.href).searchParams.get("memberId");

  useEffect(() => {
    subscribeCard(memberId, navigate, token);
  }, []);
  return (
    <Container>
      <SpinnerImg
        src={Spinner} // 로딩될 때 보여지는 화면
        alt="loading"
      />
    </Container>
  );
};

export default React.memo(QrRedirect);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const SpinnerImg = styled.img`
  height: 150px;
  width: 150px;
`;
