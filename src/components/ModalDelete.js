import React from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { deleteCard } from "../utils/axios";

const ModalDelete = ({ user, onClose }) => {
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];
  const memberId = user.userId;

  const deleteClick = () => {
    deleteCard(memberId, token);
  };

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
            <ModalWarn>!</ModalWarn>
            <ModalTitle>명함을 정말 삭제하시겠어요?</ModalTitle>
            <ModalText>
              삭제를 선택하실 경우,
              <br />
              삭제한 명함은 되돌릴 수 없어요.
            </ModalText>
            <CardDeleteBtn onClick={deleteClick}>삭제</CardDeleteBtn>
            <CardDeleteBtnNone onClick={onClose}>취소</CardDeleteBtnNone>
          </ModalContent>
        </ModalWrap>
      </ModalSpace>
    </div>
  );
};

export default ModalDelete;

const ModalWrap = styled.div`
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

const ModalWarn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: linear-gradient(180deg, #92cbff -39.42%, #0587ff 32.72%, #0076ff 83.08%);

  color: #fff;
  font-family: Pretendard;
  font-size: 50px;
  font-style: normal;
  font-weight: 300;

  margin-top: 25px;
`;

const ModalTitle = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;

  margin-top: 23.5px;
`;

const ModalText = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  margin-top: 9px;
`;

const CardDeleteBtn = styled.div`
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

  margin-top: 30px;
  cursor: pointer;
  transition: 400ms ease-in-out;

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px * 0.55);
  }

  &:hover {
    background-color: #006eee;
    transition: 400ms ease-in-out;
  }
`;

const CardDeleteBtnNone = styled.div`
  width: 55vw;
  max-width: 420px;
  height: 42px;
  border-radius: 100px;
  background: #f4f4f4;
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;

  margin-top: 10px;
  cursor: pointer;
  transition: 400ms ease-in-out;

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px * 0.55);
  }

  &:hover {
    background-color: #8c8c8c;
    transition: 400ms ease-in-out;
  }
`;
