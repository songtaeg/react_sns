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
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = ['/login', '/join', '/'].includes(location.pathname);

  const handleLogout = () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem("token");
      navigate('/'); 
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]); // 새 게시물 추가
  };

  const handleUpdatePostsCount = useCallback(() => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      posts: [...prevUser.posts],
    }));
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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
