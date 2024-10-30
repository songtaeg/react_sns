import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Join() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const navigate = useNavigate();

  const handleIdCheck = async () => {
    setError('');

    if (!id) {
      setError('아이디를 입력하세요.');
      return;
    }

    try {
      const res = await axios.post("http://localhost:3100/user/check_id", { id });
      if (res.data.success) {
        setIsIdAvailable(true);
        alert('사용 가능한 아이디입니다.');
      } else {
        setIsIdAvailable(false);
        setError(res.data.message);
      }
    } catch (err) {
      console.error("아이디 중복 확인 오류 발생:", err);
      setError(err.response?.data?.message || '아이디 중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleJoin = async () => {
    setError('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isIdAvailable) {
      setError('아이디 중복 확인을 해주세요.');
      return;
    }

    try {
      const res = await axios.post("http://localhost:3100/user/insert", {
        id, name, email, password,
      });

      if (res.data.success) {
        alert('회원가입 성공!');
        navigate('/login');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("회원가입 오류 발생:", err);
      setError(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        padding={2}
      >
        <Typography variant="h4" gutterBottom>
          회원가입
        </Typography>

        <Box display="flex" width="100%" alignItems="center">
          <TextField
            label="아이디"
            variant="outlined"
            margin="normal"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Button
            margin="normal"
            onClick={handleIdCheck}
            variant="outlined"
            color="primary"
            style={{ 
              minWidth: '120px', // 버튼의 최소 너비 설정
              height: '60px',    // 버튼 높이 설정
            }}
          >
            중복 확인
          </Button>
        </Box>

        <TextField
          label="이름"
          variant="outlined"
          margin="normal"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="이메일"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="비밀번호"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="비밀번호 확인"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
        
        <Button
          onClick={handleJoin}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px', padding: '12px' }} // 패딩 조정
        >
          회원가입
        </Button>
        
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          이미 회원이라면? <Link to="/login">로그인</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Join;
