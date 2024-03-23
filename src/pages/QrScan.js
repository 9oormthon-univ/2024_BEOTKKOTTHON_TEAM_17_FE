import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function QrScan() {
  const [MyfacingMode, setFacingMode] = useState("environment");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const qrcodeRegionId = "reader";
  let html5QrCode = "";
  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    console.log("Scan Result: ", decodedText);
    window.location.href = decodedText;
    setResult(decodedText);
    html5QrCode
      .stop()
      .then((ignore) => {
        console.log("QR Code scanning is stopped.");
      })
      .catch((err) => {
        console.log("Stop failed, handle it.");
      });
  };
  const config = { fps: 10, qrbox: { width: 250, height: 250 } };

  // Scan using camera
  const startScanning = () => {
    html5QrCode.start({ facingMode: { exact: "environment" } }, config, qrCodeSuccessCallback);
    // html5QrCode.start({ facingMode: { exact: "MyfacingMode" } }, config, qrCodeSuccessCallback);
  };

  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
    startScanning();

    return () => {
      html5QrCode
        .stop() // QR 코드 스캔 중지
        .then(() => {
          console.log("QR Scanning stopped.");
        })
        .catch((err) => {
          console.log("Unable to stop QR scanning.", err);
        });
    };
  }, []);

  return (
    <>
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
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </QRHeader>
      <div
        id={qrcodeRegionId}
        width="600px"
      />
      <QRFooter />
    </>
  );
}

const QRTotalPage = styled.div`
  height: calc(100vh - 141px);
  display: flex;
  flex-direction: column;
  align-items: center;
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

const QRResult = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  text-align: center;
  position: absolute;
  bottom: 120px;
`;

const QRFooter = styled.div`
  width: 100vw;
  height: 160px;
  background-color: #000;

  position: absolute;
  top: 267px;

  display: flex;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

export default QrScan;
