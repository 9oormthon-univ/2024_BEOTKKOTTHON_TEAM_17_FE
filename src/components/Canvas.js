// import styled from "styled-components";
// import React, { useState, useEffect } from "react";
// import { useStoreSize, useUserInfo } from "../store/store";
// import { useDragAndDrop } from "../utils/dragNdrop";
// import WrapCard from "./WrapCard";
// import { stickerMapping } from "../utils/mappingStickers";

// const _constants = {
//   containerWidth: 343,
//   containerHeight: 200,
// };

// const Canvas = ({
//   customBackColor,
//   customTextColor,
//   customStickers,
//   addedImages,
//   setAddedImages,
//   canvasRef,
//   addImageToCanvas,
// }) => {
//   const { userInfo } = useUserInfo();
//   const [dragging, setDragging] = useState(false);
//   const [draggingIdx, setDraggingIdx] = useState(null);

//   const [showCard, setShowCard] = useState(true);
//   const { cardDimensions } = useStoreSize();

//   const { onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd } = useDragAndDrop(
//     setAddedImages,
//     setDragging,
//     setDraggingIdx,
//     canvasRef
//   );

//   /*
//   useEffect(() => {
//     // 모든 이미지를 미리 로드하고 이미지 객체를 저장
//     const imageObjects = {};

//     const loadImage = (src) => {
//       return new Promise((resolve, reject) => {
//         const img = new Image();
//         img.onload = () => resolve(img);
//         img.onerror = reject;
//         img.src = src;
//       });
//     };

//     const loadAllImages = async () => {
//       const loadPromises = addedImages.map((imgInfo) =>
//         loadImage(imgInfo.src).then((img) => {
//           imageObjects[imgInfo.src] = img;
//         })
//       );

//       await Promise.all(loadPromises);

//       // 이미지 로드 완료 후 캔버스에 처음으로 그리기
//       drawCanvas();
//     };

//     loadAllImages();

//     const drawCanvas = () => {
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
//       const container = canvas.parentElement;

//       canvas.width = container.offsetWidth;
//       canvas.height = _constants.containerHeight; // 높이는 200px로 고정

//       context.clearRect(0, 0, canvas.width, canvas.height);
//       context.fillStyle = customBackColor;
//       context.fillRect(0, 0, canvas.width, canvas.height);

//       addedImages.forEach((imgInfo) => {
//         const img = imageObjects[imgInfo.src];
//         if (img) {
//           context.drawImage(img, imgInfo.x, imgInfo.y, imgInfo.width, imgInfo.height);
//         }
//       });
//     };

//     // Resize 이벤트 핸들러에서도 drawCanvas 호출
//     window.addEventListener("resize", drawCanvas);

//     return () => {
//       window.removeEventListener("resize", drawCanvas);
//     };
//   }, [addedImages, customBackColor]);
// */
//   // const dpr = window.devicePixelRatio || 1;

//   // useEffect(() => {
//   //   // 모든 이미지를 미리 로드하고 이미지 객체를 저장
//   //   const imageObjects = {};

//   //   const loadImage = (src) => {
//   //     return new Promise((resolve, reject) => {
//   //       const img = new Image();
//   //       img.onload = () => resolve(img);
//   //       img.onerror = reject;
//   //       img.src = src;
//   //     });
//   //   };

//   //   const loadAllImages = async () => {
//   //     const loadPromises = addedImages.map((imgInfo) =>
//   //       loadImage(imgInfo.src).then((img) => {
//   //         imageObjects[imgInfo.src] = img;
//   //       })
//   //     );

//   //     await Promise.all(loadPromises);
//   //     drawCanvas();
//   //   };

//   //   loadAllImages();

//   //   const drawCanvas = () => {
//   //     const canvas = canvasRef.current;
//   //     const context = canvas.getContext("2d");
//   //     const container = canvas.parentElement;

//   //     // 화면상 크기 유지를 위해 DPR을 고려한 실제 크기 설정
//   //     canvas.style.width = _constants.containerWidth + "px";
//   //     canvas.style.height = _constants.containerHeight + "px";
//   //     canvas.width = _constants.containerWidth * dpr;
//   //     canvas.height = _constants.containerHeight * dpr;

//   //     context.scale(dpr, dpr); // 콘텍스트에도 DPR 적용

//   //     context.clearRect(0, 0, canvas.width, canvas.height);
//   //     context.fillStyle = customBackColor;
//   //     context.fillRect(0, 0, _constants.containerWidth, _constants.containerHeight);

//   //     addedImages.forEach((imgInfo) => {
//   //       const img = imageObjects[imgInfo.src];
//   //       if (img) {
//   //         context.drawImage(img, imgInfo.x, imgInfo.y, imgInfo.width, imgInfo.height);
//   //       }
//   //     });
//   //   };

//   //   window.addEventListener("resize", drawCanvas);

//   //   return () => {
//   //     window.removeEventListener("resize", drawCanvas);
//   //   };
//   // }, [addedImages, customBackColor, dpr]);

//   useEffect(() => {
//     const imageObjects = {};

//     const loadImage = (src) => {
//       return new Promise((resolve, reject) => {
//         const img = new Image();
//         img.onload = () => resolve(img);
//         img.onerror = reject;
//         img.src = src;
//       });
//     };

//     const loadAllImages = async () => {
//       const loadPromises = addedImages.map((imgInfo) =>
//         loadImage(imgInfo.src).then((img) => {
//           imageObjects[imgInfo.src] = img;
//         })
//       );

//       await Promise.all(loadPromises);
//       drawCanvas();
//     };

//     loadAllImages();

//     const drawCanvas = () => {
//       const dpr = window.devicePixelRatio || 1; // Device Pixel Ratio를 가져옴
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
//       const container = canvas.parentElement;

//       // 화면상 크기를 유지하면서 DPR을 고려하여 실제 크기를 설정
//       canvas.style.width = container.offsetWidth + "px";
//       canvas.style.height = _constants.containerHeight + "px";
//       canvas.width = container.offsetWidth * dpr;
//       canvas.height = _constants.containerHeight * dpr;

//       context.scale(dpr, dpr); // 콘텍스트에도 DPR 적용

//       context.clearRect(0, 0, canvas.width, canvas.height);
//       context.fillStyle = customBackColor;
//       context.fillRect(0, 0, container.offsetWidth, _constants.containerHeight);

//       addedImages.forEach((imgInfo) => {
//         const img = imageObjects[imgInfo.src];
//         if (img) {
//           context.drawImage(img, imgInfo.x, imgInfo.y, imgInfo.width, imgInfo.height);
//         }
//       });
//     };

//     window.addEventListener("resize", drawCanvas);

//     return () => {
//       window.removeEventListener("resize", drawCanvas);
//     };
//   }, [addedImages, customBackColor]);

//   useEffect(() => {
//     // 컴포넌트 마운트 시 userInfo.stickerDtoList의 내용을 addedImages에 반영
//     const initialImages = userInfo.stickerDtoList.map((sticker) => {
//       const isSpecialType =
//         sticker.type.includes("emotion") || sticker.type.includes("field") || sticker.type.includes("season");
//       const size = isSpecialType ? 50 : 30;

//       return {
//         ...sticker,
//         name: sticker.type,
//         src: stickerMapping[sticker.type], // 실제 이미지 경로로 변환
//         x: sticker.posX * cardDimensions.width,
//         y: sticker.posY * cardDimensions.height,
//         width: size,
//         height: size,
//       };
//     });

//     setAddedImages(initialImages);
//   }, [userInfo, cardDimensions]);

//   /*
//   useEffect(() => {
//     const handleTouchMove = (event) => {
//       if (!dragging) return;
//       event.preventDefault();
//       const touch = event.touches[0];
//       const offsetX = touch.clientX - canvasRef.current.getBoundingClientRect().left;
//       const offsetY = touch.clientY - canvasRef.current.getBoundingClientRect().top;

//       const newX = Math.min(
//         Math.max(0, offsetX - addedImages[draggingIdx].width / 2),
//         canvasRef.current.width - addedImages[draggingIdx].width
//       );
//       const newY = Math.min(
//         Math.max(0, offsetY - addedImages[draggingIdx].height / 2),
//         canvasRef.current.height - addedImages[draggingIdx].height
//       );

//       setAddedImages(
//         addedImages.map((img, idx) => {
//           if (idx === draggingIdx) {
//             return { ...img, x: newX, y: newY };
//           }
//           return img;
//         })
//       );
//     };

//     // 캔버스에 touchmove 이벤트 리스너를 추가
//     const canvas = canvasRef.current;
//     canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
//     // 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거
//     return () => {
//       canvas.removeEventListener("touchmove", handleTouchMove, { passive: false });
//     };
//   }, [dragging, addedImages, draggingIdx]);
// */
//   useEffect(() => {
//     const handleTouchMove = (event) => {
//       if (!dragging) return;
//       event.preventDefault();

//       const touch = event.touches[0];
//       const canvasBounds = canvasRef.current.getBoundingClientRect();
//       const dpr = window.devicePixelRatio || 1;
//       // 캔버스 상의 터치 위치를 계산 (DPR을 고려)
//       const offsetX = (touch.clientX - canvasBounds.left) * dpr;
//       const offsetY = (touch.clientY - canvasBounds.top) * dpr;

//       // 이미지를 캔버스 내에서만 움직일 수 있도록 제한
//       const newX = Math.min(
//         Math.max(0, offsetX - (addedImages[draggingIdx].width / 2) * dpr),
//         canvasRef.current.width - addedImages[draggingIdx].width * dpr
//       );
//       const newY = Math.min(
//         Math.max(0, offsetY - (addedImages[draggingIdx].height / 2) * dpr),
//         canvasRef.current.height - addedImages[draggingIdx].height * dpr
//       );

//       setAddedImages(
//         addedImages.map((img, idx) => {
//           if (idx === draggingIdx) {
//             // 실제 픽셀 기준의 위치를 다시 스타일상의 위치로 변환하여 저장
//             return { ...img, x: newX / dpr, y: newY / dpr };
//           }
//           return img;
//         })
//       );
//     };

//     const canvas = canvasRef.current;
//     canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

//     return () => {
//       canvas.removeEventListener("touchmove", handleTouchMove, { passive: false });
//     };
//   }, [dragging, addedImages, draggingIdx]);

//   return (
//     <CanvasDiv>
//       <CanvasContainer>
//         <StyledCanvas
//           ref={canvasRef}
//           onTouchStart={(e) => onTouchStart(e, addedImages)}
//           onTouchMove={(e) => onTouchMove(e, dragging, draggingIdx, addedImages)}
//           onTouchEnd={() => onTouchEnd(setDragging, setDraggingIdx)}
//           onMouseDown={(e) => onMouseDown(e, addedImages)}
//           onMouseMove={(e) => onMouseMove(e, dragging, draggingIdx, addedImages)}
//           onMouseUp={() => onMouseUp(setDragging, setDraggingIdx)}
//         />
//         {showCard && (
//           <CardWrapper>
//             <WrapCard
//               userData={userInfo}
//               customTextColor={customTextColor}
//             />
//           </CardWrapper>
//         )}
//       </CanvasContainer>
//     </CanvasDiv>
//   );
// };

// export default Canvas;

// const CanvasDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const CanvasContainer = styled.div`
//   width: calc(100vw - 32px);
//   max-width: 580px;
//   height: 200px;
//   border-radius: 10px;
//   background: #ffe3e7;
//   box-shadow: 0 0 5px 0 #e8e8e8;
//   display: flex;
//   flex-direction: column;

//   @media (hover: hover) and (pointer: fine) {
//     width: 343px;
//     height: 200px;
//   }

//   position: relative;
// `;

// const StyledCanvas = styled.canvas`
//   border-radius: 10px;
//   box-shadow: 0 0 5px 0 #e8e8e8;

//   display: block;
//   margin: auto;

//   @media (hover: hover) and (pointer: fine) {
//     width: 343px;
//     height: 200px;
//   }
// `;

// const CardWrapper = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;

//   pointer-events: none;
// `;

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useStoreSize, useUserInfo } from "../store/store";
import { useDragAndDrop } from "../utils/dragNdrop";
import WrapCard from "./WrapCard";
import { stickerMapping } from "../utils/mappingStickers";

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
  const { cardDimensions } = useStoreSize();
  const imageObjectsRef = useRef({});
  const { onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd } = useDragAndDrop(
    setAddedImages,
    setDragging,
    setDraggingIdx,
    canvasRef
  );

  // 이미지 로딩 및 캔버스 그리기
  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        if (imageObjectsRef.current[src]) {
          resolve(imageObjectsRef.current[src]);
          return;
        }
        const img = new Image();
        img.onload = () => {
          imageObjectsRef.current[src] = img;
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    const loadAllImages = async () => {
      const loadPromises = addedImages.map((imgInfo) => loadImage(imgInfo.src));

      await Promise.all(loadPromises);
      drawCanvas();
    };

    loadAllImages();

    const drawCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const container = canvas.parentElement;

      canvas.style.width = container.offsetWidth + "px";
      canvas.style.height = _constants.containerHeight + "px";
      canvas.width = container.offsetWidth * dpr;
      canvas.height = _constants.containerHeight * dpr;

      context.scale(dpr, dpr);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = customBackColor;
      context.fillRect(0, 0, container.offsetWidth, _constants.containerHeight);

      addedImages.forEach((imgInfo) => {
        const img = imageObjectsRef.current[imgInfo.src];
        if (img) {
          context.drawImage(img, imgInfo.x, imgInfo.y, imgInfo.width, imgInfo.height);
        }
      });
    };

    const handleResize = () => {
      drawCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [addedImages, customBackColor, canvasRef]);

  // 초기 이미지 설정
  useEffect(() => {
    const initialImages = userInfo.stickerDtoList.map((sticker) => {
      const isSpecialType =
        sticker.type.includes("emotion") || sticker.type.includes("field") || sticker.type.includes("season");
      const size = isSpecialType ? 50 : 30;

      return {
        ...sticker,
        name: sticker.type,
        src: stickerMapping[sticker.type], // 실제 이미지 경로로 변환
        x: sticker.posX * cardDimensions.width,
        y: sticker.posY * cardDimensions.height,
        width: size,
        height: size,
      };
    });

    setAddedImages(initialImages);
  }, [userInfo, cardDimensions, setAddedImages]);

  // 드래깅 처리 최적화
  useEffect(() => {
    const handleTouchMove = (event) => {
      if (!dragging) return;
      event.preventDefault();

      const touch = event.touches[0];
      const canvasBounds = canvasRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1; // Device Pixel Ratio를 가져옴
      const offsetX = (touch.clientX - canvasBounds.left) * dpr; // DPR을 고려한 오프셋 X
      const offsetY = (touch.clientY - canvasBounds.top) * dpr; // DPR을 고려한 오프셋 Y

      // 스티커의 새로운 X, Y 위치를 계산하되, 캔버스의 실제 크기를 기준으로 경계를 넘지 않도록 제한
      const newX = Math.min(
        Math.max(0, offsetX - (addedImages[draggingIdx].width / 2) * dpr), // 스티커가 캔버스 왼쪽 경계를 넘지 않도록 함
        canvasRef.current.width - addedImages[draggingIdx].width * dpr // 스티커가 캔버스 오른쪽 경계를 넘지 않도록 함
      );
      const newY = Math.min(
        Math.max(0, offsetY - (addedImages[draggingIdx].height / 2) * dpr), // 스티커가 캔버스 상단 경계를 넘지 않도록 함
        canvasRef.current.height - addedImages[draggingIdx].height * dpr // 스티커가 캔버스 하단 경계를 넘지 않도록 함
      );

      // 상태를 업데이트하여 스티커의 위치를 변경
      setAddedImages(
        addedImages.map((img, idx) => {
          if (idx === draggingIdx) {
            return { ...img, x: newX / dpr, y: newY / dpr }; // DPR을 고려하여 스타일상의 위치로 조정
          }
          return img;
        })
      );
    };

    // 캔버스에 touchmove 이벤트 리스너를 추가
    const canvas = canvasRef.current;
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    // 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거
    return () => {
      canvas.removeEventListener("touchmove", handleTouchMove, { passive: false });
      document.removeEventListener("touchmove", handleTouchMove, { passive: false });
    };
  }, [dragging, addedImages, draggingIdx, canvasRef]);

  return (
    <CanvasDiv>
      <CanvasContainer>
        <StyledCanvas
          ref={canvasRef}
          onTouchStart={(e) => onTouchStart(e, addedImages)}
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
