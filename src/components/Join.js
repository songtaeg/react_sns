import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Join() {
  const [id, setId] = useState(''); // 사용자 아이디
  const [username, setUsername] = useState(''); // 사용자 이름
  const [email, setEmail] = useState(''); // 이메일
  const [password, setPassword] = useState(''); // 비밀번호
  const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // 이메일 형식 유효성 검사
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const checkIdAvailability = async () => {
    try {
      const response = await axios.get(`http://localhost:3100/user/checkid?id=${id}`);
      return response.data.available;
    } catch (error) {
      console.error('아이디 중복 체크 오류:', error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      setErrorMessage('유효한 이메일을 입력해주세요.');
      return;
    }

    // 아이디 중복 체크
    const isIdAvailable = await checkIdAvailability();
    if (!isIdAvailable) {
      setErrorMessage('이미 사용 중인 아이디입니다.');
      return;
    }

    setErrorMessage(''); // 오류 메시지 초기화

    try {
      const response = await axios.post("http://localhost:3100/user/insert", {
        id, username, email, password,
      });

      if (response.data.success) {
        alert('회원가입 성공!');
        navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
      } else {
        alert(response.data.message); // 오류 메시지 표시
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('서버 오류로 회원가입에 실패했습니다.');
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
          회원가입
        </Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>} {/* 오류 메시지 표시 */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="아이디" // 사용자 아이디 입력 필드
            variant="outlined"
            margin="normal"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)} // 아이디 상태 변경
          />
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)} // 사용자 이름 상태 변경
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 이메일 상태 변경
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 변경
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            회원가입
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          이미 회원이라면? <Link to="/login">로그인</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Join;
