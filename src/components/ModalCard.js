import React, { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import ModalDelete from "./ModalDelete";
import { useCookies } from "react-cookie";
import Memo from "./Memo";
import { getMemo, modifyMemo } from "../utils/axios";

const ModalCard = ({ user, onClose, onOpenDeleteModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMemo, setIsMemo] = useState(false);
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];
  const [memoText, setMemoText] = useState("");

  const handleCardClick = (user) => {
    setSelectedUser(user);
    openModal();
  };

  const toggleMemo = () => setIsMemo(!isMemo);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMemo = async () => {
    try {
      const res = await getMemo(user.userId, token);
      console.log(res.data);
      setMemoText(res.data.memo);
      toggleMemo();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveMemo = async () => {
    try {
      const res = await modifyMemo(user.userId, memoText, token);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ModalBackground onClick={onClose} />
      <ModalSpace>
        <ModalWrap>
          {isMemo ? (
            <>
              <ModalBackSpace>
                <ModalBack onClick={toggleMemo}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path
                      d="M1.97601 8.34216H16.236"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.31155 0.763916L0.763916 8.31155L8.38285 15.9305"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </ModalBack>
              </ModalBackSpace>
            </>
          ) : (
            <>
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
            </>
          )}

          <ModalContent>
            <ModalTitle>{user.name}님의 명함</ModalTitle>

            <ModalCardImg>
              {isMemo ? (
                <>
                  <Memo userData={user} memoText={memoText} setMemoText={setMemoText} />
                </>
              ) : (
                <>
                  <Card userData={user} />
                </>
              )}
            </ModalCardImg>
            {isMemo ? (
              <></>
            ) : (
              <>
                <MemoToggleButton>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    onClick={handleMemo}
                  >
                    <g filter="url(#filter0_d_1267_10448)">
                      <circle cx="13.5" cy="13.5" r="10.5" fill="white" />
                    </g>
                    <path
                      d="M7.875 12C8.49631 12 9 12.5037 9 13.125C9 13.7463 8.49631 14.25 7.875 14.25C7.25368 14.25 6.75 13.7463 6.75 13.125C6.75 12.5037 7.25368 12 7.875 12Z"
                      fill="black"
                    />
                    <path
                      d="M13.4998 12C14.1211 12 14.6248 12.5037 14.6248 13.125C14.6248 13.7463 14.1211 14.25 13.4998 14.25C12.8784 14.25 12.3748 13.7463 12.3748 13.125C12.3748 12.5037 12.8784 12 13.4998 12Z"
                      fill="black"
                    />
                    <path
                      d="M19.1249 12C19.7462 12 20.2499 12.5037 20.2499 13.125C20.2499 13.7463 19.7462 14.25 19.1249 14.25C18.5035 14.25 17.9999 13.7463 17.9999 13.125C17.9999 12.5037 18.5035 12 19.1249 12Z"
                      fill="black"
                    />
                    <defs>
                      <filter
                        id="filter0_d_1267_10448"
                        x="0.75"
                        y="0.75"
                        width="25.5"
                        height="25.5"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="1.125" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1267_10448" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1267_10448" result="shape" />
                      </filter>
                    </defs>
                  </svg>
                </MemoToggleButton>
              </>
            )}

            {isMemo ? (
              <>
                <CardDeleteBtn onClick={handleSaveMemo}>저장하기</CardDeleteBtn>
              </>
            ) : (
              <>
                <CardDeleteBtn onClick={onOpenDeleteModal}>삭제하기</CardDeleteBtn>
              </>
            )}
          </ModalContent>
        </ModalWrap>
      </ModalSpace>

      {isModalOpen && <ModalDelete user={selectedUser} onClose={closeModal} />}
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

const ModalBackSpace = styled.div`
  margin-top: 22px;
  margin-left: 21px;
  display: flex;
  justify-content: flex-start;
`;

const ModalClose = styled.div`
  cursor: pointer;
`;

const ModalBack = styled.div`
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
  transition: 400ms ease-in-out;

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px * 0.55);
  }

  &:hover {
    background-color: #006eee;
    transition: 400ms ease-in-out;
  }
`;

const MemoToggleButton = styled.div`
  position: fixed;
  right: 26px;
  bottom: 245px;

  @media (hover: hover) and (pointer: fine) {
    right: calc(50vw - 187.5px + 26px);
  }
`;
