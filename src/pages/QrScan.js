import React, { useEffect, useState } from "react";
import QrReader from "react-qr-scanner";
import styled from "styled-components";
import { MdFlipCameraAndroid } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";

function QrScan() {
  const [userId, setUserId] = useState("No result");
  const [facingMode, setFacingMode] = useState("environment");

  const QrStyle = {
    width: "100%",
    height: "100%",
    margin: "-50px",
  };

  const goBack = () => {
    window.history.back(); // 뒤로 가기
  };

  const onScan = (data) => {
    if (data) {
      setUserId(data.text);
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const onCameraButtonClick = () => {
    if (facingMode === "environment") {
      setFacingMode("user");
    } else if (facingMode === "user") {
      setFacingMode("environment");
    }
  };

  const onCloseButtonClick = () => {
    setUserId("No result");
  };

  useEffect(() => {}, [userId]);

  return (
    <div className="page">
      <div className="center">
        <div className="page-space">
          <QRHeader>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              style={{ marginLeft: "16px", cursor: "pointer" }}
              onClick={goBack}
            >
              <path
                d="M1 1L8.5 8.5L16 16M16 1L1 16"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </QRHeader>
          {userId === "No result" ? (
            <QrScanPage>
              {/*  style={QrStyle} */}
              <QrReader onScan={onScan} onError={onError} facingmode={facingMode} style={QrStyle} />
              <QRFooter>
                <CameraButton onClick={onCameraButtonClick}>
                  <MdFlipCameraAndroid />
                </CameraButton>
              </QRFooter>
            </QrScanPage>
          ) : (
            <QrResultPage>
              <CloseIcon onClick={onCloseButtonClick}>
                <AiOutlineCloseCircle />
              </CloseIcon>
              <QrResultBox>QR 결과</QrResultBox>
            </QrResultPage>
          )}
        </div>
      </div>
    </div>
  );
}

const QrScanPage = styled.div`
  height: calc(100vh - 44px);
  display: flex;
  justify-content: center;
`;

const CameraButton = styled.button`
  position: absolute;
  bottom: 22px;

  width: 54px;
  height: 54px;

  border: 5px solid #fff;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  background-color: #000;
  color: rgb(0,0,0,0);
  }
`;

const QRHeader = styled.div`
  width: 100vw;
  height: 44px;
  background-color: #000;

  display: flex;
  align-items: center;

  position: relative;
  z-index: 10;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

const QRFooter = styled.div`
  width: 100vw;
  height: 97px;
  background-color: #000;

  position: absolute;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

const QrResultPage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseIcon = styled(CameraButton)``;

const QrResultBox = styled.div`
  width: 90%;

  margin: 10px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default QrScan;
