import styled from "styled-components";
import DefaultHeader from "../components/DefaultHeader";

const SignIn = () => {
  return (
    <div className="page">
      <div className="center">
        <SignInPage>
          <div className="page-space">
            <DefaultHeader />
            signin
          </div>
        </SignInPage>
      </div>
    </div>
  );
};

export default SignIn;

const SignInPage = styled.div`
  background-color: #fff;
`;
