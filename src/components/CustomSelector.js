import Smile from "../images/smile.png";
import Palette from "../images/palette.png";
import ResetImg from "../images/reset.png";
import styled from "styled-components";
import React, { useState } from "react";
import ColorPalette from "./ColorPalette";
import StickerModal from "./StickerModal";

const CustomSelector = ({ setCustomBackColor, setCustomTextColor, setCustomStickers, setAddedImages, addedImages }) => {
  const [activeComponent, setActiveComponent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setActiveComponent("Smile");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReset = () => {
    setAddedImages([]);
    setCustomBackColor("#FFE3E7");
    setCustomTextColor("#000");
  };

  return (
    <>
      <RoundedDiv>
        <Image
          src={Palette}
          alt="Palette"
          onClick={() => setActiveComponent("Palette")}
        />
        <Image
          src={Smile}
          alt="Smile"
          onClick={openModal}
        />
        <Image
          style={{ opacity: "1" }}
          src={ResetImg}
          alt="Reset"
          onClick={handleReset}
        />
      </RoundedDiv>
      {activeComponent === "Palette" && (
        <ColorPalette
          setCustomBackColor={setCustomBackColor}
          setCustomTextColor={setCustomTextColor}
        />
      )}
      {isModalOpen && (
        <StickerModal
          onClose={closeModal}
          setAddedImages={setAddedImages}
          addedImages={addedImages}
        />
      )}
    </>
  );
};

export default CustomSelector;

const RoundedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 100px;

  width: 140px;
  height: 42px;
  filter: drop-shadow(0px 0px 4px rgba(140, 140, 140, 0.5));
`;

const Image = styled.img`
  cursor: pointer;
  width: 24px;
  height: auto;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;
