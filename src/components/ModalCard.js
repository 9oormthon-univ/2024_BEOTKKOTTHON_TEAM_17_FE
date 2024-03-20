import React from "react";
import styled from "styled-components";
import Card from "../components/Card";

const ModalCard = ({ user, onClose }) => {
  return (
    <div>
      <ModalBackground onClick={onClose} />
      <ModalSpace>
        <ModalWrap>
          <ModalCloseSpace>
            <ModalClose onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
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
            <ModalTitle>{user.name}님의 명함</ModalTitle>
            <ModalCardImg>
              <Card userData={user} />
            </ModalCardImg>
            <CardDeleteBtn>삭제하기</CardDeleteBtn>
          </ModalContent>
        </ModalWrap>
      </ModalSpace>
    </div>
  );
};

export default ModalCard;

const ModalWrap = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(140, 140, 140, 0.5);
  border-radius: 25px 25px 0px 0px;
  width: 100vw;
  height: 405px;
  z-index: 2;
  background-color: #fff;

  position: fixed;
  bottom: 0;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

const ModalSpace = styled.div`
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: flex-end;

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
  // text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-top: 25px;
`;

const ModalCardImg = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 23.5px;
`;

const CardDeleteBtn = styled.div`
  // width: 200px;
  width: 55vw;
  max-width: 420px;
  height: 42px;
  border-radius: 100px;
  background: #138eff;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;

  margin-top: 24px;
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px * 0.55);
  }
`;
