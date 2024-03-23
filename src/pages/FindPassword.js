import "../styles/Main.css";
import styled from "styled-components";
import React, { useState } from "react";
import BackHeader from "../components/BackHeader";
import { findPassword } from "../utils/axios";
import ModalPassword from "../components/ModalPassword";
import { useNavigate } from "react-router-dom";

const FindPassword = () => {
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState("");
  const [findInfoData, setFindInfoData] = useState({
    email: "",
    phone: "",
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [foundUser, setFoundUser] = useState(false);
  const navigate = useNavigate();

  const linkSignIn = () => {
    setIsShowModal(false);
    navigate("/signin");
  };
  const onClose = () => {
    setIsShowModal(false);
  };

  const formatPhoneNum = (num) => {
    const cleaned = num
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    return cleaned;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formattedValue = formatPhoneNum(value);
      setDisplayPhoneNumber(formattedValue);
      const originPhoneNum = value.replace(/[^0-9]/g, "");
      setFindInfoData({
        ...findInfoData,
        [name]: originPhoneNum,
      });
    } else {
      setFindInfoData({
        ...findInfoData,
        [name]: value,
      });
    }
  };

  const isActive = findInfoData.email.length > 3 && findInfoData.phone.length > 10;

  const handleComplete = async () => {
    try {
      const res = await findPassword(findInfoData);
      setIsShowModal(true);
      setFoundUser(true);
      console.log("성공");
    } catch (error) {
      setIsShowModal(true);
      setFoundUser(false);
      console.log("비밀번호 찾기 실패", error);
    }
  };

  return (
    <div className="page">
      <div className="center">
        <MainPage>
          <div className="page-space">
            <BackHeader redirectTo={"/signin"} />
            <Container>
              <FormText>
                회원가입 시 사용하신
                <br />
                <BoldSpan>이메일과 전화번호</BoldSpan>를 입력해주세요.
              </FormText>
              <Input
                type="email"
                placeholder="이메일을 입력해주세요"
                name="email"
                value={findInfoData.email}
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
              <CompleteButton
                onClick={handleComplete}
                $isActive={isActive}
                disabled={!isActive}
              >
                완료
              </CompleteButton>
              {isShowModal && (
                <ModalPassword
                  linkSignIn={linkSignIn}
                  foundUser={foundUser}
                  onClose={onClose}
                />
              )}
            </Container>
          </div>
        </MainPage>
      </div>
    </div>
  );
};

export default FindPassword;

const MainPage = styled.div`
  background: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormText = styled.span`
  margin-top: 60px;
  margin-bottom: 43px;
  margin-left: 16px;
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
  width: calc(100vw - 32px);
  max-width: 580px;
  height: 37px;

  box-sizing: border-box;
  margin-bottom: 11px;
  border: 1px solid #8c8c8c;

  padding: 10px;
  outline: none;

  &::placeholder {
    color: #8c8c8c;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
  }
`;

const CompleteButton = styled.button`
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
  transition: 400ms ease-in-out;

  width: calc(100vw - 32px);
  max-width: 580px;
  height: 42px;
  ${({ $isActive }) =>
    $isActive &&
    `
    background-color: #138eff; 
    cursor: pointer;
    &:hover {
      background-color: #006eee;
      transition: 400ms ease-in-out;
  }
`}

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
  }
`;
