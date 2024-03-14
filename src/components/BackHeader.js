import styled from "styled-components";

import BackArrow from "../images/back_arrow.png";

const BackHeader = () => {
  return (
    <HeaderContainer>
      <Title>PONNECT</Title>
      <div className="backarrow-img">
        <img
          src={BackArrow}
          alt="뒤로가기"
        />
      </div>
    </HeaderContainer>
  );
};

export default BackHeader;

const HeaderContainer = styled.div`
  font-family: "Pretendard-Bold";
  font-weight: 800;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  color: #138eff;
`;

const Title = styled.div`
  font-size: 14px;
`;
