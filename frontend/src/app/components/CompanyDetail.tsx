import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Phone as PhoneIcon,
  Message as MessageIcon,
  VideoCall as VideoCallIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CompanyDetail: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const [videoCallDialogOpen, setVideoCallDialogOpen] = useState(false);

  // Sample company data (in production, get from route params/API)
  const companyData = {
    name: 'Amazon',
    logo: 'A',
    batch: '2026',
    jobsPosted: 1,
    hired: 1,
    highestCTC: 46.0,
    avgCTC: 46.0,
    medianCTC: 46.0,
    lowestCTC: 46.0,
  };

  const genderData = [
    { name: 'Male', value: 0 },
    { name: 'Female', value: 1 },
  ];

  const jobTypeData = [
    { name: 'Intern Leads to Full Time', value: 1 },
  ];

  const jobsPosted = [
    {
      job: 'Software Development Engineer',
      posted: '3 Nov 2025',
      batch: '2026',
      ctc: 46.0,
      hired: 1,
    },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleMessage = () => {
    setMessageDialogOpen(true);
  };

  const handleCall = () => {
    setCallDialogOpen(true);
  };

  const handleVideoCall = () => {
    setVideoCallDialogOpen(true);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.default', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              {companyData.logo}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {companyData.name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {companyData.name}
              </Typography>
            </Box>
          </Box>
          
          {/* Communication Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<MessageIcon />}
              onClick={handleMessage}
            >
              Message
            </Button>
            <Button
              variant="outlined"
              startIcon={<PhoneIcon />}
              onClick={handleCall}
            >
              Call
            </Button>
            <Button
              variant="contained"
              startIcon={<VideoCallIcon />}
              onClick={handleVideoCall}
            >
              Video Call
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper elevation={3}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Insights" />
          <Tab label="Jobs" />
          <Tab label="Settings" />
        </Tabs>

        {/* Tab 0: Insights */}
        <TabPanel value={currentTab} index={0}>
          {/* Overview Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Overview
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body2" color="text.secondary">Batch</Typography>
                  <Typography variant="h5" fontWeight="bold">{companyData.batch}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body2" color="text.secondary">Jobs</Typography>
                  <Typography variant="h5" fontWeight="bold">{companyData.jobsPosted}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body2" color="text.secondary">Hired</Typography>
                  <Typography variant="h5" fontWeight="bold">{companyData.hired}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body2" color="text.secondary">Highest CTC</Typography>
                  <Typography variant="h5" fontWeight="bold" color="success.main">
                    ₹{companyData.highestCTC}L
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body2" color="text.secondary">Avg CTC</Typography>
                  <Typography variant="h5" fontWeight="bold">₹{companyData.avgCTC}L</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body2" color="text.secondary">Median CTC</Typography>
                  <Typography variant="h5" fontWeight="bold">₹{companyData.medianCTC}L</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body2" color="text.secondary">Lowest CTC</Typography>
                  <Typography variant="h5" fontWeight="bold">₹{companyData.lowestCTC}L</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Charts */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Gender Distribution - {companyData.batch}
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {genderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                    <Chip label="Female: 1" size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Job Type Distribution - {companyData.batch}
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={jobTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {jobTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                    <Chip label="Intern Leads to Full Time: 1" size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 1: Jobs */}
        <TabPanel value={currentTab} index={1}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Jobs Posted
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Job</strong></TableCell>
                  <TableCell><strong>Posted</strong></TableCell>
                  <TableCell><strong>Batch</strong></TableCell>
                  <TableCell><strong>CTC (LPA)</strong></TableCell>
                  <TableCell><strong>Hired</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobsPosted.map((job, index) => (
                  <TableRow key={index}>
                    <TableCell>{job.job}</TableCell>
                    <TableCell>{job.posted}</TableCell>
                    <TableCell>{job.batch}</TableCell>
                    <TableCell>₹{job.ctc}</TableCell>
                    <TableCell>{job.hired}</TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                        View
                      </Button>
                      <IconButton size="small" onClick={handleMessage}>
                        <MessageIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={handleCall}>
                        <PhoneIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Tab 2: Settings */}
        <TabPanel value={currentTab} index={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Company Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage company preferences, notifications, and communication settings.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button variant="outlined" sx={{ mr: 2 }}>
                  Edit Company Info
                </Button>
                <Button variant="outlined" sx={{ mr: 2 }}>
                  Notification Preferences
                </Button>
                <Button variant="outlined">
                  Privacy Settings
                </Button>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
      </Paper>

      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onClose={() => setMessageDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Message to {companyData.name}</DialogTitle>
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
        <DialogTitle>Call {companyData.name}</DialogTitle>
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

      {/* Video Call Dialog */}
      <Dialog
        open={videoCallDialogOpen}
        onClose={() => setVideoCallDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Video Call with {companyData.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 3, bgcolor: 'grey.900', borderRadius: 2, minHeight: 400 }}>
            <VideoCallIcon sx={{ fontSize: 64, color: 'white', mb: 2 }} />
            <Typography variant="h6" color="white" gutterBottom>
              Video Call Interface
            </Typography>
            <Typography variant="body2" color="grey.400">
              Camera and microphone access required
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <IconButton sx={{ bgcolor: 'grey.700', color: 'white' }}>
                <PhoneIcon />
              </IconButton>
              <IconButton sx={{ bgcolor: 'grey.700', color: 'white' }}>
                <VideoCallIcon />
              </IconButton>
              <IconButton sx={{ bgcolor: 'error.main', color: 'white' }} onClick={() => setVideoCallDialogOpen(false)}>
                <PhoneIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CompanyDetail;
