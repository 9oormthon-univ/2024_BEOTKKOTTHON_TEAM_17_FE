// SignUpStep2.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignUpStore from "../store/store";
import styled from "styled-components";
import BackHeader from "../components/BackHeader";

const SignUpStep2 = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useSignUpStore();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(userData.username.length >= 4 && userData.password.length >= 4);
  }, [userData.username, userData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 로직 구현 (API 연동)
    navigate("/"); // 메인으로 리다이렉트
    console.log(userData);
  };

  return (
    <div className="page">
      <div className="center">
        <SignUpPage2>
          <div className="page-space">
            <BackHeader />
            <Container>
              <FormText>
                PONNECT에서 사용할 <br />
                <BoldSpan>아이디와 비밀번호</BoldSpan>를 설정해주세요.
              </FormText>
              <Label>아이디</Label>
              <Input
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="이메일을 입력해주세요."
                value={userData.username}
              />
              <Label>비밀번호</Label>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="4자리 이상 입력해주세요."
                value={userData.password}
              />
              <Button
                $isActive={isActive}
                disabled={!isActive}
                onClick={handleSubmit}
              >
                완료
              </Button>
            </Container>
          </div>
        </SignUpPage2>
      </div>
    </div>
  );
};

export default SignUpStep2;

//---
const SignUpPage2 = styled.div`
  background-color: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FormText = styled.span`
  margin-top: 60px;
  margin-bottom: 43px;
  align-self: flex-start;
  color: #000;

  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const BoldSpan = styled.span`
  color: #000;

  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Label = styled.label`
  margin-bottom: 6px;
  align-self: flex-start;
  margin-top: 6px;

  color: #000;

  leading-trim: both;

  text-edge: cap;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Input = styled.input`
  width: 343px;
  height: 37px;

  box-sizing: border-box;
  margin-bottom: 11px;
  border: 1px solid #8c8c8c;

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
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #bdbdbd;
  color: #fff;
  cursor: default;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  width: 343px;
  height: 42px;
  ${({ $isActive }) =>
    $isActive &&
    `
    background-color: #138eff; 
    cursor: pointer;
    &:hover {
      background-color: #006eee;
  }
`}
`;
