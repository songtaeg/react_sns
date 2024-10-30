import React, { useRef } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setCurrentUser }) {
  const idRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();

  async function fnLogin() {
    try {
      const res = await axios.post("http://localhost:3100/user", {
        id: idRef.current.value,
        password: pwdRef.current.value,
      });

      if (res.data.success) {
        alert("로그인 성공!");
        localStorage.setItem("token", res.data.token);
        setCurrentUser(res.data.user); // 로그인한 사용자 정보를 상태에 저장
        navigate("/feed");
      } else {
        alert("아이디/비밀번호를 다시 확인하세요.");
      }
    } catch (err) {
      console.error("오류 발생:", err);
      alert("로그인 중 오류가 발생했습니다.");
    }
  }

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
        <TextField
          inputRef={idRef}
          label="ID"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          inputRef={pwdRef}
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />
        <Button
          onClick={fnLogin}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          로그인
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          회원이 아니신가요? <Link to="/join">회원가입</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
