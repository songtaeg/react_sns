import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [id, setId] = useState(''); // 이메일 대신 id 사용
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3100/user', { // URL 수정
        id, // id를 사용
        password,
      });

      if (response.data.success) {
        alert('로그인 성공!');
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('서버 오류로 로그인에 실패했습니다.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          로그인
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="아이디" // 라벨 변경
            variant="outlined"
            margin="normal"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)} // id 변경
          />
          <TextField
            label="비밀번호" // 라벨 변경
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            로그인
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          회원아니셈 ? <Link to="/join">회원가입</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
