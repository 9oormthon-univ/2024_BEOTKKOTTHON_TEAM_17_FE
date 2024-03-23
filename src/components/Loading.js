import styled from "styled-components";
import Spinner from "../images/Spinner.gif";

const Loading = () => {
  return (
    <SpinnerContainer>
      <SpinnerImg src={Spinner} />
    </SpinnerContainer>
  );
};

export default Loading;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const SpinnerImg = styled.img`
  width: 130px;
  height: 130px;
`;
