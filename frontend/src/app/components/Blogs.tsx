import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  Search as SearchIcon,
  ThumbUp as LikeIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  Phone as PhoneIcon,
  Message as MessageIcon,
  VideoCall as VideoCallIcon,
  TrendingUp as TrendingIcon,
  Create as CreateIcon,
} from '@mui/icons-material';

interface Blog {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  date: string;
  readTime: string;
}

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  text: string;
  date: string;
  likes: number;
}

const Blogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [blogDialogOpen, setBlogDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  const categories = ['All', 'Placement Tips', 'Interview Experiences', 'Career Advice', 'Company Reviews', 'Technical Skills'];

  const blogs: Blog[] = [
    {
      id: '1',
      title: 'My Amazon Interview Experience - Software Development Engineer',
      author: 'Rahul Kumar',
      authorAvatar: 'RK',
      category: 'Interview Experiences',
      tags: ['Amazon', 'SDE', 'Interview'],
      excerpt: 'Sharing my journey through Amazon\'s rigorous interview process for the SDE role. From online assessment to final rounds...',
      content: 'Full detailed content of the blog post goes here...',
      image: 'https://via.placeholder.com/400x200',
      likes: 125,
      comments: 34,
      date: '15 Jan 2026',
      readTime: '5 min read',
    },
    {
      id: '2',
      title: 'Top 10 Tips to Crack Coding Interviews',
      author: 'Priya Sharma',
      authorAvatar: 'PS',
      category: 'Placement Tips',
      tags: ['Coding', 'Interview Prep', 'Tips'],
      excerpt: 'Essential tips and strategies that helped me secure offers from top tech companies...',
      content: 'Full detailed content of the blog post goes here...',
      image: 'https://via.placeholder.com/400x200',
      likes: 243,
      comments: 56,
      date: '10 Jan 2026',
      readTime: '7 min read',
    },
    {
      id: '3',
      title: 'How I Prepared for System Design Interviews in 30 Days',
      author: 'Amit Patel',
      authorAvatar: 'AP',
      category: 'Technical Skills',
      tags: ['System Design', 'Interview Prep'],
      excerpt: 'A structured 30-day plan that helped me master system design concepts from scratch...',
      content: 'Full detailed content of the blog post goes here...',
      likes: 189,
      comments: 42,
      date: '5 Jan 2026',
      readTime: '6 min read',
    },
    {
      id: '4',
      title: 'Google Internship - What to Expect',
      author: 'Sneha Gupta',
      authorAvatar: 'SG',
      category: 'Company Reviews',
      tags: ['Google', 'Internship', 'Experience'],
      excerpt: 'My summer internship experience at Google - the culture, work, and learnings...',
      content: 'Full detailed content of the blog post goes here...',
      likes: 312,
      comments: 78,
      date: '28 Dec 2025',
      readTime: '8 min read',
    },
  ];

  const comments: Comment[] = [
    {
      id: '1',
      author: 'John Doe',
      authorAvatar: 'JD',
      text: 'Great article! Very helpful tips. Thanks for sharing your experience.',
      date: '16 Jan 2026',
      likes: 12,
    },
    {
      id: '2',
      author: 'Jane Smith',
      authorAvatar: 'JS',
      text: 'I have a question about the coding round. How difficult were the questions?',
      date: '16 Jan 2026',
      likes: 5,
    },
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBlogClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setBlogDialogOpen(true);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      // Add comment logic here
      setCommentText('');
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.default', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            Placement Blogs & Experiences
          </Typography>
          <Button variant="contained" startIcon={<CreateIcon />}>
            Write Blog
          </Button>
        </Box>

        {/* Search and Filters */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search blogs, topics, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  color={selectedCategory === category ? 'primary' : 'default'}
                  variant={selectedCategory === category ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Blog Grid */}
      <Grid container spacing={3}>
        {/* Trending Section */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingIcon />
              <Typography variant="h6" fontWeight="bold">
                Trending This Week
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Blog Cards */}
        {filteredBlogs.map((blog) => (
          <Grid item xs={12} md={6} lg={4} key={blog.id}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                  cursor: 'pointer',
                },
              }}
              onClick={() => handleBlogClick(blog)}
            >
              {blog.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.image}
                  alt={blog.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip label={blog.category} size="small" color="primary" sx={{ mb: 1 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {blog.excerpt}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {blog.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                      {blog.authorAvatar}
                    </Avatar>
                    <Box>
                      <Typography variant="caption" display="block" fontWeight="bold">
                        {blog.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {blog.date} · {blog.readTime}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small">
                        <LikeIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="caption">{blog.likes}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small">
                        <CommentIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="caption">{blog.comments}</Typography>
                    </Box>
                  </Box>
                  <IconButton size="small">
                    <ShareIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Blog Detail Dialog */}
      <Dialog
        open={blogDialogOpen}
        onClose={() => setBlogDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {selectedBlog?.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Avatar sx={{ width: 40, height: 40 }}>
                  {selectedBlog?.authorAvatar}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    {selectedBlog?.author}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedBlog?.date} · {selectedBlog?.readTime}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => setMessageDialogOpen(true)} color="primary">
                <MessageIcon />
              </IconButton>
              <IconButton onClick={() => setCallDialogOpen(true)} color="primary">
                <PhoneIcon />
              </IconButton>
              <IconButton color="primary">
                <VideoCallIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedBlog?.image && (
            <Box
              component="img"
              src={selectedBlog.image}
              alt={selectedBlog.title}
              sx={{ width: '100%', borderRadius: 2, mb: 3 }}
            />
          )}
          <Box sx={{ mb: 2 }}>
            <Chip label={selectedBlog?.category} color="primary" sx={{ mr: 1 }} />
            {selectedBlog?.tags.map((tag) => (
              <Chip key={tag} label={tag} variant="outlined" sx={{ mr: 1 }} />
            ))}
          </Box>
          <Typography variant="body1" paragraph>
            {selectedBlog?.content}
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Typography>
          <Typography variant="body1" paragraph>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Comments Section */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Comments ({comments.length})
          </Typography>
          
          {/* Add Comment */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              variant="outlined"
            />
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={handleAddComment}
              disabled={!commentText.trim()}
            >
              Post Comment
            </Button>
          </Box>

          {/* Comments List */}
          <List>
            {comments.map((comment) => (
              <React.Fragment key={comment.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{comment.authorAvatar}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" fontWeight="bold">
                          {comment.author}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {comment.date}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {comment.text}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                          <Button size="small" startIcon={<LikeIcon />}>
                            {comment.likes}
                          </Button>
                          <Button size="small">Reply</Button>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBlogDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onClose={() => setMessageDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Message {selectedBlog?.author}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message"
            variant="outlined"
            margin="normal"
            placeholder="Type your message here..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessageDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setMessageDialogOpen(false)}>Send</Button>
        </DialogActions>
      </Dialog>

      {/* Call Dialog */}
      <Dialog open={callDialogOpen} onClose={() => setCallDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Call {selectedBlog?.author}</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <PhoneIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Initiating call...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we connect you
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="contained" color="success" startIcon={<PhoneIcon />}>
                Accept
              </Button>
              <Button variant="contained" color="error" onClick={() => setCallDialogOpen(false)}>
                Decline
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Blogs;
