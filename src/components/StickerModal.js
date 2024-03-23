import React, { useState } from "react";
import styled from "styled-components";

import { stickerCategories, stickers } from "../utils/mappingStickers";

const StickerModal = ({ onClose, setAddedImages, addedImages }) => {
  const [selectedCategory, setSelectedCategory] = useState("field");
  const [selectedStickers, setSelectedStickers] = useState([]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSelectSticker = (name, src) => {
    let containsKey = name.includes("field") || name.includes("emotion") || name.includes("season");
    if (containsKey) {
      setAddedImages([...addedImages, { name, src, x: 20, y: 20, width: 50, height: 50 }]);
    } else {
      setAddedImages([...addedImages, { name, src, x: 20, y: 20, width: 30, height: 30 }]);
    }
  };

  const handleCheck = () => {
    onClose();
  };
  return (
    <div>
      <ModalBackground onClick={onClose} />
      <ModalSpace>
        <ModalWrap>
          <ModalHeader>
            {stickerCategories.map((category) => (
              <Thumbnail key={category.id} src={category.thumbnail} onClick={() => handleSelectCategory(category.id)} />
            ))}
            <ModalClose onClick={handleCheck}>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                <path d="M1 8.96875L7.5 16L16 1" stroke="black" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </ModalClose>
          </ModalHeader>
          <Divider />

          <StickersContainer>
            {stickers[selectedCategory].map((sticker, index) => (
              <Sticker
                key={index}
                src={sticker.src}
                alt={sticker.name}
                selected={selectedStickers.includes(sticker.src)}
                onClick={() => handleSelectSticker(sticker.name, sticker.src)}
              />
            ))}
          </StickersContainer>
        </ModalWrap>
      </ModalSpace>
    </div>
  );
};

export default StickerModal;

const ModalHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 2;

  height: 58px;
`;

const ModalWrap = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(140, 140, 140, 0.5);
  border-radius: 25px 25px 0px 0px;
  width: 100vw;
  height: 410px;
  overflow-y: auto;
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
  bottom: 0;
  left: 0;

  z-index: 100;
`;

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  //   background-color: rgba(0, 0, 0, 0.25);
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
  top: 22px;
`;

const Thumbnail = styled.img`
  width: 30px;
  height: 30px;
  margin: 0 14px;
  cursor: pointer;

  display: flex;
`;

const StickersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;

  margin-top: 10px;
`;

const Sticker = styled.img`
  width: 25%; //한 줄에 4개
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #8c8c8c;
  width: 100%;
  margin: 0 auto;

  position: sticky;
  top: 58px;
  z-index: 2;
`;
