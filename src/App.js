import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Login from './components/Login';
import Join from './components/Join'; 
import Feed from './components/Feed';
import Register from './components/Register';
import MyPage from './components/MyPage';
import Menu from './components/Menu'; 

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]); // 게시물 상태 추가
  const location = useLocation();
  const isAuthPage = ['/login', '/join', '/'].includes(location.pathname);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]); // 새 게시물 추가
  };

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
          <Route path="/mypage" element={<MyPage currentUser={currentUser} />} /> {/* currentUser prop 전달 */}
        </Routes>
      </Box>
    </Box>
  );
}

export default App;