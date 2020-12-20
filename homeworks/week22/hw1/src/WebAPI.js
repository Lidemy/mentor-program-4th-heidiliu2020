import { getAuthToken } from "./utils";

const BASE_URL = "https://student-json-api.lidemy.me";

// 讀取所有文章
export const getPosts = () =>
  fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );

// 讀取單篇文章
export const getPost = (id) =>
  fetch(`${BASE_URL}/posts?id=${id}&_expand=user`).then((res) => res.json());

// 讀取最新五篇文章
export const getFirstFivePosts = () =>
  fetch(`${BASE_URL}/posts?_limit=5&_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );

// 依照X頁數，讀取Y篇文章
export const getLimitPosts = (page, limit) =>
  fetch(
    `${BASE_URL}/posts?_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`
  ).then((res) => res.json());

// 刪除文章
export const deletePost = (id) => {
  return fetch("https://student-json-api.lidemy.me/posts/" + id, {
    method: "DELETE",
  }).then((res) => res.json());
};

// 發布文章
export const addNewPost = (title, body) => {
  // 從 localStorage 拿取 token
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

// 註冊
export const register = ({ username, password, nickname }) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

// 登入
export const login = ({ username, password }) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

// 身分驗證
export const getMe = () => {
  // 從 localStorage 拿取 token
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
