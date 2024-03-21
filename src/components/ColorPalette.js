import React, { useState } from "react";
import { CirclePicker } from "react-color";
import { useUserInfo } from "../store/store";
import styled from "styled-components";
import PlusCircleButton from "./PlusCircleButton";
import ColorWheelModal from "./ColorWheelModal";

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

  const [colors, setColors] = useState(initialColors);
  const [tColors, setTColors] = useState(initialTextColors);

  const [color, setColor] = useState(`${userInfo.bgColor}`); // 현재 선택된 색상
  const [tColor, setTColor] = useState(`${userInfo.textColor}`);

  const [selectedOption, setSelectedOption] = useState("card");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const circlePickerProps = {
    width: "auto",
    circleSize: 27,
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              openModal();
            } else if (selectedOption === "text") {
              openModal();
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
      {isModalOpen && (
        <ColorWheelModal
          onClose={closeModal}
          type={selectedOption}
          setColor={setColor}
          setTColor={setTColor}
          setCustomBackColor={setCustomBackColor}
          setCustomTextColor={setCustomTextColor}
          colors={colors}
          tColors={tColors}
          color={color}
          tColor={tColor}
          setColors={setColors}
          setTColors={setTColors}
        />
      )}
    </PaletteContainer>
  );
};

export default ColorPalette;

const PaletteContainer = styled.div`
  display: flex;
  justify-contnet: center;
  align-itmes: center;
`;

const CardORText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 111px;
  height: 32px;

  position: absolute;
  bottom: 45px;
  left: 0;

  border: 1px solid #bdbdbd;
  border-bottom: 1px solid #f8f8f8;
  border-top-right-radius: 100px;

  z-index: 5;

  background-color: #f8f8f8;

  @media (hover: hover) and (pointer: fine) {
    position: absolute;
    bottom: 45px;
    left: calc(50% - 187.5px);
  }
`;

const PickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  position: absolute;
  bottom: 0;
  left: 0;
  border: 1px solid #bdbdbd;
  background-color: #f8f8f8;
  height: 45px;

  z-index: 3;

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
