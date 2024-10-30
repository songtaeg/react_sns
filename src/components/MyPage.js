import React from 'react';
import { Container, Typography, Box, Avatar, Paper } from '@mui/material';

function MyPage({ currentUser }) {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', width: '100%' }}>
          {/* 프로필 정보 상단 배치 */}
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
            <Avatar
              alt="프로필 이미지"
              src={currentUser?.profileImage || "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"} // 기본 프로필 이미지 설정
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <Typography variant="h5">{currentUser?.name || '홍길동'}</Typography>
            <Typography variant="body2" color="text.secondary">
              @{currentUser?.id || 'honggildong'}
            </Typography>
          </Box>

          {/* 소개 섹션 */}
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">
              {currentUser?.bio || '안녕하세요! SNS를 통해 친구들과 소통하고 있습니다. 사진과 일상을 공유하는 것을 좋아해요.'}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default MyPage;