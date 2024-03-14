import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useSignUpStore from "../store/store";
import BackHeader from "../components/BackHeader";
import "../styles/Main.css";

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

    if (name === "phone") {
      const formattedValue = formatPhoneNum(value);
      setDisplayPhoneNumber(formattedValue); // 화면에 표시될 값 업데이트
      const originPhoneNum = value.replace(/[^0-9]/g, "");
      setUserData(name, originPhoneNum); // 하이푼 제거
    } else {
      setUserData(name, value);
    }
  };

  // '다음' 버튼 활성화 상태 결정
  const isActive = userData.name.length > 1 && userData.phone.length > 10;

  // '다음' 버튼 클릭 이벤트
  const handleNext = (e) => {
    e.preventDefault();
    navigate("/signup/step2");
    console.log(userData);
  };
  // 이전 화면으로 돌아와도 하이푼이 포함된 전화번호 유지
  React.useEffect(() => {
    if (userData.phone) {
      const formattedPhoneNumber = formatPhoneNum(userData.phone);
      setDisplayPhoneNumber(formattedPhoneNumber);
    }
  }, []);

  return (
    <div className="page">
      <div className="center">
        <SignUpPage1>
          <div className="page-space">
            <BackHeader />
            <Container>
              <FormText>
                반갑습니다!
                <br />
                <BoldSpan>가입을 위한 정보</BoldSpan>를 입력해주세요.
              </FormText>
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
                name="phone"
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
            </Container>
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

const NextButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #bdbdbd;
  color: #fff;
  cursor: default;

  font-family: Pretendard;
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
