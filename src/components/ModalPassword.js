import React from "react";
import styled from "styled-components";

const ModalPassword = ({ linkSignIn, foundUser, onClose }) => {
  return (
    <div>
      <ModalBackground />
      <ModalSpace>
        <ModalWrap>
          <ModalCloseSpace>
            <ModalClose onClick={foundUser ? linkSignIn : onClose}>
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
            {foundUser ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="65"
                  height="65"
                  viewBox="0 0 65 65"
                  fill="none"
                  style={{ marginTop: "22px" }}
                >
                  <path
                    d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5Z"
                    fill="url(#paint0_linear_42_3225)"
                  />
                  <path
                    d="M21.1382 32.6486L30.5271 42.8048L42.8049 21.1382"
                    stroke="white"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_42_3225"
                      x1="32"
                      y1="-31"
                      x2="32"
                      y2="82"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0.0475677"
                        stop-color="#92CBFF"
                      />
                      <stop
                        offset="0.462568"
                        stop-color="#0587FF"
                      />
                      <stop
                        offset="0.752212"
                        stop-color="#0076FF"
                      />
                    </linearGradient>
                  </defs>
                </svg>
                <ModalText style={{ marginTop: "17px" }}>
                  해당 메일로
                  <br />
                  임시 비밀번호가 발급되었습니다.
                </ModalText>
              </>
            ) : (
              <WarnContainer>
                <ModalWarn>!</ModalWarn>
                <ModalText style={{ marginTop: "17px" }}>사용자를 찾을 수 없습니다.</ModalText>
              </WarnContainer>
            )}
          </ModalContent>
        </ModalWrap>
      </ModalSpace>
    </div>
  );
};

export default ModalPassword;

const ModalWrap = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(140, 140, 140, 0.5);
  border-radius: 10px;
  width: calc(100vw - 60px);
  height: 238px;
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

const ModalText = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ModalWarn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border-radius: 100%;
  background: linear-gradient(180deg, #92cbff -39.42%, #0587ff 32.72%, #0076ff 83.08%);

  color: #fff;
  font-family: Pretendard;
  font-size: 35px;
  font-style: normal;
  font-weight: 300;

  margin-top: 31px;
`;

const WarnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
