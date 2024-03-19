import React from "react";
import styled from "styled-components";
const PlusCircleButton = ({ onClick }) => {
  return (
    <Container>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        onClick={onClick}
      >
        <g filter="url(#filter0_d_138_5516)">
          <circle
            cx="19"
            cy="19"
            r="15"
            fill="white"
          />
        </g>
        <path
          d="M19 26L19 18.9289L19 11.8579M11.9289 18.9289L26.0711 18.9289"
          stroke="#138EFF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <filter
            id="filter0_d_138_5516"
            x="0"
            y="0"
            width="38"
            height="38"
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
            <feGaussianBlur stdDeviation="2" />
            <feComposite
              in2="hardAlpha"
              operator="out"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.54902 0 0 0 0 0.54902 0 0 0 0 0.54902 0 0 0 0.5 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_138_5516"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_138_5516"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </Container>
  );
};

export default PlusCircleButton;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 7px;
`;
