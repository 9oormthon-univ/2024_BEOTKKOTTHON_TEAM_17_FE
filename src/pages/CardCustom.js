import React, { useRef, useState } from "react";
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

  const [addedImages, setAddedImages] = useState([]);
  const canvasRef = useRef(null);

  const handleSave = () => {
    console.log("캔버스에 존재하는 스티커의 상대 좌표:");
    addedImages.forEach((img) => {
      //   console.log(`이미지: ${img.name}, x: ${img.x}, y: ${img.y}`);
      const relativeX = img.x / canvasRef.current.width;
      const relativeY = img.y / canvasRef.current.height;
      console.log(`스티커: ${img.name}, Relative x: ${relativeX}, Relative y: ${relativeY}`);
    });
  };

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
                addedImages={addedImages}
                setAddedImages={setAddedImages}
                canvasRef={canvasRef}
              />
              <SelectorContainer>
                <CustomSelector
                  setCustomBackColor={setCustomBackColor}
                  setCustomTextColor={setCustomTextColor}
                  setCustomStickers={setCustomStickers}
                  setAddedImages={setAddedImages}
                />
                <SaveButton onClick={handleSave}>저장하기</SaveButton>
              </SelectorContainer>
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

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;

  // background: #000;
`;

const SaveButton = styled.button`
  margin-left: 9px;
  width: 100px;
  height: 42px;
  border-radius: 100px;
  border: none;
  background: #fff;
  filter: drop-shadow(0px 0px 4px rgba(19, 142, 255, 0.8));

  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
