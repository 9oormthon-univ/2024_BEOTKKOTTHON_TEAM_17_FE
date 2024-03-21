import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import BackHeader from "../components/BackHeader";
import styled from "styled-components";
import { MainText, GuideText } from "../styles/Title";
import { useUserInfo } from "../store/store";
import { mappedNameList, exceptCannotTransmitList } from "../components/MappedName";
import { saveAdditionalInfoDetails } from "../uitls/axios";

const AdditionalDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selected } = location.state || { selected: [] };
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];

  const [selectedOptions, setSelectedOptions] = useState(selected);

  const { userInfo } = useUserInfo();
  const userInfoToSubmit = Object.fromEntries(
    Object.entries(userInfo).filter(([key, value]) => !exceptCannotTransmitList.includes(key))
  );

  //   const [localUserInfo, setLocalUserInfo] = useState(userInfo);
  const [localUserInfo, setLocalUserInfo] = useState(userInfoToSubmit);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalUserInfo({ ...localUserInfo, [name]: value });
  };

  const [formFields, setFormFields] = useState(() => {
    const fields = selected.reduce((acc, key) => {
      acc[key] = userInfo[key] || "";
      return acc;
    }, {});
    return { ...userInfo, ...fields };
  });

  const handleSubmit = () => {
    try {
      const response = saveAdditionalInfoDetails(localUserInfo, token);
      console.log(response);
      navigate("/mypage");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(selectedOptions);
    console.log(localUserInfo);
  }, []);

  return (
    <div className="page">
      <div className="center">
        <PageBack>
          <div className="page-space">
            <BackHeader />
            <PageCenter>
              <MainText>{localUserInfo.name}님의 명함 정보</MainText>
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
                  onChange={handleChange}
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
              {selected.map((key) => (
                <>
                  <CustomGuide>{mappedNameList[key]}</CustomGuide>
                  <Container>
                    <Input
                      key={key}
                      name={key}
                      value={localUserInfo[key]}
                      onChange={handleChange}
                    />
                  </Container>
                </>
              ))}
              <CompleteBtn onClick={handleSubmit}>저장하기</CompleteBtn>
            </PageCenter>
          </div>
        </PageBack>
      </div>
    </div>
  );
};
export default AdditionalDetails;

const PageBack = styled.div`
  background: #fff;
`;

const PageCenter = styled.div`
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

  &::placeholder {
    color: #8c8c8c;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
  }
`;

const CompleteBtn = styled.div`
  margin-top: 30px;
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
