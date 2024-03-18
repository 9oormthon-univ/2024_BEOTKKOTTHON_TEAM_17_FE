import React, { useState } from "react";
import styled from "styled-components";

import Card from "../components/Card";
import BackQRHeader from "../components/BackQRHeader";
import { useUserInfo } from "../store/store";

import CustomSelector from "../components/CustomSelector";
import Canvas from "../components/Canvas";

const CardCustom = () => {
  const { userInfo } = useUserInfo();
  const [customBackColor, setCustomBackColor] = useState(`${userInfo.bgColor}`);
  const [customTextColor, setCustomTextColor] = useState(`${userInfo.textColor}`);
  const [customStickers, setCustomStickers] = useState([]);
  return (
    <div className="page">
      <div className="center">
        <CustomPage>
          <div className="page-space">
            <BackQRHeader />
            <CustomPageCenter>
              <MainText>명함 커스텀</MainText>
              <GuideText>색상 변경 및 스티커를 활용해 나만의 명함을 만들어보세요.</GuideText>
              <Card userData={userInfo} />
              <Canvas
                customBackColor={customBackColor}
                customTextColor={customTextColor}
                customStickers={customStickers}
              />
              <CustomSelector
                setCustomBackColor={setCustomBackColor}
                setCustomTextColor={setCustomTextColor}
                setCustomStickers={setCustomStickers}
              />

              <Test>
                <Card userData={userInfo} />
              </Test>
            </CustomPageCenter>
          </div>
        </CustomPage>
      </div>
    </div>
  );
};

export default CardCustom;

const CustomPage = styled.div`
  background: #fff;
  border: 1px solid black;
`;

const CustomPageCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainText = styled.div`
  align-self: flex-start;
  margin-top: 20px;
  margin-bottom: 17px;
  margin-left: 16px;

  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const GuideText = styled.div`
  align-self: flex-start;
  margin-left: 16px;

  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Test = styled.div`
  transform: scale(0.5);
`;
