import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Search from "../images/search3.png";
import NoMatched from "../images/no_matched.png";

const MyCardsList = ({ onToggle }) => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");

  const handleInputChange = (e) => {
    setSearchData(e.target.value);
  };

  const handleSearch = () => {
    if (searchData.trim() !== "") {
      navigate("/"); // 검색어를 trim하여 공백을 제거하고 검색합니다. - 임시로 메인 페이지 이동
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const handleToCategoryLink = () => {
    onToggle(); // 클릭 이벤트 발생 시 onToggle 함수 호출
  };

  return (
    <div>
      <MyCardsHeader>
        <MyCardsHeaderTitleClicked>명함 모아보기</MyCardsHeaderTitleClicked>
        <MyCardsHeaderTitle onClick={handleToCategoryLink}>명함 분류함</MyCardsHeaderTitle>
      </MyCardsHeader>
      <MyCardsSearch>
        <img src={Search} alt="검색" style={{ height: "20px", marginLeft: "16px" }} />
        <MyCardsSearchInput
          type="text"
          value={searchData}
          onChange={handleInputChange}
          onKeyPress={handleOnKeyPress}
          placeholder="이름, 이메일 등으로 검색해보세요"
        />
      </MyCardsSearch>
      {/* 등록된 명함이 없을 때 */}
      <NoneCards>
        <img src={NoMatched} alt="등록된 명함 X" style={{ height: "30vh" }} />
        <p style={{ marginTop: "30px" }}>아직 등록된 명함이 없어요.</p>
      </NoneCards>
    </div>
  );
};

export default MyCardsList;

const MyCardsHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 30px;
`;

const MyCardsHeaderTitleClicked = styled.div`
  color: #138eff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  width: calc(100vw / 2);
  padding-bottom: 17px;
  border-bottom: 2px solid #138eff;

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px / 2);
  }
`;

const MyCardsHeaderTitle = styled.div`
  color: #8c8c8c;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  width: calc(100vw / 2);
  padding-bottom: 17px;
  border-bottom: 1px solid #8c8c8c;

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px / 2);
  }
`;

const MyCardsSearch = styled.div`
  width: 100vw;
  height: 37px;
  border-bottom: 1px solid #8c8c8c;

  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;

  display: flex;
  align-items: center;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

const MyCardsSearchInput = styled.input`
  width: calc(100vw - 16px - 20px - 13px - 16px);
  border: none;
  outline: none;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;

  margin-left: 13px;

  &::placeholder {
    color: #8c8c8c;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px - 16px - 20px - 13px - 16px);
  }
`;

const NoneCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;

  margin-top: 100px;
`;
