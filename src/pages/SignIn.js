import styled from "styled-components";
import DefaultHeader from "../components/DefaultHeader";
import "../styles/Main.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    principal: "",
    credential: "",
  });

  const handleChangeState = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async () => {
    // 로그인하기 버튼 클릭 이벤트
  };

  return (
    <div className="page">
      <div className="center">
        <SignInPage>
          <div className="page-space">
            <DefaultHeader />
            <Container>
              <Title>로그인</Title>
              <Input
                type="email"
                name="principal"
                value={signInData.principal}
                onChange={handleChangeState}
                placeholder="아이디 (이메일)"
              />
              <Input
                type="password"
                name="credential"
                value={signInData.credential}
                onChange={handleChangeState}
                placeholder="비밀번호"
              />
              <Button>로그인하기</Button>
              <Button isFindPassword>비밀번호 찾기</Button>
              <SignupPrompt>
                PONNECT가 처음이신가요?
                <SignUpButton>간편 회원가입하기</SignUpButton>
              </SignupPrompt>
            </Container>
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

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  border: 1px solid green;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.input`
  margin: 10px 0;
  border: 1px solid #ccc;
  width: 343px;
  height: 37px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  width: 343px;
  border: none;
  background-color: ${({ isFindPassword }) => (isFindPassword ? "white" : "#138EFF")};
  color: ${({ isFindPassword }) => (isFindPassword ? "#000" : "white")};
  cursor: pointer;

  &:hover {
    background-color: ${({ isFindPassword }) => (isFindPassword ? "#f8f9fa" : "#007bff")};
  }
`;

const SignupPrompt = styled.div`
  margin-top: 20px;
  text-align: flex-start;
  width: 100%;
`;

const SignUpButton = styled(Button)`
  background-color: white;
  color: #000;
  border: 1px solid #8c8c8c;
  border-radius: 20px;
  width: 343px;

  &:hover {
    background-color: #138eff;
    color: #fff;
    border: none;
  }
`;
