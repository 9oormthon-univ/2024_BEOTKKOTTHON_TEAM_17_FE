// SignUpStep2.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignUpStore from "../store/store";
import styled from "styled-components";

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
    <Form onSubmit={handleSubmit}>
      <Title>
        PONNECT에서 사용할 <br />
        아이디와 비밀번호를 설정해주세요.
      </Title>
      <Label htmlFor="username">아이디</Label>
      <Input
        id="username"
        type="text"
        name="username"
        onChange={handleChange}
        placeholder="이메일을 입력해주세요."
        value={userData.username}
      />
      <Label htmlFor="password">비밀번호</Label>
      <Input
        id="password"
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="4자리 이상 입력해주세요."
        value={userData.password}
      />
      <SubmitButton
        $isActive={isActive}
        disabled={!isActive}
      >
        완료
      </SubmitButton>
    </Form>
  );
};

export default SignUpStep2;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 20px; // 제목과 입력 필드 사이의 간격
  align-self: flex-start;
`;

const Label = styled.label`
  margin-bottom: 6px;
  align-self: flex-start;
  margin-top: 10px; // 레이블 상단의 간격
  font-size: smaller; // 레이블의 폰트 크기를 작게 설정
`;

const Input = styled.input`
  margin-bottom: 10px; // 입력 필드 사이의 간격
  padding: 10px;
  border: 1px solid #ccc;

  width: 87vw;
`;

const SubmitButton = styled.button`
  margin-top: 20px; // 버튼 상단의 간격
  padding: 10px 20px;
  border: none;
  background-color: #ccc; // 비활성화 상태의 배경색
  color: white;
  cursor: default;
  width: 90vw;

  ${({ $isActive }) =>
    $isActive &&
    `
    background-color: #138eff; // 활성화 상태의 배경색
    cursor: pointer;
    &:hover {
      background-color: #006eee;
    }
  `}
`;
