import React, { useState } from "react";
import styled from "styled-components";
import BackQRHeader from "../components/BackQRHeader";
import MyCardsList from "./MyCardsList";
import MyCardsCategory from "./MyCardsCategory";

const MyCards = () => {
  const [showList, setShowList] = useState(true);

  const handleToggleComponent = () => {
    setShowList((prevState) => !prevState); // 컴포넌트를 토글하는 함수
  };

  return (
    <div className="page">
      <div className="center">
        <MyCardsPage>
          <div className="page-space">
            <BackQRHeader />
            <MyCardsTitle>김구름님의 명함첩</MyCardsTitle>
            {showList ? (
              <MyCardsList onToggle={handleToggleComponent} />
            ) : (
              <MyCardsCategory onToggle={handleToggleComponent} />
            )}
          </div>
        </MyCardsPage>
      </div>
    </div>
  );
};

export default MyCards;

const MyCardsPage = styled.div`
  background: #fff;
`;

const MyCardsTitle = styled.div`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;

  margin-top: 15px;
  margin-left: 16px;
`;
