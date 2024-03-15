import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

import Search from "../images/search.png";

const MainHeader = ({ isLoggedIn }) => {
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
        {isLoggedIn ? (
          <HeaderBtn onClick={handleToMypage}>MY</HeaderBtn>
        ) : (
          <HeaderBtn onClick={handleToSignin}>로그인</HeaderBtn>
        )}

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6dvh;
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
