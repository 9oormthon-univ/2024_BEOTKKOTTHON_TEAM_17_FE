import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const DefaultHeader = () => {
  const navigate = useNavigate();

  const handleToMain = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Title onClick={handleToMain}>PONNECT</Title>
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

  height: 25.6px;
  display: flex;
  align-items: center;

  margin-left: 15px;
  cursor: pointer;
`;
