import React, { useState } from "react";
import { CirclePicker } from "react-color";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";
import { useUserInfo } from "../store/store";
import styled from "styled-components";
import PlusCircleButton from "./PlusCircleButton";

const ColorPalette = ({ setCustomBackColor, setCustomTextColor }) => {
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

  const initialTextColors = [
    `${userInfo.textColor}`,
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
  const [showWheelText, setShowWheelText] = useState(false);

  const [colors, setColors] = useState(initialColors);
  const [tColors, setTColors] = useState(initialTextColors);

  const [color, setColor] = useState(`${userInfo.bgColor}`); // 현재 선택된 색상
  const [tColor, setTColor] = useState(`${userInfo.textColor}`);

  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });

  const [selectedOption, setSelectedOption] = useState("card");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // 색상 휠에서 색상이 변경될 때 호출되는 함수
  const handleWheelChange = (color) => {
    const newColorHex = hsvaToHex(color.hsva);
    setHsva(color.hsva); // 색상 휠의 HSVa 상태 업데이트
    setColor(newColorHex); // 현재 선택된 색상 업데이트
    setCustomBackColor(newColorHex);
  };

  const handleWheelChangeText = (color) => {
    const newColorHex = hsvaToHex(color.hsva);
    setHsva(color.hsva);
    setTColor(newColorHex);
    setCustomTextColor(newColorHex);
  };

  // "색상 추가" 버튼을 클릭했을 때 호출되는 함수
  const addColor = () => {
    colors[0] = color;
    setShowWheel(false);
    setCustomBackColor(color);
  };

  const tAddColor = () => {
    tColors[0] = tColor;
    setShowWheelText(false);
    setCustomTextColor(tColor);
  };

  const circlePickerProps = {
    width: "auto",
    circleSize: 30,
    circleSpacing: 12,
    onChangeComplete: ({ hex }) => {
      if (selectedOption === "card") {
        setColor(hex);
        setCustomBackColor(hex);
      } else {
        setTColor(hex);
        setCustomTextColor(hex);
      }
    },
  };

  return (
    <PaletteContainer>
      <CardORText>
        <OptionsContainer>
          <Option
            active={selectedOption === "card"}
            onClick={() => handleOptionChange("card")}
          >
            명함
          </Option>
          |
          <Option
            active={selectedOption === "text"}
            onClick={() => handleOptionChange("text")}
          >
            텍스트
          </Option>
        </OptionsContainer>
      </CardORText>
      <PickerContainer>
        <PlusCircleButton
          onClick={() => {
            if (selectedOption === "card") {
              setShowWheel(!showWheel);
              setShowWheelText(false);
            } else if (selectedOption === "text") {
              setShowWheelText(!showWheelText);
              setShowWheel(false);
            }
          }}
        />
        {selectedOption === "card" ? (
          <CirclePicker
            {...circlePickerProps}
            colors={colors}
            color={color}
          />
        ) : (
          <CirclePicker
            {...circlePickerProps}
            colors={tColors}
            color={tColor}
          />
        )}
      </PickerContainer>
      {showWheel && selectedOption === "card" ? (
        <WheelContainer>
          <Wheel
            color={hsva}
            onChange={handleWheelChange}
          />
          <button onClick={addColor}>Confirm Color Addition</button>
        </WheelContainer>
      ) : selectedOption === "text" && showWheelText ? (
        <WheelContainer>
          <Wheel
            color={hsva}
            onChange={handleWheelChangeText}
          />
          <button onClick={tAddColor}>Confirm Color Addition</button>
        </WheelContainer>
      ) : null}
    </PaletteContainer>
  );
};

export default ColorPalette;
const PaletteContainer = styled.div`
  display: flex;
  justify-contnet: center;
  align-itmes: center;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

const CardORText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 111px;
  height: 32px;

  position: fixed;
  bottom: 45px;
  left: 0;

  border: 1px solid #bdbdbd;
  border-bottom: 1px solid #f8f8f8;
  border-top-right-radius: 100px;

  z-index: 10;

  background-color: #f8f8f8;

  @media (hover: hover) and (pointer: fine) {
    left: calc(100% - 375px);
  }
`;

const PickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  border: 1px solid #bdbdbd;
  background-color: #f8f8f8;
  height: 45px;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bdbdbd;
`;

const Option = styled.div`
  cursor: pointer;
  margin: 0 3px;

  color: ${({ active }) => (active ? "#000" : "#8c8c8c")};
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500
  line-height: normal;
`;

const WheelContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;
