import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

import Search from "../images/search.png";

const MainHeader = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleToMain = () => {
    navigate("/");
  };

  const handleToSignin = () => {
    navigate("/signin");
  };

  const handleToMypage = () => {
    navigate("/mypage");
  };

  const handleToQrScan = () => {
    navigate("/qrscan");
  };

  //로그인 여부 => 로그인 버튼이 렌더 or MY 버튼이 렌더
  return (
    <HeaderContainer>
      <Title onClick={handleToMain}>PONNECT</Title>
      {isLoggedIn ? (
        <HeaderRight>
          <HeaderBtn onClick={handleToMypage}>MY</HeaderBtn>
          <div className="search-img" onClick={handleToQrScan}>
            <img src={Search} alt="QR 인식" />
          </div>
        </HeaderRight>
      ) : (
        <HeaderRight>
          <HeaderBtn onClick={handleToSignin}>로그인</HeaderBtn>
        </HeaderRight>
      )}
    </HeaderContainer>
  );
};

export default MainHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 4px;
  color: #fff;
`;

const Title = styled.div`
  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

  margin-left: 15px;
  cursor: pointer;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderBtn = styled.div`
  color: #fff;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  width: 50px;
  height: 24px;
  border-radius: 100px;
  border: 1.5px solid #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 14px;
`;
