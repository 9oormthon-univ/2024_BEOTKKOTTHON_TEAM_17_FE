import React, { useState } from "react";
import styled from "styled-components";

import BackHeader from "../components/BackHeader";
import { useUserInfo } from "../store/store";

import CustomSelector from "../components/CustomSelector";
import Canvas from "../components/Canvas";

import { MainText, GuideText } from "../styles/Title";
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
            <BackHeader />
            <CustomPageCenter>
              <MainText>명함 커스텀</MainText>
              <GuideText>색상 변경 및 스티커를 활용해 나만의 명함을 만들어보세요.</GuideText>
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
`;

const CustomPageCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
