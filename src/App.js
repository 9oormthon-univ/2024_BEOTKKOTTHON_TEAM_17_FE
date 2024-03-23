import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import SignUpStep1 from "./pages/SignUpStep1";
import SignUpStep2 from "./pages/SignUpStep2";
import SignIn from "./pages/SignIn";
import MyPage from "./pages/MyPage";
import MyPageEdit from "./pages/MyPageEdit";
import MyCards from "./pages/MyCards";
import MyCardsList from "./pages/MyCardsList";
import MyCardsCategory from "./pages/MyCardsCategory";
import MyCardsCategoryCard from "./pages/MyCardsCategoryCard";
import QrScan from "./pages/QrScan";
import "./App.css";
import CardCustom from "./pages/CardCustom";
import QrRedirect from "./components/QrRedirect";
import SelectAdditional from "./pages/SelectAdditional";
import AdditionalDetails from "./pages/AdditionalDetails";
import FindPassword from "./pages/FindPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/find-password" element={<FindPassword />} />
        <Route exact path="/signup/step1" element={<SignUpStep1 />} />
        <Route exact path="/signup/step2" element={<SignUpStep2 />} />
        <Route exact path="/mypage" element={<MyPage />} />
        <Route exact path="/mypage/edit" element={<MyPageEdit />} />
        <Route exact path="/mypage/edit/additional" element={<SelectAdditional />} />
        <Route exact path="/mypage/edit/additional/detail" element={<AdditionalDetails />} />
        <Route exact path="/mycards" element={<MyCards />} />
        <Route exact path="/mycards/list" element={<MyCardsList />} />
        <Route exact path="/mycards/category" element={<MyCardsCategory />} />
        <Route exact path="/mycards/category/:categoryId" element={<MyCardsCategoryCard />} />
        <Route exact path="/qrscan" element={<QrScan />} />
        <Route exact path="/mypage/custom" element={<CardCustom />} />
        <Route exact path="/redirect/*" element={<QrRedirect />} />
      </Routes>
    </div>
  );
}

export default App;
