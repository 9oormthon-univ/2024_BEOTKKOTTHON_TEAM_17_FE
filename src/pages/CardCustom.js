import React, { useRef, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import BackHeader from "../components/BackHeader";
import { useUserInfo } from "../store/store";

import CustomSelector from "../components/CustomSelector";
import Canvas from "../components/Canvas";

import { MainText, GuideText } from "../styles/Title";

import Undo from "../images/undo.png";
import Redo from "../images/redo.png";

import { saveCustom } from "../utils/axios";

const CardCustom = () => {
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];
  const navigate = useNavigate();

  const { userInfo } = useUserInfo();

  // Redo시에 돌리기를 위한 history
  const [undoStack, setUndoStack] = useState([]);

  const [customBackColor, setCustomBackColor] = useState(`${userInfo.bgColor}`);
  const [customTextColor, setCustomTextColor] = useState(`${userInfo.textColor}`);
  const [customStickers, setCustomStickers] = useState([]);

  const [addedImages, setAddedImages] = useState([]);
  const canvasRef = useRef(null);

  const handleSave = async () => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;

    // 캔버스의 실제 픽셀 기반 크기를 DPR로 나누어 스타일상의 크기를 얻음
    const adjustedWidth = canvas.width / dpr;
    const adjustedHeight = canvas.height / dpr;

    const stickers = addedImages.map((img, index) => ({
      type: img.name,
      // 조정된 캔버스 크기를 사용하여 상대적 위치 계산
      posX: img.x / adjustedWidth,
      posY: img.y / adjustedHeight,
      zindex: index - 100,
    }));

    const payload = {
      bgColor: customBackColor,
      textColor: customTextColor,
      stickerList: stickers,
    };

    try {
      const response = await saveCustom(payload, token);
      navigate("/mypage");
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }

    // 새로운 스티커 정보 배열을 customStickers 상태에 저장
    setCustomStickers(stickers);
  };

  const handleUndo = () => {
    if (addedImages.length > 0) {
      // 스티커가 하나 이상 있는 경우
      const newAddedImages = [...addedImages];
      const removedImage = newAddedImages.pop();
      setAddedImages(newAddedImages);
      setUndoStack([...undoStack, removedImage]);
    }
  };

  const handleRedo = () => {
    if (undoStack.length > 0) {
      const newUndoStack = [...undoStack];
      const redoImage = newUndoStack.pop();
      setUndoStack(newUndoStack);
      setAddedImages([...addedImages, redoImage]);
    }
  };

  const addImageToCanvas = (name, src) => {
    const img = new Image();
    img.onload = () => {
      setAddedImages([...addedImages, { name, src, x: 20, y: 20, width: 30, height: 30 }]);
    };
    img.src = src;
  };

  return (
    <div className="page">
      <div className="center">
        <CustomPage>
          <div className="page-space">
            <BackHeader redirectTo="/mypage" />
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
                  <StickerResetBtn>
                    <img src={Undo} alt="실행취소" style={{ height: "15px" }} onClick={handleUndo} />
                    <img src={Redo} alt="재실행" style={{ height: "15px" }} onClick={handleRedo} />
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

  width: 48px;
  height: 28px;
  background-color: #fff;
  border-radius: 14px 14px 14px 14px;
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.25));

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    margin-right: 28px;
  }

  img:first-child {
    margin-right: 4px; /* 첫 번째 이미지의 오른쪽 마진 조정 */
  }

  img:last-child {
    margin-left: 4px; /* 두 번째 이미지의 왼쪽 마진 조정 */
  }
`;

const Container = styled.div`
  margin-top: calc(135px - 28px);
`;
