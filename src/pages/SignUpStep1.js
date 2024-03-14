import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useSignUpStore from "../store/store";
import DefaultHeader from "../components/DefaultHeader";

const SignUpStep1 = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useSignUpStore();
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState("");

  // 자동으로 하이푼을 추가해주는 로직
  const formatPhoneNum = (num) => {
    const cleaned = num
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    return cleaned;
  };

  // 상태 변화 함수
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const formattedValue = formatPhoneNum(value);
      setDisplayPhoneNumber(formattedValue); // 화면에 표시될 값 업데이트
      const originPhoneNum = value.replace(/[^0-9]/g, "");
      setUserData(name, originPhoneNum); // 하이푼 제거
    } else {
      setUserData(name, value);
    }
  };

  // '다음' 버튼 활성화 상태 결정
  const isActive = userData.name.length > 1 && userData.phoneNumber.length > 10;

  // '다음' 버튼 클릭 이벤트
  const handleNext = (e) => {
    e.preventDefault();
    navigate("/signup/step2");
    console.log(userData);
  };
  // 이전 화면으로 돌아와도 하이푼이 포함된 전화번호 유지
  React.useEffect(() => {
    if (userData.phoneNumber) {
      const formattedPhoneNumber = formatPhoneNum(userData.phoneNumber);
      setDisplayPhoneNumber(formattedPhoneNumber);
    }
  }, []);

  return (
    <div className="page">
      <div className="center">
        <SignUpPage1>
          <div className="page-space">
            <DefaultHeader />
            <Form>
              <WelcomeText>
                반갑습니다!
                <br />
                <boldSpan>가입을 위한 정보</boldSpan>를 입력해주세요.
              </WelcomeText>
              <Input
                type="text"
                placeholder="이름을 입력해주세요"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
              <Input
                type="text"
                placeholder="휴대폰 번호를 -없이 입력해주세요"
                name="phoneNumber"
                value={displayPhoneNumber}
                maxLength={13}
                onChange={handleChange}
              />
              <NextButton
                onClick={handleNext}
                $isActive={isActive}
                disabled={!isActive}
              >
                다음
              </NextButton>
            </Form>
          </div>
        </SignUpPage1>
      </div>
    </div>
  );
};

export default SignUpStep1;

const SignUpPage1 = styled.div`
  background-color: #fff;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const WelcomeText = styled.h3`
  margin-bottom: 20px; // 제목과 입력 필드 사이의 간격
  align-self: flex-start;
`;

const boldSpan = styled.span``;

const Input = styled.input`
  margin-bottom: 20px; // 입력 필드 사이의 간격
  padding: 10px;
  border: 1px solid #ccc;

  width: 87vw;
`;

const NextButton = styled.button`
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
