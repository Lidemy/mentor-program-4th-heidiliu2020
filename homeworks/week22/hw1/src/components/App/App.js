import React, { useState, useEffect } from "react";
import styled from "styled-components";
// 引入使用 CSS Reset
import { Reset } from "styled-reset";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { AuthContext, LoadingContext } from "../../contexts";
import { getMe } from "../../WebAPI";
import { getAuthToken } from "../../utils";

import img from "../../imgs/bg_1.jpg";
import Header from "../Header";
import Footer from "../Footer";
import {
  HomePage,
  NewPostPage,
  AboutPage,
  PostListPage,
  PostPage,
  RegisterPage,
  LoginPage,
} from "../../pages";

const Root = styled.div`
  font-family: "monospace", "微軟正黑體";
  color: #4a4a4a;
  box-sizing: border-box;
  height: 100%;
`;

const BackgroundImage = styled.div`
  padding: 100px 10px;
  background-size: cover;
  background: url(${img}) center center fixed no-repeat;
`;

export default function App() {
  const [isLoadingGetMe, setLoadingGetMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // user 有東西就代表有登入
  const [user, setUser] = useState("");

  useEffect(() => {
    // 以 getAuthToken 從 localStorage 讀取 token
    if (getAuthToken()) {
      // 有 token 才 call API
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
          setLoadingGetMe(false);
        }
      });
    } else {
      setLoadingGetMe(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Reset />
        <BackgroundImage>
          <LoadingContext.Provider
            value={{ isLoading, setIsLoading, isLoadingGetMe }}
          >
            {/* Router: 包在最外層 */}
            <Router>
              {/* 導覽列: 共同區塊 */}
              <Header />
              {/* Switch: 確保只會匹配第一個符合網址列的路由 */}
              <Switch>
                {/* exact path: 完整匹配 */}
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route exact path="/about">
                  <AboutPage />
                </Route>
                <Route exact path="/post-list/">
                  <PostListPage />
                </Route>
                <Route exact path="/post/:id">
                  <PostPage />
                </Route>
                <Route exact path="/new-post">
                  <NewPostPage />
                </Route>
                <Route exact path="/register">
                  <RegisterPage />
                </Route>
                <Route exact path="/login">
                  <LoginPage />
                </Route>
              </Switch>
            </Router>
          </LoadingContext.Provider>
        </BackgroundImage>
        <Footer />
      </Root>
    </AuthContext.Provider>
  );
}
