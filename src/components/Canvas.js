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

const Canvas = ({ customBackColor, customTextColor, customStickers }) => {
  const { userInfo } = useUserInfo();
  const canvasRef = useRef(null);
  const [addedImages, setAddedImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [draggingIdx, setDraggingIdx] = useState(null);

  const [showCard, setShowCard] = useState(true);

  const [addImageToList, setAddImageToList] = useState([]);

  const { onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd } = useDragAndDrop(
    setAddedImages,
    setDragging,
    setDraggingIdx,
    canvasRef
  );

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = canvas.parentElement;
      const context = canvas.getContext("2d");

      canvas.width = container.offsetWidth;
      canvas.height = _constants.containerHeight; // 높이는 200px로 고정

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = `${customBackColor}`;
      context.fillRect(0, 0, canvas.width, canvas.height);

      addedImages.forEach((imgInfo) => {
        const img = new Image();
        img.onload = () => {
          context.drawImage(img, imgInfo.x, imgInfo.y, imgInfo.width, imgInfo.height);
        };
        img.src = imgInfo.src;
      });
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // 초기 로드 시에도 캔버스 크기를 설정

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [addedImages, customBackColor]); // addedImages가 변경될 때마다 useEffect를 다시 실행

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

  // const onTouchStart = (e) => {
  //   const touch = e.touches[0];
  //   const offsetX = touch.clientX - canvasRef.current.getBoundingClientRect().left;
  //   const offsetY = touch.clientY - canvasRef.current.getBoundingClientRect().top;
  //   addedImages.forEach((img, idx) => {
  //     if (offsetX > img.x && offsetX < img.x + img.width && offsetY > img.y && offsetY < img.y + img.height) {
  //       toggleDrag(true);
  //       setDraggingIdx(idx);
  //       e.preventDefault();
  //     }
  //   });
  // };

  // const onTouchMove = (e) => {
  //   if (!dragging) return;
  //   window.requestAnimationFrame(() => {
  //     const touch = e.touches[0];
  //     const offsetX = touch.clientX - canvasRef.current.getBoundingClientRect().left;
  //     const offsetY = touch.clientY - canvasRef.current.getBoundingClientRect().top;

  //     const newX = Math.min(
  //       Math.max(0, offsetX - addedImages[draggingIdx].width / 2),
  //       canvasRef.current.width - addedImages[draggingIdx].width
  //     );
  //     const newY = Math.min(
  //       Math.max(0, offsetY - addedImages[draggingIdx].height / 2),
  //       canvasRef.current.height - addedImages[draggingIdx].height
  //     );
  //     e.preventDefault();
  //     setAddedImages(
  //       addedImages.map((img, idx) => {
  //         if (idx === draggingIdx) {
  //           return { ...img, x: newX, y: newY };
  //         }
  //         return img;
  //       })
  //     );
  //   });
  // };

  // const onTouchEnd = () => {
  //   toggleDrag(false);
  //   setDraggingIdx(null);
  // };

  const handleCompletion = () => {
    console.log("캔버스에 존재하는 스티커의 상대 좌표:");
    addedImages.forEach((img) => {
      //   console.log(`이미지: ${img.name}, x: ${img.x}, y: ${img.y}`);
      const relativeX = img.x / canvasRef.current.width;
      const relativeY = img.y / canvasRef.current.height;
      console.log(`스티커: ${img.name}, Relative x: ${relativeX}, Relative y: ${relativeY}`);
    });
  };

  const addImageToCanvas = () => {
    addImageToList.forEach((image) => {
      const img = new Image();
      img.onload = () => {
        // 이미지 로드가 완료되면 상태 업데이트
        setAddedImages((prevImages) => [
          ...prevImages,
          {
            ...image,
            // 필요하다면 여기에서 추가적인 속성을 설정할 수 있습니다.
          },
        ]);
      };
      img.src = image.src;
    });
  };

  return (
    <CanvasDiv>
      <ImageSelection>
        <img
          src={walletImg}
          alt="Wallet"
          onClick={() =>
            setAddImageToList([
              ...addImageToList,
              { name: "Wallet", src: walletImg, x: 0, y: 0, width: 30, height: 30 },
            ])
          }
        />
        <img
          src={schoolImg}
          alt="School"
          onClick={() =>
            setAddImageToList([
              ...addImageToList,
              { name: "School", src: schoolImg, x: 0, y: 0, width: 30, height: 30 },
            ])
          }
        />
        <img
          src={callImg}
          alt="Call"
          onClick={() =>
            setAddImageToList([...addImageToList, { name: "Call", src: callImg, x: 0, y: 0, width: 30, height: 30 }])
          }
        />
        <img
          src={pencilImg}
          alt="Pencil"
          onClick={() =>
            setAddImageToList([
              ...addImageToList,
              { name: "Pencil", src: pencilImg, x: 0, y: 0, width: 30, height: 30 },
            ])
          }
        />
      </ImageSelection>
      <button onClick={addImageToCanvas}>추가하기</button>
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
      <button onClick={handleCompletion}>수정 완료</button>
    </CanvasDiv>
  );
};

export default Canvas;

const CanvasDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageSelection = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;

  margin-bottom: 20px;
  margin-top: 20px;
  img {
    width: 50px;
    height: 50px;
    margin: 0 10px;
    cursor: pointer;
  }
`;

const CanvasContainer = styled.div`
  margin-top: 10px;

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
