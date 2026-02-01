import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Campaign as AnnouncementIcon,
  PriorityHigh as HighPriorityIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Notifications as NotificationIcon,
  FilterList as FilterIcon,
  MarkEmailRead as MarkReadIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

interface Announcement {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  date: string;
  author: string;
  read: boolean;
  deadline?: string;
}

const Announcements: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [readFilter, setReadFilter] = useState('All');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Amazon Recruitment Drive - Final Day to Apply',
      description: 'This is the final day to apply for Amazon Software Development Engineer position. Don\'t miss this opportunity!',
      priority: 'high',
      category: 'Placement',
      date: '1 Feb 2026',
      author: 'Placement Cell',
      read: false,
      deadline: '1 Feb 2026, 11:59 PM',
    },
    {
      id: '2',
      title: 'Mock Interview Session Scheduled',
      description: 'Mock interview sessions for final year students will be conducted on 5th Feb. Register now!',
      priority: 'medium',
      category: 'Training',
      date: '30 Jan 2026',
      author: 'Training & Placement',
      read: false,
      deadline: '3 Feb 2026',
    },
    {
      id: '3',
      title: 'Resume Building Workshop',
      description: 'Learn how to create an impressive resume from industry experts. Session on 10th Feb.',
      priority: 'medium',
      category: 'Workshop',
      date: '28 Jan 2026',
      author: 'Placement Cell',
      read: true,
    },
    {
      id: '4',
      title: 'Placement Season Guidelines Updated',
      description: 'New guidelines for placement season 2026-27 have been released. Please review carefully.',
      priority: 'high',
      category: 'Important',
      date: '25 Jan 2026',
      author: 'T&P Office',
      read: false,
    },
    {
      id: '5',
      title: 'Google Information Session',
      description: 'Google will be conducting an information session about their internship program on 15th Feb.',
      priority: 'medium',
      category: 'Company Visit',
      date: '20 Jan 2026',
      author: 'Placement Cell',
      read: true,
    },
    {
      id: '6',
      title: 'Document Verification Reminder',
      description: 'All students must complete document verification by 5th Feb. Pending students check the portal.',
      priority: 'high',
      category: 'Important',
      date: '18 Jan 2026',
      author: 'T&P Office',
      read: false,
      deadline: '5 Feb 2026',
    },
    {
      id: '7',
      title: 'Career Fair Next Month',
      description: 'Annual career fair will be organized in March. Multiple companies will participate.',
      priority: 'low',
      category: 'Event',
      date: '15 Jan 2026',
      author: 'Placement Cell',
      read: true,
    },
  ];

  const categories = ['All', 'Placement', 'Training', 'Workshop', 'Important', 'Company Visit', 'Event'];

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || announcement.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'All' || announcement.category === categoryFilter;
    const matchesRead =
      readFilter === 'All' ||
      (readFilter === 'Read' && announcement.read) ||
      (readFilter === 'Unread' && !announcement.read);
    return matchesSearch && matchesPriority && matchesCategory && matchesRead;
  });

  const unreadCount = announcements.filter((a) => !a.read).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <HighPriorityIcon />;
      case 'medium':
        return <WarningIcon />;
      case 'low':
        return <InfoIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const handleAnnouncementClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setDetailDialogOpen(true);
  };

  const handleMarkAllRead = () => {
    // Mark all as read logic here
    console.log('Marking all as read');
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.default', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Badge badgeContent={unreadCount} color="error">
              <AnnouncementIcon sx={{ fontSize: 40 }} color="primary" />
            </Badge>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Announcements
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {unreadCount} unread announcement{unreadCount !== 1 ? 's' : ''}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<MarkReadIcon />}
            onClick={handleMarkAllRead}
          >
            Mark All as Read
          </Button>
        </Box>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search announcements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Filters */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                label="Priority"
              >
                <MenuItem value="All">All Priorities</MenuItem>
                <MenuItem value="high">High Priority</MenuItem>
                <MenuItem value="medium">Medium Priority</MenuItem>
                <MenuItem value="low">Low Priority</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={readFilter}
                onChange={(e) => setReadFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Unread">Unread</MenuItem>
                <MenuItem value="Read">Read</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Announcements List */}
      <Grid container spacing={3}>
        {filteredAnnouncements.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 8, textAlign: 'center' }}>
              <AnnouncementIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No announcements found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters
              </Typography>
            </Paper>
          </Grid>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <Grid item xs={12} key={announcement.id}>
              <Card
                elevation={announcement.read ? 1 : 3}
                sx={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  bgcolor: announcement.read ? 'background.paper' : 'action.hover',
                  borderLeft: `4px solid`,
                  borderLeftColor: announcement.priority === 'high' ? 'error.main' : announcement.priority === 'medium' ? 'warning.main' : 'info.main',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    boxShadow: 4,
                    cursor: 'pointer',
                  },
                }}
                onClick={() => handleAnnouncementClick(announcement)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        {!announcement.read && (
                          <Badge variant="dot" color="primary">
                            <Box />
                          </Badge>
                        )}
                        <Typography
                          variant="h6"
                          fontWeight={announcement.read ? 'normal' : 'bold'}
                        >
                          {announcement.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {announcement.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                        <Chip
                          icon={getPriorityIcon(announcement.priority)}
                          label={announcement.priority.toUpperCase()}
                          color={getPriorityColor(announcement.priority)}
                          size="small"
                        />
                        <Chip label={announcement.category} size="small" variant="outlined" />
                        <Typography variant="caption" color="text.secondary">
                          Posted by {announcement.author} on {announcement.date}
                        </Typography>
                        {announcement.deadline && (
                          <Chip
                            icon={<ScheduleIcon />}
                            label={`Deadline: ${announcement.deadline}`}
                            size="small"
                            color="warning"
                          />
                        )}
                      </Box>
                    </Box>
                    <IconButton>
                      <NotificationIcon color={announcement.read ? 'disabled' : 'primary'} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Announcement Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              {selectedAnnouncement && getPriorityIcon(selectedAnnouncement.priority)}
              <Typography variant="h5" fontWeight="bold">
                {selectedAnnouncement?.title}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {selectedAnnouncement && (
                <>
                  <Chip
                    label={selectedAnnouncement.priority.toUpperCase()}
                    color={getPriorityColor(selectedAnnouncement.priority)}
                    size="small"
                  />
                  <Chip label={selectedAnnouncement.category} size="small" variant="outlined" />
                  {selectedAnnouncement.deadline && (
                    <Chip
                      icon={<ScheduleIcon />}
                      label={`Deadline: ${selectedAnnouncement.deadline}`}
                      size="small"
                      color="warning"
                    />
                  )}
                </>
              )}
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" paragraph>
            {selectedAnnouncement?.description}
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>
          <Typography variant="body1" paragraph>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Box>
            <Typography variant="body2" color="text.secondary">
              <strong>Posted by:</strong> {selectedAnnouncement?.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Date:</strong> {selectedAnnouncement?.date}
            </Typography>
            {selectedAnnouncement?.deadline && (
              <Typography variant="body2" color="error">
                <strong>Deadline:</strong> {selectedAnnouncement.deadline}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<MarkReadIcon />}>
            Mark as Read
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Announcements;
