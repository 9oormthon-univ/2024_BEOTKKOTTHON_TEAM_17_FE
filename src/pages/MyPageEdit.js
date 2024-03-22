import BackHeader from "../components/BackHeader";
import "../styles/Main.css";
import styled from "styled-components";
import { GuideText, MainText } from "../styles/Title";
import { useUserInfo } from "../store/store";
import React, { useState, useEffect } from "react";
import PlusInfoBtn from "../components/PlusInfoBtn";
import { useNavigate } from "react-router-dom";
import { mappedNameList, exceptCannotSelectList, exceptCannotTransmitList } from "../components/MappedName";
import { saveAdditionalInfoDetails } from "../utils/axios";
import { useCookies } from "react-cookie";

const MyPageEdit = () => {
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userInfo } = useUserInfo();

  // userInfoToSubmit은 userInfo에서 cardId, userId, qrUrl, bgColor, .. 등이 빠진 새로운 객체
  const userInfoToSubmit = Object.fromEntries(
    Object.entries(userInfo).filter(([key, value]) => !exceptCannotTransmitList.includes(key))
  );

  // const [localUserInfo, setLocalUserInfo] = useState(userInfo);
  const [localUserInfo, setLocalUserInfo] = useState(userInfoToSubmit);

  const navigate = useNavigate();

  const mappedName = mappedNameList;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalUserInfo({ ...localUserInfo, [name]: value });
  };

  const linkToNext = () => {
    const selectedOptions = Object.entries(localUserInfo)
      .filter(([key, value]) => value !== null && !exceptCannotSelectList.includes(key))
      .map(([key]) => key);
    navigate("/mypage/edit/additional", { state: { selected: selectedOptions } });
  };

  const handleSave = async () => {
    try {
      const response = await saveAdditionalInfoDetails(localUserInfo, token);
      setLocalUserInfo(response.data);
      console.log(localUserInfo);
      // console.log(response.data);
      navigate("/mypage");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="page">
      <div className="center">
        <EditPageBack>
          <div className="page-space">
            <BackHeader redirectTo={"/mypage"} />
            <EditPageCenter>
              <MainText>{userInfo.name}님의 명함 정보</MainText>
              <GuideText style={{ marginBottom: "16px" }}>
                연동된 정보 외에 최대 4개의 정보를 입력하실 수 있어요.
              </GuideText>
              <CustomGuide>이름</CustomGuide>
              <Container>
                <Input
                  name="name"
                  value={localUserInfo.name}
                  onChange={handleChange}
                  maxLength={7}
                />
              </Container>
              <CustomGuide>전화번호</CustomGuide>
              <Container>
                <Input
                  name="phone"
                  value={localUserInfo.phone}
                  onChange={handleChange}
                  maxLength={11}
                />
              </Container>
              <CustomGuide>이메일</CustomGuide>
              <Container>
                <Input
                  name="email"
                  value={localUserInfo.email}
                  readOnly
                />
              </Container>
              <CustomGuide>상태</CustomGuide>
              <Container>
                <Input
                  name="status"
                  value={localUserInfo.status}
                  onChange={handleChange}
                  placeholder="기분, 감정 등 내 상태를 6자 이내로 작성해보세요."
                />
              </Container>
              {Object.entries(localUserInfo).map(([key, value]) => {
                if (
                  value !== null &&
                  ![
                    "name",
                    "phone",
                    "email",
                    "status",
                    "cardId",
                    "userId",
                    "qrUrl",
                    "bgColor",
                    "textColor",
                    "stickerDtoList",
                  ].includes(key)
                ) {
                  const title = mappedName[key] || key;
                  return (
                    <>
                      <CustomGuide>{title}</CustomGuide>
                      <Container>
                        <Input
                          id={key}
                          name={key}
                          value={localUserInfo[key]}
                          onChange={handleChange}
                        />
                      </Container>
                    </>
                  );
                }
                return null;
              })}
              <PlusInfoBtn onClick={linkToNext} />
              <SubText>추가 정보 입력하기</SubText>
              <CompleteBtn onClick={handleSave}>저장하기</CompleteBtn>
            </EditPageCenter>
          </div>
        </EditPageBack>
      </div>
    </div>
  );
};

export default MyPageEdit;

const EditPageBack = styled.div`
  background: #fff;
`;

const EditPageCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomGuide = styled(GuideText)`
  font-size: 14px;
  font-weight: 700;

  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Input = styled.input`
  box-sizing: border-box;
  margin-bottom: 15px;
  border: 1px solid #8c8c8c;
  border-radius: 2px;
  width: calc(100vw - 32px);
  max-width: 580px;
  height: 37px;
  padding: 10px;
  outline: none;

  color: #8c8c8c;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #8c8c8c;
  }
  @media (hover: hover) and (pointer: fine) {
    width: 343px;
  }
`;

const CompleteBtn = styled.div`
  margin-top: 9px;
  margin-bottom: 20px;
  cursor: pointer;

  width: calc(100vw - 32px);
  height: 42px;
  border-radius: 100px;
  background: #138eff;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
  }
`;

const SubText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  margin-top: 17px;
  margin-bottom: 54px;
`;
