import styled from "styled-components";

const DefaultHeader = () => {
  return (
    <HeaderContainer>
      <div>PONNECT</div>
      <button>QR</button>
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
