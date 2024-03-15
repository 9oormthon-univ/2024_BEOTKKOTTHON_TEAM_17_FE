import styled from "styled-components";
import "../styles/Header.css";
import Search from "../images/search_black.png";

const DefaultHeader = () => {
  return (
    <HeaderContainer>
      <Title>PONNECT</Title>
      <div className="search-img">
        <img
          src={Search}
          alt="QR 인식"
        />
      </div>
    </HeaderContainer>
  );
};

export default DefaultHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 10px 4px;
`;

const Title = styled.div`
  color: #138eff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

  margin-left: 15px;
`;
