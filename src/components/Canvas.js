import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import { useUserInfo } from "../store/store";
import walletImg from "../images/wallet.png";
import schoolImg from "../images/school.png";
import callImg from "../images/call.png";
import pencilImg from "../images/pencil.png";

const _constants = {
  containerWidth: 343,
  containerHeight: 200,
};

const Canvas = ({ customBackColor, customTextColor, customStickers }) => {
  const {
    userInfo: { bgColor },
  } = useUserInfo();
  const canvasRef = useRef(null);
  const [addedImages, setAddedImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [draggingIdx, setDraggingIdx] = useState(null);

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
    // 이벤트 리스너에 추가할 로직
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

    // 캔버스에 touchmove 이벤트 리스너를 추가합니다.
    const canvas = canvasRef.current;
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    // 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거합니다.
    return () => {
      canvas.removeEventListener("touchmove", handleTouchMove, { passive: false });
    };
  }, [dragging, addedImages, draggingIdx]);

  const addImageToCanvas = (name, src) => {
    const img = new Image();
    img.onload = () => {
      setAddedImages([...addedImages, { name, src, x: 0, y: 0, width: 30, height: 30 }]);
    };
    img.src = src;
  };

  const onMouseDown = (e) => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    addedImages.forEach((img, idx) => {
      if (mouseX > img.x && mouseX < img.x + img.width && mouseY > img.y && mouseY < img.y + img.height) {
        setDragging(true);
        setDraggingIdx(idx);
      }
    });
  };

  const onMouseMove = (e) => {
    if (dragging) {
      const mouseX = e.nativeEvent.offsetX;
      const mouseY = e.nativeEvent.offsetY;
      setAddedImages(
        addedImages.map((img, idx) => {
          if (idx === draggingIdx) {
            return { ...img, x: mouseX - img.width / 2, y: mouseY - img.height / 2 };
          }
          return img;
        })
      );
    }
  };

  const onMouseUp = () => {
    setDragging(false);
    setDraggingIdx(null);
  };

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    const offsetX = touch.clientX - canvasRef.current.getBoundingClientRect().left;
    const offsetY = touch.clientY - canvasRef.current.getBoundingClientRect().top;
    addedImages.forEach((img, idx) => {
      if (offsetX > img.x && offsetX < img.x + img.width && offsetY > img.y && offsetY < img.y + img.height) {
        setDragging(true);
        setDraggingIdx(idx);
        e.preventDefault();
      }
    });
  };

  const onTouchMove = (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
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
    e.preventDefault();
    setAddedImages(
      addedImages.map((img, idx) => {
        if (idx === draggingIdx) {
          return { ...img, x: newX, y: newY };
        }
        return img;
      })
    );
  };

  const onTouchEnd = () => {
    setDragging(false);
    setDraggingIdx(null);
  };

  const handleCompletion = () => {
    console.log("캔버스에 존재하는 이미지들과 좌표:");
    addedImages.forEach((img) => {
      //   console.log(`이미지: ${img.name}, x: ${img.x}, y: ${img.y}`);
      const relativeX = img.x / canvasRef.current.width;
      const relativeY = img.y / canvasRef.current.height;
      console.log(`이미지: ${img.name}, relative x: ${relativeX}, relative y: ${relativeY}`);
    });
  };
  return (
    <>
      <ImageSelection>
        <img
          src={walletImg}
          alt="Wallet"
          onClick={() => addImageToCanvas("Wallet", walletImg)}
        />
        <img
          src={schoolImg}
          alt="School"
          onClick={() => addImageToCanvas("School", schoolImg)}
        />
        <img
          src={callImg}
          alt="Call"
          onClick={() => addImageToCanvas("Call", callImg)}
        />
        <img
          src={pencilImg}
          alt="Pencil"
          onClick={() => addImageToCanvas("Pencil", pencilImg)}
        />
      </ImageSelection>
      <CanvasContainer>
        <StyledCanvas
          ref={canvasRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseMove={onMouseMove}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      </CanvasContainer>
      <button onClick={handleCompletion}>수정 완료</button>
    </>
  );
};

export default Canvas;

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
