import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import BackHeader from "../components/BackHeader";
import { useUserInfo } from "../store/store";

import CustomSelector from "../components/CustomSelector";
import Canvas from "../components/Canvas";

import { MainText, GuideText } from "../styles/Title";

import TrashImg from "../images/trash.png";

const CardCustom = () => {
  const { userInfo } = useUserInfo();
  const [customBackColor, setCustomBackColor] = useState(`${userInfo.bgColor}`);
  const [customTextColor, setCustomTextColor] = useState(`${userInfo.textColor}`);
  const [customStickers, setCustomStickers] = useState([]);

  const [addedImages, setAddedImages] = useState([]);
  const canvasRef = useRef(null);

  const handleSave = () => {
    const stickers = addedImages.map((img, index) => ({
      type: img.name,
      posX: img.x / canvasRef.current.width,
      posY: img.y / canvasRef.current.height,
      zIndex: index - 100,
    }));

    // 새로운 스티커 정보 배열을 customStickers 상태에 저장
    setCustomStickers(stickers);
  };

  useEffect(() => {
    // 저장하기 버튼을 누를시 console에 좌표 출력
    console.log(customStickers);
  }, [customStickers]);

  const handleResetStickers = () => {
    setAddedImages([]);
  };

  const addImageToCanvas = (name, src) => {
    const img = new Image();
    img.onload = () => {
      setAddedImages([...addedImages, { name, src, x: 0, y: 0, width: 30, height: 30 }]);
    };
    img.src = src;
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

              <Container>
                <Canvas
                  customBackColor={customBackColor}
                  customTextColor={customTextColor}
                  customStickers={customStickers}
                  addedImages={addedImages}
                  setAddedImages={setAddedImages}
                  canvasRef={canvasRef}
                  addImageToCanvas={addImageToCanvas}
                />
                <ResetBtnSpace>
                  <StickerResetBtn onClick={handleResetStickers}>
                    <img
                      src={TrashImg}
                      alt="스티커초기화"
                      style={{ height: "35px" }}
                    />
                  </StickerResetBtn>
                </ResetBtnSpace>
                <SelectorContainer>
                  <CustomSelector
                    setCustomBackColor={setCustomBackColor}
                    setCustomTextColor={setCustomTextColor}
                    setCustomStickers={setCustomStickers}
                    setAddedImages={setAddedImages}
                    addedImages={addedImages}
                  />
                  <SaveButton onClick={handleSave}>저장하기</SaveButton>
                </SelectorContainer>
              </Container>
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

const ResetBtnSpace = styled.div`
  width: 100vw;
  display: flex;
  justify-content: flex-end;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

const StickerResetBtn = styled.div`
  margin-top: -38px;
  margin-right: 6vw;

  width: 28px;
  height: 28px;
  background-color: #fff;
  border-radius: 100%;
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.25));

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    margin-right: calc(375px * 0.04);
  }
`;

const Container = styled.div`
  margin-top: calc(135px - 20px - 17px);
`;
