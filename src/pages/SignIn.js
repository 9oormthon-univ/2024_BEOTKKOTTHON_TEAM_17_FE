import styled from "styled-components";
import DefaultHeader from "../components/DefaultHeader";
import "../styles/Main.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logIn } from "../uitls/axios";
import { useCookies } from "react-cookie";

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt-token"]);

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
    try {
      const data = await logIn(signInData, setCookie);
      navigate("/"); // 메인으로 리다이렉트
      console.log("로그인 성공");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const linkToSignUp = () => {
    navigate("/signup/step1");
  };

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <FullHeightSection $viewportHeight={viewportHeight}>
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
        <Button onClick={handleSignIn}>로그인하기</Button>
        <Button $isFindPassword>비밀번호 찾기</Button>
        <SignupPrompt>
          <IsFirst>PONNECT가 처음이신가요?</IsFirst>
          <SignUpButton onClick={linkToSignUp}>간편 회원가입하기</SignUpButton>
        </SignupPrompt>
      </Container>
    </FullHeightSection>

    /*
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
              <Button onClick={handleSignIn}>로그인하기</Button>
              <Button $isFindPassword>비밀번호 찾기</Button>
              <SignupPrompt>
                <IsFirst>PONNECT가 처음이신가요?</IsFirst>
                <SignUpButton onClick={linkToSignUp}>간편 회원가입하기</SignUpButton>
              </SignupPrompt>
            </Container>
          </div>
        </SignInPage>
      </div>
    </div>
    */
  );
};

export default SignIn;

const FullHeightSection = styled.div`
  width: 100%;
  height: ${({ $viewportHeight }) => `${$viewportHeight}px`};
  overflow: hidden;
  background-color: #fff;
`;

const SignInPage = styled.div`
  background-color: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h2`
  margin-top: 70px;
  margin-bottom: 31px;

  text-align: center;

  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-edge: cap;
  leading-trim: both;
  color: #000;
`;

const Input = styled.input`
  box-sizing: border-box;
  margin-bottom: 10px;
  border: 1px solid #8c8c8c;
  width: 343px;
  height: 37px;
  padding: 10px;

  &::placeholder {
    color: #8c8c8c;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 11px;
  width: 343px;
  height: 42px;
  border: none;
  background-color: ${({ $isFindPassword }) => ($isFindPassword ? "white" : "#138EFF")};
  color: ${({ $isFindPassword }) => ($isFindPassword ? " #515151;" : "white")};
  cursor: pointer;

  font-family: Pretendard;
  font-size: ${({ $isFindPassword }) => ($isFindPassword ? "#12px" : "14px")};
  font-weight: ${({ $isFindPassword }) => ($isFindPassword ? "400" : "700")};
  font-style: normal;
  line-height: normal;

  &:hover {
    background-color: ${({ $isFindPassword }) => ($isFindPassword ? "#f8f9fa" : "#007bff")};
  }
`;

const SignupPrompt = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpButton = styled(Button)`
  align-self: center;
  background-color: white;
  color: #000;
  border: 1px solid #8c8c8c;
  border-radius: 100px;
  width: 343px;
  height: 42px;

  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  &:hover {
    background: rgba(0, 0, 0, 0.16);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  }
`;

const IsFirst = styled.div`
  margin-top: 20px;
  margin-left: 25px;
  align-self: flex-start;

  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #000;
`;
