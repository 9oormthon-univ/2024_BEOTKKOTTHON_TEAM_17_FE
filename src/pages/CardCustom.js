import React from "react";
import styled from "styled-components";

import Card from "../components/Card";
import BackQRHeader from "../components/BackQRHeader";
import ColorPalette from "../components/ColorPalette";
import { useUserInfo } from "../store/store";

import CustomSelector from "../components/CustomSelector";
import Canvas from "../components/Canvas";

const CardCustom = () => {
  const { userInfo } = useUserInfo();

  return (
    <div className="page">
      <div className="center">
        <CustomPage>
          <div className="page-space">
            <BackQRHeader />
            <CustomPageCenter>
              <MainText>명함 커스텀</MainText>
              <GuideText>색상 변경 및 스티커를 활용해 나만의 명함을 만들어보세요.</GuideText>
              <Card userData={userInfo} />
              <Canvas />
              <CustomSelector />

              <Test>
                <Card userData={userInfo} />
              </Test>

              <ColorPalette />
            </CustomPageCenter>
          </div>
        </CustomPage>
      </div>
    </div>
  );
};

export default CardCustom;

const CustomPage = styled.div`
  background: #fff;
  border: 1px solid black;
`;

const CustomPageCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCanvas = styled.canvas`
  border-radius: 10px;
  box-shadow: 0 0 5px 0 #e8e8e8;

  display: block;
  margin: auto;

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
    height: 200px;
  }
`;

const ImageSelection = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;

  margin-bottom: 20px;
  margin-top: 20px;
  img {
    width: 50px;
    height: 50px;
    margin: 0 10px;
    cursor: pointer;
  }
`;

const MainText = styled.div`
  align-self: flex-start;
  margin-top: 20px;
  margin-bottom: 17px;
  margin-left: 16px;

  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const GuideText = styled.div`
  align-self: flex-start;
  margin-left: 16px;

  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CanvasContainer = styled.div`
  width: calc(100vw - 32px);
  max-width: 580px;
  height: 200px;
  border-radius: 10px;
  background: #ffe3e7;
  box-shadow: 0 0 5px 0 #e8e8e8;
  display: flex;
  flex-direction: column;

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
    height: 200px;
  }
`;

const Test = styled.div`
  transform: scale(0.5);
`;
