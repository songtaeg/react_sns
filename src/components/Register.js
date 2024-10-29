import React from 'react';
import {
  TextField, Button, Container,
  Typography, Box, IconButton, Avatar,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register({ currentUser, onPostCreated }) {
  const [file, setFile] = React.useState(null);
  const [title, setTitle] = React.useState(''); 
  const [content, setContent] = React.useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      alert('사용자가 로그인되어 있지 않습니다.');
      return;
    }

    if (!title) {
      alert('제목을 적어주세요.');
      return;
    }

    if (!content) {
      alert('내용을 적어주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('user_id', currentUser.id);
    formData.append('title', title);
    formData.append('content', content);
    if (file) {
      formData.append('image_url', file);
    }

    try {
      const response = await axios.post('http://localhost:3100/post/insert', formData);
      if (response.data.success) {
        alert('게시물이 등록되었습니다.');
        onPostCreated(response.data.post);
        navigate('/feed');
      } else {
        alert('게시물 등록에 실패했습니다: ' + response.data.message);
      }
    } catch (error) {
      console.error('게시물 등록 중 오류 발생:', error);
      const errorMessage = error.response?.data?.message || '게시물 등록 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Typography variant="h4" gutterBottom>
          등록
        </Typography>

        <TextField
          label="제목"
          value={title}
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="내용"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Box display="flex" alignItems="center" margin="normal" fullWidth>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {file && (
            <Avatar
              alt="첨부된 이미지"
              src={URL.createObjectURL(file)}
              sx={{ width: 56, height: 56, marginLeft: 2 }}
            />
          )}
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {file ? file.name : '첨부할 파일 선택'}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={handleSubmit}
        >
          등록하기
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
