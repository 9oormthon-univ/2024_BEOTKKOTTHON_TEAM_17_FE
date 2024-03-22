import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import React from "react";
import "../styles/Header.css";
import BackArrow from "../images/back_arrow.png";
import Search from "../images/search1.png";

const BackQRHeader = ({ redirectTo, isMyPage }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);

  const goBack = () => {
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      navigate(-1);
    }
  };

  const handleToQrScan = () => {
    navigate("/qrscan");
  };

  const handleToLogOut = () => {
    removeCookie("jwt-token", { path: "/" });
    navigate("/");
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
      {isMyPage ? (
        <HeaderBtn onClick={handleToLogOut}>로그아웃</HeaderBtn>
      ) : (
        <div
          className="search-img"
          onClick={handleToQrScan}
        >
          <img
            src={Search}
            alt="QR 인식"
          />
        </div>
      )}
    </HeaderContainer>
  );
};

export default BackQRHeader;

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

const HeaderBtn = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;

  width: 50px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 14px;
  transition: 400ms ease-in-out;

  &:hover {
    color: #138eff;
    transition: 400ms ease-in-out;
  }
`;
