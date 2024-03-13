import styled from "styled-components";

import Search from "../images/search_black.png";

const DefaultHeader = () => {
  return (
    <HeaderContainer>
      <div>PONNECT</div>
      <div className="search-img">
        <img src={Search} alt="QR 인식" />
      </div>
    </HeaderContainer>
  );
};

export default DefaultHeader;

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
