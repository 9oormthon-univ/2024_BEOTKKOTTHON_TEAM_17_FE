import styled from "styled-components";

const MainHeader = () => {
  //로그인 여부 => 로그인 버튼이 렌더 or MY 버튼이 렌더
  return (
    <HeaderContainer>
      <div>PONNECT</div>
      <button>로그인</button>
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
