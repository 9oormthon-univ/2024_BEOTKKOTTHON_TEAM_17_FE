import React, { useState } from "react";
import { CirclePicker } from "react-color";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";
import { useUserInfo } from "../store/store";
import styled from "styled-components";
import PlusCircleButton from "./PlusCircleButton";

const ColorPalette = () => {
  const { userInfo } = useUserInfo();
  const initialColors = [
    `${userInfo.bgColor}`,
    "#FF5449",
    "#FF9549",
    "#FFD235",
    "#89DD00",
    "#2079FF",
    "#001BA8",
    "#A449FF",
    // 초기 색상 값 설정
  ];
  const [showWheel, setShowWheel] = useState(false);
  const [colors, setColors] = useState(initialColors);
  const [color, setColor] = useState(`${userInfo.bgColor}`); // 현재 선택된 색상
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [isColorAdded, setIsColorAdded] = useState(false);

  // 색상 휠에서 색상이 변경될 때 호출되는 함수
  const handleWheelChange = (color) => {
    const newColorHex = hsvaToHex(color.hsva);
    setHsva(color.hsva); // 색상 휠의 HSVa 상태 업데이트
    setColor(newColorHex); // 현재 선택된 색상 업데이트
  };

  // "색상 추가" 버튼을 클릭했을 때 호출되는 함수
  const addColor = () => {
    colors[0] = color;
    setShowWheel(false);
  };

  return (
    <>
      <PickerContainer>
        <PlusCircleButton onClick={() => setShowWheel(!showWheel)} />
        <CirclePicker
          width="auto"
          circleSize={30} // 색상 원의 크기
          circleSpacing={10} // 색상 원 사이의 간격
          colors={colors}
          color={color}
          onChangeComplete={({ hex }) => setColor(hex)}
        />
      </PickerContainer>
      {showWheel && (
        <>
          <WheelContainer>
            <Wheel
              color={hsva}
              onChange={handleWheelChange}
            />
            <button onClick={addColor}>Confirm Color Addition</button>
          </WheelContainer>
        </>
      )}
      <div style={{ width: "100%", height: "34px", marginTop: "20px", background: color }}></div>
    </>
  );
};

export default ColorPalette;

const PickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  max-height: 50px;
  border: 1px solid #bdbdbd;

  width: 100%;
`;

const WheelContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;
