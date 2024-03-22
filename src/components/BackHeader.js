import styled from "styled-components";
import React from "react";
import "../styles/Header.css";
import BackArrow from "../images/back_arrow.png";
import { useNavigate } from "react-router-dom";

const BackHeader = ({ redirectTo }) => {
  const navigate = useNavigate();
  const goBack = () => {
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      navigate(-1);
    }
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
  color: #fff;

  height: 24px;
  padding: 10px 4px;
`;

const Img = styled.img`
  margin-left: 16px;
  width: 17px;
  height: auto;
`;
