import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  CheckCircle as AppliedIcon,
  Cancel as RejectedIcon,
  Star as OfferedIcon,
  Work as WorkIcon,
} from '@mui/icons-material';

interface Job {
  id: string;
  company: string;
  role: string;
  type: 'Summer Intern' | 'Regular Intern' | 'Full Time' | 'Intern + Full Time' | 'Intern Leads to Full Time';
  ctc: string;
  location: string;
  postedDate: string;
  deadline: string;
  status: 'eligible' | 'applied' | 'rejected' | 'offered' | 'not-eligible' | 'eligible-not-applied';
  description: string;
  eligibility: {
    cgpa: number;
    branches: string[];
    batch: string;
  };
}

const Jobs: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState<string>('All');
  const [jobs, setJobs] = useState<Job[]>([]);

  // Sample job data
  useEffect(() => {
    const sampleJobs: Job[] = [
      {
        id: '1',
        company: 'Amazon',
        role: 'Software Development Engineer',
        type: 'Intern Leads to Full Time',
        ctc: '46.0 LPA',
        location: 'Bangalore',
        postedDate: '3 Nov 2025',
        deadline: '15 Feb 2026',
        status: 'offered',
        description: 'Looking for talented engineers to work on distributed systems.',
        eligibility: { cgpa: 7.0, branches: ['CSE', 'IT'], batch: '2026' }
      },
      {
        id: '2',
        company: 'Google',
        role: 'Software Engineering Intern',
        type: 'Summer Intern',
        ctc: '1.5 Lakh/month',
        location: 'Hyderabad',
        postedDate: '15 Oct 2025',
        deadline: '20 Feb 2026',
        status: 'applied',
        description: 'Work on cutting-edge technologies and products used by billions.',
        eligibility: { cgpa: 7.5, branches: ['CSE', 'IT', 'ECE'], batch: '2026' }
      },
      {
        id: '3',
        company: 'Microsoft',
        role: 'Software Engineer',
        type: 'Full Time',
        ctc: '42.0 LPA',
        location: 'Bangalore',
        postedDate: '20 Sep 2025',
        deadline: '10 Feb 2026',
        status: 'rejected',
        description: 'Join one of the world\'s leading technology companies.',
        eligibility: { cgpa: 7.0, branches: ['CSE', 'IT'], batch: '2026' }
      },
      {
        id: '4',
        company: 'Goldman Sachs',
        role: 'Analyst - Engineering',
        type: 'Full Time',
        ctc: '38.0 LPA',
        location: 'Bangalore',
        postedDate: '5 Jan 2026',
        deadline: '25 Feb 2026',
        status: 'eligible',
        description: 'Work on financial technology solutions.',
        eligibility: { cgpa: 7.5, branches: ['CSE', 'IT'], batch: '2026' }
      },
      {
        id: '5',
        company: 'Flipkart',
        role: 'SDE Intern',
        type: 'Regular Intern',
        ctc: '80K/month',
        location: 'Bangalore',
        postedDate: '10 Dec 2025',
        deadline: '5 Mar 2026',
        status: 'eligible-not-applied',
        description: 'Build innovative e-commerce solutions.',
        eligibility: { cgpa: 7.0, branches: ['CSE', 'IT', 'ECE'], batch: '2026' }
      },
      {
        id: '6',
        company: 'Adobe',
        role: 'Software Developer',
        type: 'Intern + Full Time',
        ctc: '28.0 LPA',
        location: 'Noida',
        postedDate: '1 Nov 2025',
        deadline: '28 Feb 2026',
        status: 'not-eligible',
        description: 'Creative technology for world-class products.',
        eligibility: { cgpa: 8.0, branches: ['CSE'], batch: '2026' }
      }
    ];
    setJobs(sampleJobs);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const getFilteredJobs = () => {
    let filtered = jobs;

    // Filter by tab
    switch (currentTab) {
      case 1: // Eligible Jobs
        filtered = filtered.filter(job => job.status === 'eligible' || job.status === 'eligible-not-applied');
        break;
      case 2: // Applied Jobs
        filtered = filtered.filter(job => job.status === 'applied');
        break;
      case 3: // Eligible But Not Applied
        filtered = filtered.filter(job => job.status === 'eligible-not-applied');
        break;
      case 4: // Not Eligible Jobs
        filtered = filtered.filter(job => job.status === 'not-eligible');
        break;
      case 5: // Rejected Jobs
        filtered = filtered.filter(job => job.status === 'rejected');
        break;
      case 6: // Offered Jobs
        filtered = filtered.filter(job => job.status === 'offered');
        break;
      default: // Jobs For You (All)
        break;
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by job type
    if (jobTypeFilter !== 'All') {
      filtered = filtered.filter(job => job.type === jobTypeFilter);
    }

    return filtered;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'offered': return 'success';
      case 'applied': return 'info';
      case 'rejected': return 'error';
      case 'eligible': return 'primary';
      case 'eligible-not-applied': return 'warning';
      case 'not-eligible': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'offered': return 'Offered';
      case 'applied': return 'Applied';
      case 'rejected': return 'Rejected';
      case 'eligible': return 'Eligible';
      case 'eligible-not-applied': return 'Not Applied';
      case 'not-eligible': return 'Not Eligible';
      default: return status;
    }
  };

  const filteredJobs = getFilteredJobs();

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.default', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Job Opportunities
        </Typography>
        
        {/* Search and Filter */}
        <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search jobs, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1, minWidth: '300px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Job Type</InputLabel>
            <Select
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
              label="Job Type"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Summer Intern">Summer Intern</MenuItem>
              <MenuItem value="Regular Intern">Regular Intern</MenuItem>
              <MenuItem value="Full Time">Full Time</MenuItem>
              <MenuItem value="Intern + Full Time">Intern + Full Time</MenuItem>
              <MenuItem value="Intern Leads to Full Time">Intern Leads to Full Time</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper elevation={3}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label={`Jobs For You (${jobs.length})`} />
          <Tab label={`Eligible Jobs (${jobs.filter(j => j.status === 'eligible' || j.status === 'eligible-not-applied').length})`} />
          <Tab label={`Applied Jobs (${jobs.filter(j => j.status === 'applied').length})`} />
          <Tab label={`Eligible But Not Applied (${jobs.filter(j => j.status === 'eligible-not-applied').length})`} />
          <Tab label={`Not Eligible (${jobs.filter(j => j.status === 'not-eligible').length})`} />
          <Tab label={`Rejected Jobs (${jobs.filter(j => j.status === 'rejected').length})`} />
          <Tab label={`Offered Jobs (${jobs.filter(j => j.status === 'offered').length})`} />
        </Tabs>

        {/* Job Listings */}
        <Box sx={{ p: 3 }}>
          {filteredJobs.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <WorkIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No jobs found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters or check back later for new opportunities
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredJobs.map((job) => (
                <Grid item xs={12} key={job.id}>
                  <Card
                    elevation={2}
                    sx={{
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <BusinessIcon color="primary" />
                            <Typography variant="h5" fontWeight="bold">
                              {job.company}
                            </Typography>
                            <Chip
                              label={getStatusLabel(job.status)}
                              color={getStatusColor(job.status)}
                              size="small"
                            />
                          </Box>
                          <Typography variant="h6" color="text.secondary" gutterBottom>
                            {job.role}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h5" fontWeight="bold" color="primary">
                            {job.ctc}
                          </Typography>
                          <Chip label={job.type} size="small" variant="outlined" sx={{ mt: 1 }} />
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {job.location}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Posted:</strong> {job.postedDate}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Deadline:</strong> {job.deadline}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Min CGPA:</strong> {job.eligibility.cgpa}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {job.description}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Eligible Branches:</strong>
                        </Typography>
                        {job.eligibility.branches.map((branch) => (
                          <Chip key={branch} label={branch} size="small" variant="outlined" />
                        ))}
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        {job.status === 'eligible' || job.status === 'eligible-not-applied' ? (
                          <Button variant="contained" color="primary">
                            Apply Now
                          </Button>
                        ) : null}
                        <Button variant="outlined">
                          View Details
                        </Button>
                        {job.status === 'offered' && (
                          <Button variant="contained" color="success">
                            View Offer Letter
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Jobs;
