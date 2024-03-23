import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { deleteCategory } from "../utils/axios";

const ModalDeleteCategory = ({ onClose, categoryToDelete, fetchCategoryList }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];

  const deleteCategoryList = async () => {
    try {
      if (!token) {
        navigate("/");
        return;
      }
      await deleteCategory(categoryToDelete, token);
      onClose();
      fetchCategoryList();
    } catch (error) {
      console.error("Error deleting category:", error);
      navigate("/");
    }
  };

  return (
    <div>
      <ModalBackground onClick={onClose} />
      <ModalSpace>
        <ModalWrap>
          <ModalCloseSpace>
            <ModalClose onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  d="M1 1L8.5 8.5L16 16M16 1L1 16"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </ModalClose>
          </ModalCloseSpace>
          <ModalContent>
            <ModalWarn>!</ModalWarn>
            <ModalTitle>명함분류함을 정말 삭제하시겠어요? </ModalTitle>
            <ModalText>
              삭제를 선택하실 경우,
              <br />
              삭제한 명함분류함은 되돌릴 수 없어요.
            </ModalText>
            <ModalBtns>
              <ModalBtnDel onClick={deleteCategoryList}>삭제</ModalBtnDel>
              <ModalBtnNon onClick={onClose}>취소</ModalBtnNon>
            </ModalBtns>
          </ModalContent>
        </ModalWrap>
      </ModalSpace>
    </div>
  );
};

export default ModalDeleteCategory;

const ModalWrap = styled.div`
  border: 1px solid #aaa;
  box-shadow: 0 0 5px #aaa;
  border-radius: 20px;
  width: calc(100vw - 60px);
  height: 240px;
  z-index: 2;
  background-color: #fff;

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px - 60px);
  }
`;

const ModalSpace = styled.div`
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
`;

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCloseSpace = styled.div`
  margin-top: 22px;
  margin-right: 21px;
  display: flex;
  justify-content: flex-end;
`;

const ModalClose = styled.div`
  cursor: pointer;
  position: relative;
  z-index: 10;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalWarn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border-radius: 100%;
  background: linear-gradient(180deg, #92cbff -39.42%, #0587ff 32.72%, #0076ff 83.08%);

  color: #fff;
  font-family: Pretendard;
  font-size: 35px;
  font-style: normal;
  font-weight: 300;

  margin-top: -21px;
`;

const ModalTitle = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;

  margin-top: 17px;
`;

const ModalText = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;

  text-align: center;
  margin-top: 7px;
`;

const ModalBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ModalBtnDel = styled.div`
  width: 100px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: #138eff;
  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;
  transition: 400ms ease-in-out;

  &:hover {
    background-color: #006eee;
    transition: 400ms ease-in-out;
  }
`;

const ModalBtnNon = styled.div`
  width: 100px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: #f4f4f4;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  margin-left: 9px;
  cursor: pointer;
  transition: 400ms ease-in-out;

  &:hover {
    background-color: #8c8c8c;
    transition: 400ms ease-in-out;
  }
`;
