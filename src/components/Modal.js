import { StringUtils } from "@zxing/library";
import React from "react";
import styled from "styled-components";

const Modal = ({ onClose, qrUrl }) => {
  return (
    <div>
      <ModalBackground onClick={onClose} />
      <ModalSpace>
        <ModalWrap>
          <ModalCloseSpace>
            <ModalClose onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  d="M1 1L8.5 8.5L16 16M16 1L1 16"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </ModalClose>
          </ModalCloseSpace>
          <ModalContent>
            <ModalTitle>MY QR</ModalTitle>
            <ModalText>친구의 PONNECT에서 QR을 인식해주세요.</ModalText>
            <ModalQRImage
              src={qrUrl}
              alt="QR 코드"
            />
          </ModalContent>
        </ModalWrap>
      </ModalSpace>
    </div>
  );
};

export default Modal;

const ModalWrap = styled.div`
  border: 1px solid #aaa;
  box-shadow: 0 0 5px #aaa;
  border-radius: 20px;
  width: calc(100vw - 60px);
  height: 475px;
  z-index: 2;
  background-color: #fff;

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px - 60px);
  }
`;

const ModalSpace = styled.div`
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
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

const ModalCloseSpace = styled.div`
  margin-top: 22px;
  margin-right: 21px;
  display: flex;
  justify-content: flex-end;
`;

const ModalClose = styled.div`
  cursor: pointer;
`;

const ModalContent = styled.div`
  text-align: center;
`;

const ModalTitle = styled.div`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-top: 53px;
`;

const ModalText = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  margin-top: 13px;
`;

const ModalQRImage = styled.img`
  width: auto;
  height: 250px;
  margin-top: 20px;
`;
