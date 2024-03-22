import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import ModalCard from "../components/ModalCard";
import ModalDelete from "../components/ModalDelete";
import { useOtherInfo } from "../store/store";
import { getListInfo, getSearchInfo } from "../utils/axios";
import { useCookies } from "react-cookie";
import Search from "../images/search3.png";
import NoMatched from "../images/no_matched.png";

const MyCardsList = ({ onToggle }) => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [isModalCardOpen, setIsModalCardOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchedInfo, setSearchedInfo] = useState([]);

  const handleInputChange = (e) => {
    setSearchData(e.target.value);
    handleSearch();
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const handleToCategoryLink = () => {
    onToggle(); // 클릭 이벤트 발생 시 onToggle 함수 호출
  };

  const { otherInfo, setOtherInfo } = useOtherInfo();
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];

  useEffect(() => {
    async function fetchData() {
      try {
        if (!token) {
          navigate("/");
        }
        const otherInfoResponse = await getListInfo(token);
        if (otherInfoResponse && otherInfoResponse.status === 200) {
          console.log(otherInfoResponse);
          setOtherInfo(otherInfoResponse.data);
          console.log(otherInfo);
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (searchData.trim() !== "") {
      try {
        if (!token) {
          navigate("/");
          return;
        }
        const searchRes = await getSearchInfo(token, searchData);
        if (searchRes && searchRes.status === 200) {
          setSearchedInfo(searchRes.data); // 검색 결과를 상태에 저장
          console.log(searchRes.data);
        }
      } catch (error) {
        console.log(error);
        // 오류 처리
      }
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else {
      return ""; // 또는 다른 기본값으로 설정
    }
  };

  const handleCardClick = (user) => {
    setSelectedUser(user);
    setIsModalCardOpen(true);
  };

  const closeModal = () => {
    setIsModalCardOpen(false);
    setIsModalDeleteOpen(false);
  };

  return (
    <div>
      <MyCardsHeader>
        <MyCardsHeaderTitleClicked>명함 모아보기</MyCardsHeaderTitleClicked>
        <MyCardsHeaderTitle onClick={handleToCategoryLink}>명함 분류함</MyCardsHeaderTitle>
      </MyCardsHeader>
      <MyCardsSearch>
        <img
          src={Search}
          alt="검색"
          style={{ height: "20px", marginLeft: "16px", cursor: "pointer" }}
          onClick={handleSearch}
        />
        <MyCardsSearchInput
          type="text"
          value={searchData}
          onChange={handleInputChange}
          onKeyPress={handleOnKeyPress}
          placeholder="이름, 이메일 등으로 검색해보세요"
        />
      </MyCardsSearch>
      {searchData.trim() === "" ? (
        /* 검색하지 않았을 때는 전체 리스트를 보여줌 */
        <>
          {Array.isArray(otherInfo) && otherInfo.length === 0 ? (
            /* 전체 리스트가 없을 때는 등록된 명함이 없다는 메시지 표시 */
            <NoneCards>
              <img
                src={NoMatched}
                alt="등록된 명함 X"
                style={{ height: "30vh" }}
              />
              <p style={{ marginTop: "30px" }}>아직 등록된 명함이 없어요.</p>
            </NoneCards>
          ) : (
            /* 전체 리스트가 있을 때는 해당 리스트를 표시 */
            <div className="CardLists">
              {Array.isArray(otherInfo) &&
                otherInfo.map((user, index) => (
                  <CardListsCard
                    key={index}
                    onClick={() => handleCardClick(user)}
                  >
                    <Test>
                      <Card userData={user} />
                    </Test>
                    <CardInfo>
                      <CardInfoName>{user.name}</CardInfoName>
                      <CardInfoContent>{formatPhoneNumber(user.phone)}</CardInfoContent>
                      <CardInfoContent>{user.email}</CardInfoContent>
                    </CardInfo>
                  </CardListsCard>
                ))}
            </div>
          )}
        </>
      ) : (
        /* 검색한 경우에는 검색 결과를 표시 */
        <>
          {Array.isArray(searchedInfo) && searchedInfo.length === 0 ? (
            /* 검색 결과가 없을 때는 검색 결과가 없다는 메시지 표시 */
            <NoneCards>
              <p style={{ marginTop: "50px" }}>검색된 명함이 없어요.</p>
            </NoneCards>
          ) : (
            /* 검색 결과가 있을 때는 해당 결과를 표시 */
            <div className="CardLists">
              {Array.isArray(searchedInfo) &&
                searchedInfo.map((user, index) => (
                  <CardListsCard
                    key={index}
                    onClick={() => handleCardClick(user)}
                  >
                    <Test>
                      <Card userData={user} />
                    </Test>
                    <CardInfo>
                      <CardInfoName>
                        {user.name.includes(searchData) ? (
                          <>
                            {user.name.split(searchData).map((part, index) => (
                              <React.Fragment key={index}>
                                {index > 0 && <SearchText>{searchData}</SearchText>}
                                {part}
                              </React.Fragment>
                            ))}
                          </>
                        ) : (
                          user.name
                        )}
                      </CardInfoName>
                      <CardInfoContent>
                        {formatPhoneNumber(user.phone).includes(searchData) ? (
                          <>
                            {formatPhoneNumber(user.phone)
                              .split(searchData)
                              .map((part, index) => (
                                <React.Fragment key={index}>
                                  {index > 0 && <SearchText>{searchData}</SearchText>}
                                  {part}
                                </React.Fragment>
                              ))}
                          </>
                        ) : (
                          formatPhoneNumber(user.phone)
                        )}
                      </CardInfoContent>

                      <CardInfoContent>
                        {user.email.includes(searchData) ? (
                          <>
                            {user.email.split(searchData).map((part, index) => (
                              <React.Fragment key={index}>
                                {index > 0 && <SearchText>{searchData}</SearchText>}
                                {part}
                              </React.Fragment>
                            ))}
                          </>
                        ) : (
                          user.email
                        )}
                      </CardInfoContent>
                    </CardInfo>
                  </CardListsCard>
                ))}
            </div>
          )}
        </>
      )}
      {isModalCardOpen && (
        <ModalCard
          user={selectedUser}
          onClose={closeModal}
          onOpenDeleteModal={() => setIsModalDeleteOpen(true)}
        />
      )}
      {isModalDeleteOpen && (
        <ModalDelete
          user={selectedUser}
          onClose={closeModal}
        />
      )}
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

  cursor: pointer;

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

const SearchText = styled.span`
  color: #138eff;
  font-weight: 700;
`;
