import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { MEDIA_QUERY_MD } from "../../constants/style";
import { getFirstFivePosts } from "../../WebAPI";
import { LoadingContext } from "../../contexts";
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

  ${MEDIA_QUERY_MD} {
    margin: 30px auto;
    padding: 30px;
  }
`;

const PostsListTitle = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  color: #333;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 20px 0;

  ${MEDIA_QUERY_MD} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PostTitle = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.5);
`;

const PostBody = styled.div`
  font-size: 20px;
  letter-spacing: 3px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 550px;
  max-height: 100px;
`;

const ReadMore = styled.div`
  margin-top: 24px;
  text-align: center;

  a {
    border-radius: 30px;
    font-size: 16px;
    padding: 8px 10px;
    border: 1px solid #555;
    background: #555;
    color: #eee;
    text-decoration: none;
  }
`;

function PostList({ post }) {
  return (
    <PostContainer>
      <PostHeader>
        <PostTitle to={`/post/${post.id}`}>
          [#{post.id}] {post.title}
        </PostTitle>
        <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
      </PostHeader>
      <PostBody>{post.body}</PostBody>
    </PostContainer>
  );
}

PostList.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getFirstFivePosts()
      .then((posts) => setPosts(posts))
      .then(() => {
        setIsLoading(false);
      });
  }, [setIsLoading]);

  return (
    <Root>
      {isLoading ? (
        <Loading />
      ) : (
        <PostsListContainer>
          <PostsListTitle>最新文章</PostsListTitle>
          {posts && posts.map((post) => <PostList post={post} key={post.id} />)}
          <ReadMore>
            <Link to="/post-list">查看更多</Link>
          </ReadMore>
        </PostsListContainer>
      )}
    </Root>
  );
}
