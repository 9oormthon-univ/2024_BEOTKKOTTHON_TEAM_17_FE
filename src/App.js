import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import SignUpStep1 from "./pages/SignUpStep1";
import SignUpStep2 from "./pages/SignUpStep2";
import SignIn from "./pages/SignIn";
import MyPage from "./pages/MyPage";
import MyPageEdit from "./pages/MyPageEdit";
import MyCards from "./pages/MyCards";

import "./App.css";

function App() {
  return (
    <div classname="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<Main />}
        />
        <Route
          exact
          path="/signin"
          element={<SignIn />}
        />
        <Route
          exact
          path="/signup/step1"
          element={<SignUpStep1 />}
        />
        <Route
          exact
          path="/signup/step2"
          element={<SignUpStep2 />}
        />
        <Route
          exact
          path="/mypage"
          element={<MyPage />}
        />
        <Route
          exact
          path="/mypage/edit"
          element={<MyPageEdit />}
        />
        <Route
          exact
          path="/mycards"
          element={<MyCards />}
        />
      </Routes>
    </div>
  );
}

export default App;
