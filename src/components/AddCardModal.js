import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { addCardsToCategory, getNotExistCard } from "../utils/axios";
import { useLocation } from "react-router-dom";
import { useOtherInfo } from "../store/store";
import Card from "./Card";

const AddCardModal = ({ onClose, token }) => {
  const location = useLocation();
  const category = location.state.category;

  const [selectedCards, setSelectedCards] = useState([]);
  const { otherInfo, setOtherInfo } = useOtherInfo();

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

  return (
    <div>
      <ModalBackground onClick={onClose} />
      <ModalSpace>
        <ModalWrap>
          <ModalHeader>
            <SearchInput />

            <AddButtonContainer>
              <AddButton onClick={handleAddCards}>추가</AddButton>
            </AddButtonContainer>
          </ModalHeader>
          <Divider />

          <StickersContainer>
            {Array.isArray(otherInfo) &&
              otherInfo.map((user, index) => (
                <CardListsCard
                  key={index}
                  onClick={() => toggleCardSelection(user.cardId)}
                >
                  <Test>
                    <Card
                      userData={user}
                      isSelected={selectedCards.includes(user.cardId)}
                    />
                  </Test>
                  <CardInfo>
                    <CardInfoName>{user.name}</CardInfoName>
                    <CardInfoContent>{formatPhoneNumber(user.phone)}</CardInfoContent>
                    <CardInfoContent>{user.email}</CardInfoContent>
                  </CardInfo>
                </CardListsCard>
              ))}
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
  padding-left: 20px;

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

  position: absolute;
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
  position: absolute;
  right: 22px;
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
  background-color: #8c8c8c;
  width: 100%;
  margin: 0 auto;

  position: sticky;
  top: 58px;
  z-index: 2;
`;

const SearchInput = styled.input`
  height: 35px;
  border-radius: 100px;
  background: #f4f4f4;
  border: none;
  width: 250px;
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

  border: none;
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

const SelectedOverlay = styled.div`
  position: absolute;
`;
