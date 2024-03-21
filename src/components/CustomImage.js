import React from "react";
import styled from "styled-components";

const CustomImage = styled.img.attrs((props) => ({
  style: {
    left: `${props.x}px`,
    top: `${props.y}px`,
    width: `${props.width}px`,
    height: `${props.height}px`,
    zIndex: props.zIndex,
  },
}))`
  position: absolute;
`;

export default CustomImage;
