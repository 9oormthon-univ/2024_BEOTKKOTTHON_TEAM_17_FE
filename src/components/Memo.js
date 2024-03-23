import React, { useState } from "react";
import styled from "styled-components";
import { modifyMemo } from "../utils/axios";
import { useCookies } from "react-cookie";

const Memo = ({ userData, memoText, setMemoText }) => {
  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => setIsEdit(!isEdit);
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];

  const handlePlaceholderClick = () => {
    if (memoText === null) {
      setIsEdit(true);
    }
  };

  const handleRemoveMemo = async () => {
    try {
      const res = await modifyMemo(userData.userId, null, token);
      setMemoText(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MemoBox
      bgColor={userData.bgColor}
      textColor={userData.textColor}
    >
      {isEdit || memoText !== null ? (
        <Textarea
          value={memoText || ""}
          onChange={(e) => setMemoText(e.target.value)}
          onBlur={() => setIsEdit(false)}
          textColor={userData.textColor}
          autoFocus
        />
      ) : (
        <MemoPlaceholder onClick={handlePlaceholderClick}>친구에 대한 추가 정보를 메모해보세요.</MemoPlaceholder>
      )}
      <TrashCan>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          onClick={handleRemoveMemo}
        >
          <g filter="url(#filter0_d_1324_7351)">
            <circle
              cx="17"
              cy="17"
              r="14"
              fill="white"
            />
          </g>
          <path
            d="M21.8 13.6842H22.2C22.6418 13.6842 23 13.3543 23 12.9474V12.5789C23 12.172 22.6418 11.8421 22.2 11.8421H19.8M21.8 13.6842V22.5263C21.8 23.3402 21.0837 24 20.2 24H13.8C12.9163 24 12.2 23.3402 12.2 22.5263V13.6842M21.8 13.6842H12.2M19.8 11.8421V11.4737C19.8 10.6598 19.0837 10 18.2 10H15.8C14.9163 10 14.2 10.6598 14.2 11.4737V11.8421M19.8 11.8421H14.2M12.2 13.6842H11.8C11.3582 13.6842 11 13.3543 11 12.9474V12.5789C11 12.172 11.3582 11.8421 11.8 11.8421H14.2M15.4 16.2632V21.4211M18.6 16.2632V21.4211"
            stroke="black"
            stroke-width="1.2"
            stroke-linecap="round"
          />
          <defs>
            <filter
              id="filter0_d_1324_7351"
              x="0"
              y="0"
              width="34"
              height="34"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood
                flood-opacity="0"
                result="BackgroundImageFix"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite
                in2="hardAlpha"
                operator="out"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1324_7351"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1324_7351"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </TrashCan>
    </MemoBox>
  );
};

export default Memo;

const MemoBox = styled.div`
  width: calc(100vw - 32px);
  max-width: 580px;
  height: 200px;
  border-radius: 10px;
  background: ${(props) => props.bgColor || "#ffe3e7"};
  color: ${(props) => props.textColor || "#000"};
  box-shadow: 0 0 5px 0 #e8e8e8;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
    height: 200px;
  }

  position: relative;
`;

const Textarea = styled.textarea`
  width: 90%;
  height: 150px;
  padding: 10px;
  border: none;
  resize: none;
  background: ${(props) => props.bgColor || "transparent"};
  color: inherit;
  line-height: 1.5;

  color: ${(props) => props.textColor || "#000"};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:focus {
    outline: none;
  }
`;

const MemoPlaceholder = styled.div`
  cursor: pointer;

  color: #8c8c8c;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TrashCan = styled.div`
  position: fixed;
  right: 26px;
  bottom: 90px;
`;
