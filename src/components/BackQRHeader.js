import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../styles/Header.css";
import BackArrow from "../images/back_arrow.png";
import Search from "../images/search1.png";

const BackHeader = () => {
  const navigate = useNavigate();

  const goBack = () => {
    window.history.back(); // 뒤로 가기
  };

  const handleToQrScan = () => {
    navigate("/qrscan");
  };

  return (
    <HeaderContainer>
      <div className="backarrow-img">
        <Img onClick={goBack} style={{ cursor: "pointer" }} src={BackArrow} alt="뒤로가기" />
      </div>
      <div className="search-img" onClick={handleToQrScan}>
        <img src={Search} alt="QR 인식" />
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

  padding: 10px 4px;
`;

const Img = styled.img`
  margin-left: 16px;
  width: 17px;
  height: auto;
`;
