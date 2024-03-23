import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { getCategoryList, createCategory } from "../utils/axios";
import ModalDeleteCategory from "../components/ModalDeleteCategory";
import ModalModCategory from "../components/ModalModCategory";
import Category from "../components/Category";
import Loading from "../components/Loading";

const MyCardsCategory = ({ onToggle }) => {
  const navigate = useNavigate();
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showModCategoryInput, setShowModCategoryInput] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];
  const [isModalDeleteCategoryOpen, setIsModalDeleteCategoryOpen] = useState(false);
  const [isModalModCategoryOpen, setIsModalModCategoryOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [modifiedCategory, setModifiedCategory] = useState(null);
  const [showNoneCategory, setShowNoneCategory] = useState(true);
  const [loading, setLoading] = useState(true);
  const handleToListLink = () => {
    onToggle();
  };

  const fetchCategoryList = async () => {
    try {
      if (!token) {
        navigate("/");
        return;
      }
      const response = await getCategoryList(token);
      setCategoryList(response.data);
    } catch (error) {
      console.error("Error fetching category list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, [token]);

  const handleToCategoryCard = (category) => {
    navigate(`/mycards/category/${category.categoryId}`, { state: { category } });
  };

  const handleChangeInputData = (e) => {
    setCategoryName(e.target.value);
  };

  const handleChangeModData = (e) => {
    setCategoryName(e.target.value);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      createCategoryList();
    }
  };

  const handleCategoryBtnClick = () => {
    setShowNewCategoryInput(true);
  };

  const handleCategoryNoneBtnClick = () => {
    setShowNoneCategory(false);
    setShowNewCategoryInput(true);
  };

  const createCategoryList = async () => {
    try {
      if (!token) {
        navigate("/");
        return;
      }
      await createCategory(categoryName, token);
      setCategoryName("");

      fetchCategoryList();
      setShowNewCategoryInput(false);
    } catch (error) {
      console.error("Error creating category:", error);
      navigate("/");
    }
  };

  const openModalDeleteCategory = (category) => {
    setCategoryToDelete(category.categoryId);
    setIsModalDeleteCategoryOpen(true);
  };

  const closeModalDeleteCategory = () => {
    setIsModalDeleteCategoryOpen(false);
  };

  const handleModifyCategoryList = (category) => {
    setModifiedCategory(category);
    setShowModCategoryInput(true);
  };

  const openModalModCategory = () => {
    setIsModalModCategoryOpen(true);
  };

  const closeModalModCategory = () => {
    setIsModalModCategoryOpen(false);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <MyCardsHeader>
        <MyCardsHeaderTitle onClick={handleToListLink}>명함 모아보기</MyCardsHeaderTitle>
        <MyCardsHeaderTitleClicked>명함 분류함</MyCardsHeaderTitleClicked>
      </MyCardsHeader>
      {categoryList.length > 0 ? (
        // categoryList가 비어 있지 않을 때
        <div>
          {categoryList.map((category) => (
            <Category
              key={category.categoryId}
              category={category}
              fetchCategoryList={fetchCategoryList}
            />
          ))}
          {showNewCategoryInput && (
            <CategoryLists>
              <CategoryList>
                <CategoryListLeft>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="18"
                    viewBox="0 0 25 18"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1_6988)">
                      <path
                        d="M20.7693 0H3.22945C1.44587 0 0 1.44052 0 3.2175V14.7825C0 16.5595 1.44587 18 3.22945 18H20.7693C22.5529 18 23.9988 16.5595 23.9988 14.7825V3.2175C23.9988 1.44052 22.5529 0 20.7693 0Z"
                        fill="#138EFF"
                      />
                      <path
                        d="M19.9714 6.105H24.059C24.3301 6.105 24.5484 6.3225 24.5484 6.5925V11.4075C24.5484 11.6775 24.3301 11.895 24.059 11.895H19.9714C18.368 11.895 17.0657 10.5975 17.0657 9C17.0657 7.4025 18.368 6.105 19.9714 6.105Z"
                        fill="#138EFF"
                        stroke="white"
                        stroke-width="1.2"
                        stroke-miterlimit="10"
                      />
                      <path
                        d="M19.6327 9.9375C20.1524 9.9375 20.5737 9.51777 20.5737 9C20.5737 8.48223 20.1524 8.0625 19.6327 8.0625C19.113 8.0625 18.6917 8.48223 18.6917 9C18.6917 9.51777 19.113 9.9375 19.6327 9.9375Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_6988">
                        <rect
                          width="25"
                          height="18"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <CategoryInput
                    type="text"
                    value={categoryName}
                    onChange={handleChangeInputData}
                    onKeyPress={handleOnKeyPress}
                    placeholder="정보를 입력하세요."
                  />
                </CategoryListLeft>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  cursor="pointer"
                  onClick={createCategoryList}
                >
                  <path
                    d="M11.2327 2.59385L14.4236 5.74987M14.7619 1.50552L15.4945 2.23817C16.1685 2.91219 16.1685 4.00499 15.4945 4.67901L5.79833 14.3751C5.60887 14.5646 5.3779 14.7073 5.12371 14.7921L1.56868 15.9771C1.23136 16.0896 0.910451 15.7686 1.02289 15.4313L2.2079 11.8763C2.29263 11.6221 2.43538 11.3911 2.62485 11.2016L12.321 1.50551C12.995 0.831496 14.0878 0.831496 14.7619 1.50552Z"
                    stroke="#8C8C8C"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M2.47559 11.0722L5.92746 14.5241"
                    stroke="#8C8C8C"
                    stroke-width="1.2"
                  />
                </svg>
              </CategoryList>
              <CategoryBtn onClick={handleCategoryBtnClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="65"
                  height="65"
                  viewBox="0 0 65 65"
                  fill="none"
                >
                  <path
                    d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5Z"
                    fill="url(#paint0_linear_51_3214)"
                  />
                  <path
                    d="M33 20V46"
                    stroke="white"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M46 33L20 33"
                    stroke="white"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_51_3214"
                      x1="32"
                      y1="-31"
                      x2="32"
                      y2="82"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0.0475677"
                        stop-color="#92CBFF"
                      />
                      <stop
                        offset="0.462568"
                        stop-color="#0587FF"
                      />
                      <stop
                        offset="0.752212"
                        stop-color="#0076FF"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </CategoryBtn>
            </CategoryLists>
          )}
          <CategoryBtn onClick={handleCategoryBtnClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="65"
              viewBox="0 0 65 65"
              fill="none"
            >
              <path
                d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5Z"
                fill="url(#paint0_linear_51_3214)"
              />
              <path
                d="M33 20V46"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                d="M46 33L20 33"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_51_3214"
                  x1="32"
                  y1="-31"
                  x2="32"
                  y2="82"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop
                    offset="0.0475677"
                    stop-color="#92CBFF"
                  />
                  <stop
                    offset="0.462568"
                    stop-color="#0587FF"
                  />
                  <stop
                    offset="0.752212"
                    stop-color="#0076FF"
                  />
                </linearGradient>
              </defs>
            </svg>
          </CategoryBtn>
        </div>
      ) : (
        // categoryList가 비어 있을 때
        <div className="non-category">
          {showNoneCategory && (
            <NoneCategory>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
                style={{ cursor: "pointer" }}
                onClick={handleCategoryNoneBtnClick}
              >
                <path
                  d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5Z"
                  fill="url(#paint0_linear_51_3203)"
                />
                <path
                  d="M33 20V46"
                  stroke="white"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
                <path
                  d="M46 33L20 33"
                  stroke="white"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_51_3203"
                    x1="32"
                    y1="-31"
                    x2="32"
                    y2="82"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0.0475677"
                      stop-color="#92CBFF"
                    />
                    <stop
                      offset="0.462568"
                      stop-color="#0587FF"
                    />
                    <stop
                      offset="0.752212"
                      stop-color="#0076FF"
                    />
                  </linearGradient>
                </defs>
              </svg>
              <p style={{ marginTop: "20px" }}>분류함을 만들어 명함을 정리해보세요.</p>
            </NoneCategory>
          )}
          {showNewCategoryInput && (
            <CategoryLists>
              <CategoryList>
                <CategoryListLeft>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="18"
                    viewBox="0 0 25 18"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1_6988)">
                      <path
                        d="M20.7693 0H3.22945C1.44587 0 0 1.44052 0 3.2175V14.7825C0 16.5595 1.44587 18 3.22945 18H20.7693C22.5529 18 23.9988 16.5595 23.9988 14.7825V3.2175C23.9988 1.44052 22.5529 0 20.7693 0Z"
                        fill="#138EFF"
                      />
                      <path
                        d="M19.9714 6.105H24.059C24.3301 6.105 24.5484 6.3225 24.5484 6.5925V11.4075C24.5484 11.6775 24.3301 11.895 24.059 11.895H19.9714C18.368 11.895 17.0657 10.5975 17.0657 9C17.0657 7.4025 18.368 6.105 19.9714 6.105Z"
                        fill="#138EFF"
                        stroke="white"
                        stroke-width="1.2"
                        stroke-miterlimit="10"
                      />
                      <path
                        d="M19.6327 9.9375C20.1524 9.9375 20.5737 9.51777 20.5737 9C20.5737 8.48223 20.1524 8.0625 19.6327 8.0625C19.113 8.0625 18.6917 8.48223 18.6917 9C18.6917 9.51777 19.113 9.9375 19.6327 9.9375Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_6988">
                        <rect
                          width="25"
                          height="18"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <CategoryInput
                    type="text"
                    value={categoryName}
                    onChange={handleChangeInputData}
                    onKeyPress={handleOnKeyPress}
                    placeholder="정보를 입력하세요."
                  />
                </CategoryListLeft>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  cursor="pointer"
                  onClick={createCategoryList}
                >
                  <path
                    d="M11.2327 2.59385L14.4236 5.74987M14.7619 1.50552L15.4945 2.23817C16.1685 2.91219 16.1685 4.00499 15.4945 4.67901L5.79833 14.3751C5.60887 14.5646 5.3779 14.7073 5.12371 14.7921L1.56868 15.9771C1.23136 16.0896 0.910451 15.7686 1.02289 15.4313L2.2079 11.8763C2.29263 11.6221 2.43538 11.3911 2.62485 11.2016L12.321 1.50551C12.995 0.831496 14.0878 0.831496 14.7619 1.50552Z"
                    stroke="#8C8C8C"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M2.47559 11.0722L5.92746 14.5241"
                    stroke="#8C8C8C"
                    stroke-width="1.2"
                  />
                </svg>
              </CategoryList>
              <CategoryBtn onClick={handleCategoryBtnClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="65"
                  height="65"
                  viewBox="0 0 65 65"
                  fill="none"
                >
                  <path
                    d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5Z"
                    fill="url(#paint0_linear_51_3214)"
                  />
                  <path
                    d="M33 20V46"
                    stroke="white"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M46 33L20 33"
                    stroke="white"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_51_3214"
                      x1="32"
                      y1="-31"
                      x2="32"
                      y2="82"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0.0475677"
                        stop-color="#92CBFF"
                      />
                      <stop
                        offset="0.462568"
                        stop-color="#0587FF"
                      />
                      <stop
                        offset="0.752212"
                        stop-color="#0076FF"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </CategoryBtn>
            </CategoryLists>
          )}
        </div>
      )}
      {isModalModCategoryOpen && <ModalModCategory onClose={closeModalModCategory} />}
    </div>
  );
};

export default MyCardsCategory;

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

const NoneCategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;

  margin-top: 200px;
`;

const CategoryLists = styled.div`
  width: calc(100vw - 32px);
  padding: 0 16px;

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px - 32px);
  }
`;

const CategoryList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 26px;
`;

const CategoryListLeft = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CategoryListRight = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryName = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin-left: 15px;
`;

const CategoryBtn = styled.div`
  position: fixed;
  bottom: 33px;
  right: 20px;
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    right: calc(50vw - 187.5px + 20px);
  }
`;

const CategoryInput = styled.input`
  width: calc(100vw - 25px - 17px - 15px - 15px - 32px);
  border: none;
  outline: none;

  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;

  margin-left: 15px;
  padding-block: 0;
  padding-inline: 0;

  &::placeholder {
    color: #8c8c8c;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
  }

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px - 25px - 17px - 15px - 15px - 32px);
  }
`;

const CategoryMod = styled.input`
  width: calc(100vw - 25px - 17px - 15px - 15px - 30px - 32px);
  border: none;
  outline: none;

  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;

  margin-left: 15px;
  padding-block: 0;
  padding-inline: 0;

  &::placeholder {
    color: #8c8c8c;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
  }

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px - 25px - 17px - 15px - 15px - 30px - 32px);
  }
`;
