import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Box, Card, CardMedia, CardContent,
  Dialog, DialogTitle, DialogContent, IconButton,
  DialogActions, Button, TextField,
  List, ListItem, ListItemText, ListItemAvatar,
  Avatar, ListItemSecondaryAction,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function Feed({ currentUser, onLogout }) {
  const [open, setOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const handleClickOpen = (feed) => {
    setSelectedFeed(feed);
    setOpen(true);
    fetchComments(feed.post_id);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeed(null);
    setComments([]);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post('http://localhost:3100/comments', {
          post_id: selectedFeed.post_id,
          user_id: currentUser.id,
          content: newComment,
        });
        if (response.data.success) {
          setNewComment('');
          fetchComments(selectedFeed.post_id);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error('댓글 추가 실패:', error);
        setError('댓글 추가에 실패했습니다.');
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`http://localhost:3100/comments/${commentId}`);
      if (response.data.success) {
        fetchComments(selectedFeed.post_id);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      setError('댓글 삭제에 실패했습니다.');
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3100/post/");
      if (response.data.success) {
        setPosts(response.data.posts);
      } else {
        setError('게시물 가져오기 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('게시물 가져오기 중 오류:', error);
      setError('게시물 가져오기 중 오류가 발생했습니다.');
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3100/comments/${postId}`);
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        setError('댓글 가져오기 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('댓글 가져오기 실패:', error);
      setError('댓글 가져오기 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">SNS</Typography>
          {currentUser && (
            <>
              <Typography variant="subtitle1" sx={{ marginLeft: 'auto' }}>
                {currentUser.id}님 환영합니다!
              </Typography>
              <Button color="inherit" onClick={onLogout} sx={{ marginLeft: 2 }}>
                로그아웃
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box mt={4}>
        {error && <Typography color="error">{error}</Typography>}
        {posts.length > 0 ? (
          posts.map((feed) => (
            <Card key={feed.post_id} sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  width: '100%',
                  objectFit: 'cover',
                }}
                image={feed.image_url ? `http://localhost:3100/${feed.image_url}` : '/placeholder.png'}
                alt={feed.content}
                onClick={() => handleClickOpen(feed)}
                style={{ cursor: 'pointer' }}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {feed.content}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  작성자: {feed.user_id}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            게시물이 없습니다.
          </Typography>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>
          {selectedFeed ? selectedFeed.content : '게시물'}
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{selectedFeed ? selectedFeed.description : ''}</Typography>
            {selectedFeed?.image_url && (
              <img src={`http://localhost:3100/${selectedFeed.image_url}`} alt={selectedFeed.content} style={{ width: '100%', marginTop: '10px' }} />
            )}
          </Box>

          <Box sx={{ width: '300px', marginLeft: '20px' }}>
            <Typography variant="h6">댓글</Typography>
            <List>
              {comments.map((comment) => (
                <ListItem key={comment.id}>
                  <ListItemAvatar>
                    <Avatar>{comment.user_id.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={comment.content} secondary={comment.user_id} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleDeleteComment(comment.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <TextField
              label="댓글을 입력하세요"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ marginTop: 1 }}
            >
              댓글 추가
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Feed;
