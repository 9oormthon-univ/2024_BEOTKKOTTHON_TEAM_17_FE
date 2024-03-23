import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import "../styles/Main.css";
import MainLogo from "../images/main.png";
import Wallet from "../images/wallet_circle.png";
import MainHeader from "../components/MainHeader";
import { useCookies } from "react-cookie";
import { getMyInfo, isValidToken } from "../utils/axios";
import { useUserInfo } from "../store/store";

function Main() {
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];
  const { setUserInfo } = useUserInfo();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!token) {
          navigate("/");
        }

        const validationResponse = await isValidToken(token);

        if (validationResponse && validationResponse.status === 200) {
          const userInfoResponse = await getMyInfo(token);
          if (userInfoResponse && userInfoResponse.status === 200) {
            setIsLoggedIn(true);
            setUserInfo(userInfoResponse.data);
          }
        } else {
          setIsLoggedIn(false);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    }
    fetchData();
  }, [token]);

  const navigate = useNavigate();

  const handleToMyCards = () => {
    navigate("/mycards");
  };

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

              {isLoggedIn ? (
                <WalletDiv onClick={handleToMyCards}>
                  <WalletImg src={Wallet} />
                </WalletDiv>
              ) : null}
            </Container>
          </div>
        </MainPage>
      </div>
    </div>
    // <FullHeightSection $viewportHeight={viewportHeight}>
    //   <MainHeader isLoggedIn={isLoggedIn} />
    //   <Container>
    //     <FiestTextLine>나만의 명함을 만들고 정보 관리를 손쉽게</FiestTextLine>
    //     <SecondTextLine>PONNECT</SecondTextLine>

    //     <LogoImg src={MainLogo} />
    //     <WalletDiv>
    //       <WalletImg src={Wallet} />
    //     </WalletDiv>
    //   </Container>
    // </FullHeightSection>
  );
}

export default Main;

const MainPage = styled.div`
  background: linear-gradient(180deg, #138eff 27.96%, #006eee 89.04%);
`;

// 동적 높이를 받아 스타일을 적용하는 컴포넌트
// const FullHeightSection = styled.div`
//   width: 100%;
//   height: ${({ $viewportHeight }) => `${$viewportHeight}px`};
//   overflow: hidden;
//   background: linear-gradient(180deg, #138eff 27.96%, #006eee 89.04%);
// `;

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
  overflow: hidden;
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

  cursor: pointer;

  position: fixed;
  right: 20px;
  bottom: 20px;

  @media (hover: hover) and (pointer: fine) {
    right: calc(50vw - 187.5px + 20px);
  }
`;

const WalletImg = styled.img`
  width: 65px;
  height: auto;
`;
