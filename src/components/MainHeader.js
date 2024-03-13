import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

import Search from "../images/search.png";

const MainHeader = () => {
  const navigate = useNavigate();

  const handleToSignin = () => {
    navigate("/signin");
  };

  const handleToMypage = () => {
    navigate("/mypage");
  };

  //로그인 여부 => 로그인 버튼이 렌더 or MY 버튼이 렌더
  return (
    <HeaderContainer>
      <Title>PONNECT</Title>
      <HeaderRight>
        {/* 로그인 버튼 */}
        <HeaderBtn onClick={handleToSignin}>로그인</HeaderBtn>
        {/* MY 버튼 */}
        {/* <HeaderBtn onClick={handleToMypage}>MY</HeaderBtn> */}
        <div className="search-img">
          <img
            src={Search}
            alt="QR 인식"
          />
        </div>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default MainHeader;

const HeaderContainer = styled.div`
  font-family: "Pretendard-Bold";
  font-weight: 800;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: #fff;
`;

const Title = styled.div`
  font-size: 14px;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderBtn = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 12px;
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
