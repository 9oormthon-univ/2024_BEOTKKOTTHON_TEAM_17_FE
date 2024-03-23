import React from "react";
import styled from "styled-components";

const ModalModCategory = ({ onClose }) => {
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="65"
              viewBox="0 0 65 65"
              fill="none"
              style={{ marginTop: "25px" }}
            >
              <path
                d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5Z"
                fill="url(#paint0_linear_999_5251)"
              />
              <path
                d="M21.1382 32.6486L30.5271 42.8049L42.8048 21.1382"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_999_5251"
                  x1="32"
                  y1="-31"
                  x2="32"
                  y2="82"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.0475677" stop-color="#92CBFF" />
                  <stop offset="0.462568" stop-color="#0587FF" />
                  <stop offset="0.752212" stop-color="#0076FF" />
                </linearGradient>
              </defs>
            </svg>
            <ModalText>
              명함 분류함명이
              <br />
              정상적으로 변경되었습니다.
            </ModalText>
          </ModalContent>
        </ModalWrap>
      </ModalSpace>
    </div>
  );
};

export default ModalModCategory;

const ModalWrap = styled.div`
  border: 1px solid #aaa;
  box-shadow: 0 0 5px #aaa;
  border-radius: 20px;
  width: calc(100vw - 60px);
  height: 240px;
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
  position: relative;
  z-index: 10;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalText = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;

  text-align: center;
  margin-top: 17px;
`;
