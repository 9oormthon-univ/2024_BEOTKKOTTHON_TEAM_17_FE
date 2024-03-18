import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { useUserInfo } from "../store/store";
import { getMyInfo } from "../uitls/axios";
import { useCookies } from "react-cookie";
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

  const { userInfo, setUserInfo } = useUserInfo();
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];

  useEffect(() => {
    async function fetchData() {
      try {
        if (!token) {
          navigate("/");
        }
        const userInfoResponse = await getMyInfo(token);
        if (userInfoResponse && userInfoResponse.status === 200) {
          setUserInfo(userInfoResponse.data);
          console.log(userInfo);
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
    fetchData();
  }, []);

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
      {/* <NoneCards>
        <img src={NoMatched} alt="등록된 명함 X" style={{ height: "30vh" }} />
        <p style={{ marginTop: "30px" }}>아직 등록된 명함이 없어요.</p>
      </NoneCards> */}
      {/* 등록된 명함이 있을 때 */}
      <div className="CardLists">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardListsCard key={index}>
            <Test>
              <Card userData={userInfo} />
            </Test>
            <CardInfo>
              <CardInfoName>김땡땡</CardInfoName>
              <CardInfoContent>010-1234-5678</CardInfoContent>
              <CardInfoContent>kimddangddang@naver.com</CardInfoContent>
            </CardInfo>
          </CardListsCard>
        ))}
      </div>
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

const CardListsCard = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 16px;
  width: calc(100vw - 32px);
  height: calc(100px - 40px);
  border-bottom: 1px solid #8c8c8c;

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px - 32px);
  }
`;

const Test = styled.div`
  transform: scale(0.4);
  width: 0;
`;

const CardInfo = styled.div`
  margin-left: calc(140px + 33px);

  @media (min-width: 435px) {
    margin-left: calc(180px + 33px);
  }

  @media (min-width: 530px) {
    margin-left: calc(200px + 33px);
  }

  @media (hover: hover) and (pointer: fine) and (min-width: 0px) {
    margin-left: calc(140px + 33px);
  }
`;

const CardInfoName = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  padding-bottom: 6px;
`;

const CardInfoContent = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  margin-top: 5px;
`;
