import React, { useState, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Login from './components/Login';
import Join from './components/Join'; 
import Feed from './components/Feed';
import Register from './components/Register';
import MyPage from './components/MyPage';
import Menu from './components/Menu'; 

function App() {
  // 현재 사용자 상태와 게시물 상태를 관리하는 useState 훅
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // 현재 위치와 네비게이션을 위한 훅
  const location = useLocation();
  const navigate = useNavigate();

  // 인증 페이지인지 여부를 확인
  const isAuthPage = ['/login', '/join', '/'].includes(location.pathname);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    try {
      setCurrentUser(null); // 현재 사용자 상태를 null로 설정
      localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
      navigate('/'); // 홈으로 리다이렉트
    } catch (error) {
      console.error("로그아웃 오류:", error); // 오류 발생 시 콘솔에 출력
    }
  };

  // 새 게시물이 생성될 때 호출되는 함수
  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]); // 새 게시물을 기존 게시물 목록에 추가
  };

  // 사용자 게시물 수 업데이트를 위한 콜백 함수
  const handleUpdatePostsCount = useCallback(() => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      posts: [...prevUser.posts],
    }));
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* 인증 페이지가 아닐 경우 메뉴 표시 */}
      {!isAuthPage && <Menu />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/feed" element={<Feed currentUser={currentUser} posts={posts} onLogout={handleLogout} onPostCreated={handlePostCreated} />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={<Register currentUser={currentUser} onPostCreated={handlePostCreated} />} />
          <Route path="/mypage" element={<MyPage currentUser={currentUser} onUpdatePostsCount={handleUpdatePostsCount} />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;

