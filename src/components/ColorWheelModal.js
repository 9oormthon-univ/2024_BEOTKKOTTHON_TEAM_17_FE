// import React, { useState } from "react";
// import styled from "styled-components";
// import Wheel from "@uiw/react-color-wheel";
// import { hsvaToHex } from "@uiw/color-convert";

// const ColorWheelModal = ({
//   onClose,
//   type,
//   setColor,
//   setColors,
//   setTColors,
//   setTColor,
//   setCustomBackColor,
//   setCustomTextColor,
//   colors,
//   tColors,
//   color,
//   tColor,
// }) => {
//   const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
//   const handleWheelChange = (color) => {
//     const newColorHex = hsvaToHex(color.hsva);
//     setHsva(color.hsva); // 색상 휠의 HSVa 상태 업데이트
//     setColor(newColorHex); // 현재 선택된 색상 업데이트
//     setColors((currentColors) => [newColorHex, ...currentColors.slice(1)]);
//     setCustomBackColor(newColorHex);
//   };

//   const handleWheelChangeText = (color) => {
//     const newColorHex = hsvaToHex(color.hsva);
//     setHsva(color.hsva);
//     setTColor(newColorHex);
//     setTColors((currentColors) => [newColorHex, ...currentColors.slice(1)]);
//     setCustomTextColor(newColorHex);
//   };
//   return (
//     <div>
//       <ModalBackground />
//       <ModalSpace>
//         <ModalWrap>
//           <ModalCloseSpace>
//             <ModalTitle>색상 추가</ModalTitle>
//             <ModalClose
//               onClick={() => {
//                 if (type === "card") {
//                   colors[0] = color;
//                   setCustomBackColor(color);
//                 } else if (type === "text") {
//                   tColors[0] = tColor;
//                   setCustomTextColor(tColor);
//                 }
//                 onClose();
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="17"
//                 height="18"
//                 viewBox="0 0 17 18"
//                 fill="none"
//               >
//                 <path
//                   d="M1 8.96875L7.5 16L16 1"
//                   stroke="black"
//                   stroke-width="1.5"
//                   stroke-linecap="round"
//                 />
//               </svg>
//             </ModalClose>
//           </ModalCloseSpace>
//           <ModalContent>
//             <ModalWheel>
//               {type === "card" ? (
//                 <Wheel
//                   color={hsva}
//                   onChange={handleWheelChange}
//                   width={220}
//                   height={220}
//                 />
//               ) : (
//                 <Wheel
//                   color={hsva}
//                   onChange={handleWheelChangeText}
//                 />
//               )}
//             </ModalWheel>
//           </ModalContent>
//         </ModalWrap>
//       </ModalSpace>
//     </div>
//   );
// };

// export default ColorWheelModal;

// const ModalWrap = styled.div`
//   box-shadow: 0px 0px 10px 0px rgba(140, 140, 140, 0.5);
//   border-radius: 25px 25px 0px 0px;
//   width: 100vw;
//   height: 361px;
//   z-index: 2;
//   background-color: #fff;

//   @media (hover: hover) and (pointer: fine) {
//     width: 375px;
//   }
// `;

// const ModalSpace = styled.div`
//   width: 100vw;

//   display: flex;
//   justify-content: center;
//   align-items: flex-end;

//   position: absolute;
//   bottom: 44px;
//   left: 0;

//   z-index: 10;
// `;

// const ModalBackground = styled.div`
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.25);
//   top: 0;
//   left: 0;
//   z-index: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalCloseSpace = styled.div`
//   margin-top: 22px;
//   margin-right: 21px;
//   display: flex;
//   justify-content: flex-end;
// `;

// const ModalClose = styled.div`
//   cursor: pointer;
// `;

// const ModalContent = styled.div`
//   text-align: center;

//   background: #e9e9;
// `;

// const ModalTitle = styled.div`
//   font-family: Pretendard;
//   font-size: 24px;
//   font-style: normal;
//   font-weight: 700;
// `;

// const ModalWheel = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 25px;
// `;

import React, { useState } from "react";
import styled from "styled-components";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";

const ColorWheelModal = ({
  onClose,
  type,
  setColor,
  setColors,
  setTColors,
  setTColor,
  setCustomBackColor,
  setCustomTextColor,
  colors,
  tColors,
  color,
  tColor,
}) => {
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const handleWheelChange = (color) => {
    const newColorHex = hsvaToHex(color.hsva);
    setHsva(color.hsva); // 색상 휠의 HSVa 상태 업데이트
    setColor(newColorHex); // 현재 선택된 색상 업데이트
    setColors((currentColors) => [newColorHex, ...currentColors.slice(1)]);
    setCustomBackColor(newColorHex);
  };

  const handleWheelChangeText = (color) => {
    const newColorHex = hsvaToHex(color.hsva);
    setHsva(color.hsva);
    setTColor(newColorHex);
    setTColors((currentColors) => [newColorHex, ...currentColors.slice(1)]);
    setCustomTextColor(newColorHex);
  };
  return (
    <div>
      <ModalBackground />
      <ModalSpace>
        <ModalWrap>
          <ModalHeader>
            <ModalTitle>색상 추가</ModalTitle>
            <ModalClose
              onClick={() => {
                if (type === "card") {
                  colors[0] = color;
                  setCustomBackColor(color);
                } else if (type === "text") {
                  tColors[0] = tColor;
                  setCustomTextColor(tColor);
                }
                onClose();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
              >
                <path
                  d="M1 8.96875L7.5 16L16 1"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </ModalClose>
          </ModalHeader>
          <ModalContent>
            <ModalWheel>
              {type === "card" ? (
                <Wheel
                  color={hsva}
                  onChange={handleWheelChange}
                  width={230}
                  height={230}
                />
              ) : (
                <Wheel
                  color={hsva}
                  onChange={handleWheelChangeText}
                />
              )}
            </ModalWheel>
          </ModalContent>
        </ModalWrap>
      </ModalSpace>
    </div>
  );
};

export default ColorWheelModal;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 22px;

  position: relative;
`;

const ModalWrap = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(140, 140, 140, 0.5);
  border-radius: 25px 25px 0px 0px;
  width: 100vw;
  height: 361px;
  z-index: 2;
  background-color: #fff;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

const ModalSpace = styled.div`
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  position: absolute;
  bottom: 44px;
  left: 0;

  z-index: 10;
`;

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalClose = styled.div`
  cursor: pointer;
  position: absolute;
  right: 22px;
  top: 24px;
`;

const ModalContent = styled.div`
  text-align: center;
`;

const ModalTitle = styled.div`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`;

const ModalWheel = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
