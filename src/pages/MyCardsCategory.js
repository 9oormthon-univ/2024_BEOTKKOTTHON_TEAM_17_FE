import styled from "styled-components";

const MyCardsCategory = ({ onToggle }) => {
  const handleToListLink = () => {
    onToggle(); // 클릭 이벤트 발생 시 onToggle 함수 호출
  };

  return (
    <div>
      <MyCardsHeader>
        <MyCardsHeaderTitle onClick={handleToListLink}>명함 모아보기</MyCardsHeaderTitle>
        <MyCardsHeaderTitleClicked>명함 분류함</MyCardsHeaderTitleClicked>
      </MyCardsHeader>
      {/* 등록된 뷴류가 없을 때 */}
      <NoneCategory>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="65"
          height="65"
          viewBox="0 0 65 65"
          fill="none"
          style={{ cursor: "pointer" }}
        >
          <path
            d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5Z"
            fill="url(#paint0_linear_51_3203)"
          />
          <path d="M33 20V46" stroke="white" stroke-width="2.5" stroke-linecap="round" />
          <path d="M46 33L20 33" stroke="white" stroke-width="2.5" stroke-linecap="round" />
          <defs>
            <linearGradient id="paint0_linear_51_3203" x1="32" y1="-31" x2="32" y2="82" gradientUnits="userSpaceOnUse">
              <stop offset="0.0475677" stop-color="#92CBFF" />
              <stop offset="0.462568" stop-color="#0587FF" />
              <stop offset="0.752212" stop-color="#0076FF" />
            </linearGradient>
          </defs>
        </svg>
        <p style={{ marginTop: "20px" }}>분류함을 만들어 명함을 정리해보세요.</p>
      </NoneCategory>
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
