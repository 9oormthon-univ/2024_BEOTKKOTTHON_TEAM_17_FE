import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../styles/Main.css";
import MainLogo from "../images/main.png";
import Wallet from "../images/wallet_circle.png";
import MainHeader from "../components/MainHeader";
import { useCookies } from "react-cookie";
import { isValidToken } from "../uitls/axios";

function Main() {
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await isValidToken(token);
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    }
    fetchData();
  }, [token]);

  return (
    <div className="page">
      <div className="center">
        <MainPage>
          <div className="page-space">
            <MainHeader isLoggedIn={isLoggedIn} />
            <Container>
              <FiestTextLine>나만의 명함을 만들고 정보 관리를 손쉽게</FiestTextLine>
              <SecondTextLine>PONNECT</SecondTextLine>

              <LogoImg src={MainLogo} />
              <WalletDiv>
                <WalletImg src={Wallet} />
              </WalletDiv>
            </Container>
          </div>
        </MainPage>
      </div>
    </div>
  );
}

export default Main;

const MainPage = styled.div`
  background: linear-gradient(180deg, #138eff 27.96%, #006eee 89.04%);
`;

// 스크롤이 생기지 않게 최대 길이를 제한
const Container = styled.div`
  justify-content: center;

  max-height: 100dvh;
  overflow: hidden;
`;

const LogoImg = styled.img`
  margin-top: 10px;

  max-width: 100%;
  height: auto;
`;

const FiestTextLine = styled.div`
  color: #fff;
  margin-top: 85px;
  margin-left: 16px;
  margin-bottom: 10px;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SecondTextLine = styled.div`
  color: #fff;
  margin-left: 16px;

  font-family: Pretendard;
  font-size: 34px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const WalletDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  margin-right: 20px;
`;

const WalletImg = styled.img`
  width: 65px;
  height: auto;
`;
