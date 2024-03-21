import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import { useUserInfo } from "../store/store";
import walletImg from "../images/wallet.png";
import schoolImg from "../images/school.png";
import callImg from "../images/call.png";
import pencilImg from "../images/pencil.png";
import { useDragAndDrop } from "../uitls/dragNdrop";
import WrapCard from "./WrapCard";

const _constants = {
  containerWidth: 343,
  containerHeight: 200,
};

const Canvas = ({
  customBackColor,
  customTextColor,
  customStickers,
  addedImages,
  setAddedImages,
  canvasRef,
  addImageToCanvas,
}) => {
  const { userInfo } = useUserInfo();
  const [dragging, setDragging] = useState(false);
  const [draggingIdx, setDraggingIdx] = useState(null);

  const [showCard, setShowCard] = useState(true);

  const { onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd } = useDragAndDrop(
    setAddedImages,
    setDragging,
    setDraggingIdx,
    canvasRef
  );

  // useEffect(() => {
  //   const resizeCanvas = () => {
  //     const canvas = canvasRef.current;
  //     const container = canvas.parentElement;
  //     const context = canvas.getContext("2d");

  // canvas.width = container.offsetWidth;
  // canvas.height = _constants.containerHeight; // 높이는 200px로 고정

  //     context.clearRect(0, 0, canvas.width, canvas.height);
  //     context.fillStyle = `${customBackColor}`;
  //     context.fillRect(0, 0, canvas.width, canvas.height);

  //     addedImages.forEach((imgInfo) => {
  //       const img = new Image();
  //       img.onload = () => {
  //         context.drawImage(img, imgInfo.x, imgInfo.y, imgInfo.width, imgInfo.height);
  //       };
  //       img.src = imgInfo.src;
  //     });
  //   };

  //   window.addEventListener("resize", resizeCanvas);
  //   resizeCanvas(); // 초기 로드 시에도 캔버스 크기를 설정

  //   return () => window.removeEventListener("resize", resizeCanvas);
  // }, [addedImages, customBackColor]); // addedImages가 변경될 때마다 useEffect를 다시 실행

  useEffect(() => {
    // 모든 이미지를 미리 로드하고 이미지 객체를 저장
    const imageObjects = {};

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    const loadAllImages = async () => {
      const loadPromises = addedImages.map((imgInfo) =>
        loadImage(imgInfo.src).then((img) => {
          imageObjects[imgInfo.src] = img;
        })
      );

      await Promise.all(loadPromises);

      // 이미지 로드 완료 후 캔버스에 처음으로 그리기
      drawCanvas();
    };

    loadAllImages();

    const drawCanvas = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const container = canvas.parentElement;

      canvas.width = container.offsetWidth;
      canvas.height = _constants.containerHeight;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = customBackColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      addedImages.forEach((imgInfo) => {
        const img = imageObjects[imgInfo.src];
        if (img) {
          context.drawImage(img, imgInfo.x, imgInfo.y, imgInfo.width, imgInfo.height);
        }
      });
    };

    // Resize 이벤트 핸들러에서도 drawCanvas 호출
    window.addEventListener("resize", drawCanvas);

    return () => {
      window.removeEventListener("resize", drawCanvas);
    };
  }, [addedImages, customBackColor]); // Dependencies에 적절히 조정

  useEffect(() => {
    const handleTouchMove = (event) => {
      if (!dragging) return;
      event.preventDefault();
      const touch = event.touches[0];
      const offsetX = touch.clientX - canvasRef.current.getBoundingClientRect().left;
      const offsetY = touch.clientY - canvasRef.current.getBoundingClientRect().top;

      const newX = Math.min(
        Math.max(0, offsetX - addedImages[draggingIdx].width / 2),
        canvasRef.current.width - addedImages[draggingIdx].width
      );
      const newY = Math.min(
        Math.max(0, offsetY - addedImages[draggingIdx].height / 2),
        canvasRef.current.height - addedImages[draggingIdx].height
      );

      setAddedImages(
        addedImages.map((img, idx) => {
          if (idx === draggingIdx) {
            return { ...img, x: newX, y: newY };
          }
          return img;
        })
      );
    };

    // 캔버스에 touchmove 이벤트 리스너를 추가
    const canvas = canvasRef.current;
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    // 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거
    return () => {
      canvas.removeEventListener("touchmove", handleTouchMove, { passive: false });
    };
  }, [dragging, addedImages, draggingIdx]);

  return (
    <CanvasDiv>
      <CanvasContainer>
        <StyledCanvas
          ref={canvasRef}
          onTouchStart={(e) => onTouchStart(e, addedImages)}
          onTouchMove={(e) => onTouchMove(e, dragging, draggingIdx, addedImages)}
          onTouchEnd={() => onTouchEnd(setDragging, setDraggingIdx)}
          onMouseDown={(e) => onMouseDown(e, addedImages)}
          onMouseMove={(e) => onMouseMove(e, dragging, draggingIdx, addedImages)}
          onMouseUp={() => onMouseUp(setDragging, setDraggingIdx)}
        />
        {showCard && (
          <CardWrapper>
            <WrapCard
              userData={userInfo}
              customTextColor={customTextColor}
            />
          </CardWrapper>
        )}
      </CanvasContainer>
    </CanvasDiv>
  );
};

export default Canvas;

const CanvasDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CanvasContainer = styled.div`
  // margin-top: 129px;

  width: calc(100vw - 32px);
  max-width: 580px;
  height: 200px;
  border-radius: 10px;
  background: #ffe3e7;
  box-shadow: 0 0 5px 0 #e8e8e8;
  display: flex;
  flex-direction: column;

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
    height: 200px;
  }

  position: relative;
`;

const StyledCanvas = styled.canvas`
  border-radius: 10px;
  box-shadow: 0 0 5px 0 #e8e8e8;

  display: block;
  margin: auto;

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
    height: 200px;
  }
`;

const CardWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  pointer-events: none;
`;
