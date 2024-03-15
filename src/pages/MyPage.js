import "../styles/Main.css";
import styled from "styled-components";
const MyPage = () => {
  return (
    <div className="page">
      <div className="center">
        <MyPageBack>
          <div className="page-space">ㅇㅇ</div>
        </MyPageBack>
      </div>
    </div>
  );
};

export default MyPage;

const MyPageBack = styled.div`
  background: #fff;
`;
