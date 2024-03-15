import styled from "styled-components";
import React from "react";
import "../styles/Header.css";
import BackArrow from "../images/back_arrow.png";

const BackHeader = () => {
  const goBack = () => {
    window.history.back(); // 뒤로 가기
  };
  return (
    <HeaderContainer>
      <div className="backarrow-img">
        <Img
          onClick={goBack}
          style={{ cursor: "pointer" }}
          src={BackArrow}
          alt="뒤로가기"
        />
      </div>
    </HeaderContainer>
  );
};

export default BackHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6dvh;
  color: #fff;
`;

const Img = styled.img`
  margin-left: 16px;
  width: 17px;
  height: auto;
`;
