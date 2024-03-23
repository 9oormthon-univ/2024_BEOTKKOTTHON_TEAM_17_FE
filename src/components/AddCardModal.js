import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { addCardsToCategory, getNotExistCard, getSearchCategoryCardInfo } from "../utils/axios";
import { useOtherInfo } from "../store/store";
import Card from "./Card";

const AddCardModal = ({ onClose, token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state.category;

  const [selectedCards, setSelectedCards] = useState([]);
  const { otherInfo, setOtherInfo } = useOtherInfo();
  const [searchData, setSearchData] = useState("");
  const [searchedCardInfo, setSearchedCardInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getNotExistCard(category.categoryId, "", token);
        console.log(res);
        setOtherInfo(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [category.categoryId, token]);

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else {
      return "";
    }
  };

  const toggleCardSelection = (cardId) => {
    setSelectedCards((prevSelected) => {
      if (prevSelected.includes(cardId)) {
        return prevSelected.filter((id) => id !== cardId);
      } else {
        console.log(cardId);
        return [...prevSelected, cardId];
      }
    });
  };

  const handleAddCards = async () => {
    try {
      const formatData = selectedCards.map((cardId) => {
        return { cardId: cardId };
      });
      const res = await addCardsToCategory(category.categoryId, formatData, token);
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setSearchData(e.target.value);
    handleSearch();
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const handleSearch = async () => {
    if (searchData.trim() !== "") {
      try {
        if (!token) {
          navigate("/");
          return;
        }
        const searchRes = await getSearchCategoryCardInfo(token, category.categoryId, searchData);
        if (searchRes && searchRes.status === 200) {
          setSearchedCardInfo(searchRes.data); // 검색 결과를 상태에 저장
          console.log(searchRes.data);
        }
      } catch (error) {
        console.log(error);
        // 오류 처리
      }
    }
  };

  return (
    <div>
      <ModalBackground onClick={onClose} />
      <ModalSpace>
        <ModalWrap>
          <ModalHeader>
            <SearchInputDiv>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                cursor="pointer"
                onClick={handleSearch}
              >
                <path
                  d="M6.64174 12.2835C9.75759 12.2835 12.2835 9.75759 12.2835 6.64174C12.2835 3.52589 9.75759 1 6.64174 1C3.52589 1 1 3.52589 1 6.64174C1 9.75759 3.52589 12.2835 6.64174 12.2835Z"
                  stroke="#8C8C8C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.626 10.6429L15.9999 16"
                  stroke="#8C8C8C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <SearchInput type="text" value={searchData} onChange={handleInputChange} onKeyPress={handleOnKeyPress} />
            </SearchInputDiv>

            <AddButtonContainer>
              <AddButton onClick={handleAddCards}>추가</AddButton>
            </AddButtonContainer>
          </ModalHeader>
          <Divider />

          <StickersContainer>
            {searchData.trim() === "" ? (
              /* 검색하지 않았을 때는 전체 리스트를 보여줌 */
              <>
                {Array.isArray(otherInfo) &&
                  otherInfo.map((user, index) => (
                    <CardListsCard key={index} onClick={() => toggleCardSelection(user.cardId)}>
                      <Test>
                        <Card userData={user} isSelected={selectedCards.includes(user.cardId)} />
                      </Test>
                      <CardInfo>
                        <CardInfoName>{user.name}</CardInfoName>
                        <CardInfoContent>{formatPhoneNumber(user.phone)}</CardInfoContent>
                        <CardInfoContent>{user.email}</CardInfoContent>
                      </CardInfo>
                    </CardListsCard>
                  ))}
              </>
            ) : (
              /* 검색한 경우에는 검색 결과를 표시 */
              <>
                {Array.isArray(searchedCardInfo) && searchedCardInfo.length === 0 ? (
                  /* 검색 결과가 없을 때는 검색 결과가 없다는 메시지 표시 */
                  <NoneCards>
                    <p style={{ marginTop: "50px" }}>검색된 명함이 없어요.</p>
                  </NoneCards>
                ) : (
                  /* 검색 결과가 있을 때는 해당 결과를 표시 */
                  <div className="card-list">
                    {Array.isArray(searchedCardInfo) &&
                      searchedCardInfo.map((user, index) => (
                        <CardListsCard key={index} onClick={() => toggleCardSelection(user.cardId)}>
                          <Test>
                            <Card userData={user} isSelected={selectedCards.includes(user.cardId)} />
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
          </StickersContainer>
        </ModalWrap>
      </ModalSpace>
    </div>
  );
};

export default AddCardModal;

const ModalHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 20px;

  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;

  height: 58px;
`;

const ModalWrap = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(140, 140, 140, 0.5);
  border-radius: 25px 25px 0px 0px;
  width: 100vw;
  height: 550px;
  overflow-y: auto;
  z-index: 2;
  background: #fff;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

const ModalSpace = styled.div`
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  position: fixed;
  bottom: 0;
  left: 0;

  z-index: 100;
`;

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(25, 25, 25, 0.25);
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddButtonContainer = styled.div`
  cursor: pointer;
  margin-left: 9px;
`;

const StickersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;

  margin-top: 10px;
`;

const Divider = styled.div`
  height: 1px;
  // background-color: #8c8c8c;
  width: 100%;
  margin: 0 auto;

  position: sticky;
  top: 58px;
  z-index: 2;
`;

const SearchInputDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: calc(35px - 20px);
  border-radius: 100px;
  background: #f4f4f4;
  border: none;
  width: calc(100vw - 40px - 40px - 20px);

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px - 40px - 40px - 20px);
  }
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  background: none;
  width: 100%;
  margin-left: 10px;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
`;

const AddButton = styled.button`
  color: #8c8c8c;
  background: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-block: 0;
  padding-inline: 0;
  cursor: pointer;
  transition: 400ms ease-in-out;

  border: none;

  &:hover {
    color: #138eff;
    transition: 400ms ease-in-out;
  }
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

const NoneCards = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;

  margin-top: 100px;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

const SearchText = styled.span`
  color: #138eff;
  font-weight: 700;
`;
