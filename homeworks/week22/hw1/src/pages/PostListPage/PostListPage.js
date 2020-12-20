import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { MEDIA_QUERY_MD } from "../../constants/style";
import { getPosts, getLimitPosts, deletePost } from "../../WebAPI";
import { getPages } from "../../utils";
import Pagination from "../../components/Pagination";
import { LoadingContext, AuthContext } from "../../contexts";
import Loading from "../../components/Loading";

const Root = styled.div`
  min-height: 100vh;
`;

const PostsListContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 60px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  background: rgba(246, 246, 246, 0.9);
`;

const PostsListTitle = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  color: #333;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;

  ${MEDIA_QUERY_MD} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;

  ${MEDIA_QUERY_MD} {
    margin-bottom: 8px;
  }
`;

const PostRight = styled.div`
  display: flex;
  align-items: center;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.5);
  margin-left: 8px;
`;

const PostDeleteButton = styled.button`
  color: white;
  background-color: #db4c3f;
  border: 1px solid transparent;
  border-radius: 20px;
  font-size: 14px;
  width: 46px;
  height: 26px;
  cursor: pointer;
`;

function PostList({ post, handleDeletePost }) {
  const { user } = useContext(AuthContext);

  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>
        [#{post.id}] {post.title}
      </PostTitle>
      <PostRight>
        {user.id === post.userId && (
          <PostDeleteButton
            onClick={() => {
              handleDeletePost(post.id);
            }}
          >
            刪除
          </PostDeleteButton>
        )}
        <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
      </PostRight>
    </PostContainer>
  );
}

PostList.propTypes = {
  post: PropTypes.object,
  handleDeletePost: PropTypes.func,
};

export default function PostListPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useRef();
  const limit = 5;

  useEffect(() => {
    setIsLoading(true);
    getPosts().then((posts) => {
      // 讀取留言來計算總頁數
      totalPages.current = getPages(Math.ceil(posts.length / limit));
      // 讀取第一頁文章
      getLimitPosts(1, limit)
        .then((posts) => setPosts(posts))
        .then(() => {
          setIsLoading(false);
        });
    });
  }, [setIsLoading]);

  const handleDeletePost = (id) => {
    setIsLoading(true);
    deletePost(id)
      .then(() => {
        // 刪除後重新讀取第一頁文章
        getLimitPosts(1, limit).then((posts) => setPosts(posts));
      })
      .catch((err) => {
        console.log(err);
      })
      .then(setIsLoading(false));
  };

  return (
    <Root>
      {isLoading ? (
        <Loading />
      ) : (
        <PostsListContainer>
          <PostsListTitle>文章列表</PostsListTitle>
          {posts.map((post) => (
            <PostList
              post={post}
              key={post.id}
              handleDeletePost={handleDeletePost}
            />
          ))}
          <Pagination
            totalPages={totalPages}
            limit={limit}
            setPosts={setPosts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </PostsListContainer>
      )}
    </Root>
  );
}
