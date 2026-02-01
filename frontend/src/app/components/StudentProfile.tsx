import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Divider,
  IconButton,
  LinearProgress,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  Visibility as PreviewIcon,
  CheckCircle as VerifiedIcon,
  Cancel as UnverifiedIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';

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

const StudentProfile: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEditSection, setCurrentEditSection] = useState('');

  // Sample student data (in production, fetch from API)
  const studentData = {
    name: 'AYUSH KUMAR TIWARI',
    rollNumber: '230101044',
    verified: false,
    branch: 'Computer Science and Engineering',
    course: 'B.Tech',
    batch: '2027',
    cgpa: 7.67,
    currentSemester: 4,
    email: 'ayush.tiwari@iiitbh.ac.in',
    phone: '+91 9876543210',
    linkedin: 'linkedin.com/in/ayush-tiwari',
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const openEditDialog = (section: string) => {
    setCurrentEditSection(section);
    setEditDialogOpen(true);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.default', minHeight: '100vh', p: 3 }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {studentData.name}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {studentData.rollNumber}
            </Typography>
            <Chip
              icon={studentData.verified ? <VerifiedIcon /> : <UnverifiedIcon />}
              label={studentData.verified ? 'Verified' : 'UnVerified'}
              color={studentData.verified ? 'success' : 'warning'}
              sx={{ mt: 1 }}
            />
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h3" fontWeight="bold" color="primary">
              {studentData.cgpa}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              CGPA
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Tabs Navigation */}
      <Paper elevation={3}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Details" />
          <Tab label="Academics" />
          <Tab label="Resumes" />
          <Tab label="Documents" />
          <Tab label="Tracker" />
          <Tab label="Offers" />
          <Tab label="Payments" />
          <Tab label="Feedbacks" />
          <Tab label="Preferences" />
          <Tab label="Points" />
          <Tab label="Work Experience" />
          <Tab label="Skills, Languages" />
          <Tab label="Projects" />
          <Tab label="Awards" />
          <Tab label="Certification" />
          <Tab label="Competitions" />
          <Tab label="Conferences & Workshops" />
          <Tab label="Test Scores" />
          <Tab label="Patents" />
          <Tab label="Publications" />
          <Tab label="Scholarships" />
          <Tab label="Volunteering" />
          <Tab label="Extra Curricular" />
          <Tab label="Write Ups" />
          <Tab label="Career Breaks" />
          <Tab label="Social Media" />
        </Tabs>

        {/* Tab 0: Details */}
        <TabPanel value={currentTab} index={0}>
          <Grid container spacing={3}>
            {/* Summary Section */}
            <Grid xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">SUMMARY</Typography>
                    <Button startIcon={<EditIcon />} onClick={() => openEditDialog('summary')}>
                      EDIT
                    </Button>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>ABOUT</Typography>
                  <Grid container spacing={2}>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Roll Number:</Typography>
                      <Typography variant="body1">{studentData.rollNumber}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Full Name:</Typography>
                      <Typography variant="body1">{studentData.name}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Branch:</Typography>
                      <Typography variant="body1">{studentData.branch}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Course:</Typography>
                      <Typography variant="body1">{studentData.course}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">College:</Typography>
                      <Typography variant="body1">Indian Institute of Information Technology Bhagalpur</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Passed Out Year:</Typography>
                      <Typography variant="body1">{studentData.batch}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Gender:</Typography>
                      <Typography variant="body1">MALE</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Placement Cycle:</Typography>
                      <Typography variant="body1">Placement Cycle 2026-2027</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Birthday:</Typography>
                      <Typography variant="body1">15 Jan 2004</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Career Path:</Typography>
                      <Typography variant="body1">Interested For Placement</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Admission Through:</Typography>
                      <Typography variant="body1">JEE Main</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Rank:</Typography>
                      <Typography variant="body1">12456</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Religion:</Typography>
                      <Typography variant="body1">Hindu</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Category:</Typography>
                      <Typography variant="body1">General</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Person With Disability:</Typography>
                      <Typography variant="body1">No</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Academics Attendance:</Typography>
                      <Typography variant="body1">85%</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">T&P Attendance:</Typography>
                      <Typography variant="body1">92%</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Student Status:</Typography>
                      <Typography variant="body1">INTERESTED_FOR_PLACEMENT</Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />
                  
                  {/* Student Point of Contact */}
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    STUDENT POINT OF CONTACT
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">Mentor:</Typography>
                      <Typography variant="body1">Dr. Rajesh Kumar</Typography>
                    </Grid>
                    <Grid xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">Advisor:</Typography>
                      <Typography variant="body1">Prof. Anita Sharma</Typography>
                    </Grid>
                    <Grid xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">Coordinator:</Typography>
                      <Typography variant="body1">Mr. Vikram Singh</Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  {/* Education Gaps */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">EDUCATION GAPS</Typography>
                    <Button size="small" startIcon={<EditIcon />}>EDIT</Button>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Gap in Studies:</Typography>
                      <Typography variant="body1">No</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Duration Of Gap:</Typography>
                      <Typography variant="body1">-</Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  {/* Contact Information */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">STUDENT CONTACT INFORMATION</Typography>
                    <Button size="small" startIcon={<EditIcon />}>EDIT</Button>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Communication E-mail:</Typography>
                      <Typography variant="body1">{studentData.email} ✅</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Personal E-mail:</Typography>
                      <Typography variant="body1">ayush.personal@gmail.com ✅</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Phone Number:</Typography>
                      <Typography variant="body1">{studentData.phone}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">WhatsApp Number:</Typography>
                      <Typography variant="body1">{studentData.phone}</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Parent Phone Number:</Typography>
                      <Typography variant="body1">+91 9876543211</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">LinkedIn Profile:</Typography>
                      <Typography variant="body1">{studentData.linkedin}</Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  {/* More Info */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">MORE INFO</Typography>
                    <Button size="small" startIcon={<EditIcon />}>EDIT</Button>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Nationality:</Typography>
                      <Typography variant="body1">Indian</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Aadhaar Number:</Typography>
                      <Typography variant="body1">XXXX-XXXX-1234</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Passport Number:</Typography>
                      <Typography variant="body1">M12345678</Typography>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Driving Licence:</Typography>
                      <Typography variant="body1">BR0120200012345</Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  {/* Current Address */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">CURRENT ADDRESS</Typography>
                    <Button size="small" startIcon={<EditIcon />}>EDIT</Button>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid xs={12}>
                      <Typography variant="body2" color="text.secondary">Address:</Typography>
                      <Typography variant="body1">IIIT Bhagalpur Campus, Sabour, Bhagalpur, Bihar - 813210</Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  {/* Permanent Address */}
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>PERMANENT ADDRESS</Typography>
                  <Grid container spacing={2}>
                    <Grid xs={12}>
                      <Typography variant="body2" color="text.secondary">Address:</Typography>
                      <Typography variant="body1">123, Boring Road, Patna, Bihar - 800001</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 1: Academics */}
        <TabPanel value={currentTab} index={1}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {studentData.branch}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {studentData.batch} Out Going
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box>
                  <Typography variant="h3" fontWeight="bold" color="primary">
                    {studentData.cgpa}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">CGPA</Typography>
                </Box>
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">College:</Typography>
                  <Typography variant="body1">Indian Institute of Information Technology Bhagalpur</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Course:</Typography>
                  <Typography variant="body1">{studentData.course}</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Branch:</Typography>
                  <Typography variant="body1">{studentData.branch}</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Career Path:</Typography>
                  <Typography variant="body1">INTERESTED FOR PLACEMENT</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Current Arrears:</Typography>
                  <Typography variant="body1">0</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Arrears History:</Typography>
                  <Typography variant="body1">0</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Semester wise Scores
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sem</TableCell>
                      <TableCell align="center">1</TableCell>
                      <TableCell align="center">2</TableCell>
                      <TableCell align="center">3</TableCell>
                      <TableCell align="center">4</TableCell>
                      <TableCell align="center">5</TableCell>
                      <TableCell align="center">6</TableCell>
                      <TableCell align="center">7</TableCell>
                      <TableCell align="center">8</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>CGPA</TableCell>
                      <TableCell align="center">7.48</TableCell>
                      <TableCell align="center">7.35</TableCell>
                      <TableCell align="center">8.17</TableCell>
                      <TableCell align="center">7.65</TableCell>
                      <TableCell align="center">-</TableCell>
                      <TableCell align="center">-</TableCell>
                      <TableCell align="center">-</TableCell>
                      <TableCell align="center">-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider sx={{ my: 3 }} />

              {/* Class XII */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">Class XII</Typography>
                    <Typography variant="body2" color="text.secondary">Mar 2021 - Jul 2022</Typography>
                    <Typography variant="body2" color="text.secondary">2022 Passed Out</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" color="primary"><EditIcon /></IconButton>
                    <IconButton size="small" color="primary"><UploadIcon /></IconButton>
                    <IconButton size="small" color="primary"><DownloadIcon /></IconButton>
                    <IconButton size="small" color="primary"><PreviewIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color="primary">9.1</Typography>
                    <Typography variant="body2" color="text.secondary">CGPA</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color="primary">91%</Typography>
                    <Typography variant="body2" color="text.secondary">Percentage</Typography>
                  </Box>
                </Box>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">College:</Typography>
                    <Typography variant="body1">DON BOSCO ACADEMY</Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Board:</Typography>
                    <Typography variant="body1">ICSE</Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Location:</Typography>
                    <Typography variant="body1">PATNA</Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Score Type:</Typography>
                    <Typography variant="body1">PERCENTAGE</Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Class X */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">Class X</Typography>
                    <Typography variant="body2" color="text.secondary">Mar 2019 - Jul 2020</Typography>
                    <Typography variant="body2" color="text.secondary">2020 Passed Out</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" color="primary"><EditIcon /></IconButton>
                    <IconButton size="small" color="primary"><UploadIcon /></IconButton>
                    <IconButton size="small" color="primary"><DownloadIcon /></IconButton>
                    <IconButton size="small" color="primary"><PreviewIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color="primary">9.52</Typography>
                    <Typography variant="body2" color="text.secondary">CGPA</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color="primary">95.2%</Typography>
                    <Typography variant="body2" color="text.secondary">Percentage</Typography>
                  </Box>
                </Box>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">School:</Typography>
                    <Typography variant="body1">St. Xavier's High School</Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Board:</Typography>
                    <Typography variant="body1">ICSE</Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Location:</Typography>
                    <Typography variant="body1">Gandhi Maidan, Patna</Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Score Type:</Typography>
                    <Typography variant="body1">PERCENTAGE</Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 2: Resumes */}
        <TabPanel value={currentTab} index={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Uploaded Resumes</Typography>
                <Button variant="contained" startIcon={<UploadIcon />}>
                  Upload New Resume
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Resume Name</TableCell>
                      <TableCell>Uploaded On</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Resume_Ayush_v3.pdf</TableCell>
                      <TableCell>25 Jan 2026</TableCell>
                      <TableCell><Chip label="Active" color="success" size="small" /></TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><PreviewIcon /></IconButton>
                        <IconButton size="small"><DownloadIcon /></IconButton>
                        <IconButton size="small"><EditIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Resume_Ayush_v2.pdf</TableCell>
                      <TableCell>10 Jan 2026</TableCell>
                      <TableCell><Chip label="Archived" size="small" /></TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><PreviewIcon /></IconButton>
                        <IconButton size="small"><DownloadIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 3: Documents */}
        <TabPanel value={currentTab} index={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Important Documents</Typography>
                <Button variant="contained" startIcon={<UploadIcon />}>
                  Upload Document
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Document Type</TableCell>
                      <TableCell>File Name</TableCell>
                      <TableCell>Uploaded On</TableCell>
                      <TableCell>Verified</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>10th Marksheet</TableCell>
                      <TableCell>10th_Marksheet.pdf</TableCell>
                      <TableCell>01 Sep 2024</TableCell>
                      <TableCell><Chip icon={<VerifiedIcon />} label="Verified" color="success" size="small" /></TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><PreviewIcon /></IconButton>
                        <IconButton size="small"><DownloadIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>12th Marksheet</TableCell>
                      <TableCell>12th_Marksheet.pdf</TableCell>
                      <TableCell>01 Sep 2024</TableCell>
                      <TableCell><Chip icon={<VerifiedIcon />} label="Verified" color="success" size="small" /></TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><PreviewIcon /></IconButton>
                        <IconButton size="small"><DownloadIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Aadhaar Card</TableCell>
                      <TableCell>Aadhaar.pdf</TableCell>
                      <TableCell>01 Sep 2024</TableCell>
                      <TableCell><Chip icon={<VerifiedIcon />} label="Verified" color="success" size="small" /></TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><PreviewIcon /></IconButton>
                        <IconButton size="small"><DownloadIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Passport</TableCell>
                      <TableCell>Passport.pdf</TableCell>
                      <TableCell>15 Sep 2024</TableCell>
                      <TableCell><Chip label="Pending" color="warning" size="small" /></TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><PreviewIcon /></IconButton>
                        <IconButton size="small"><DownloadIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 4: Tracker */}
        <TabPanel value={currentTab} index={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Placement Application Tracker
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Company</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Applied On</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Stage</TableCell>
                      <TableCell>Next Update</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Amazon</TableCell>
                      <TableCell>Software Development Engineer</TableCell>
                      <TableCell>03 Nov 2025</TableCell>
                      <TableCell><Chip label="Offered" color="success" size="small" /></TableCell>
                      <TableCell>Final - Offer Extended</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Google</TableCell>
                      <TableCell>SWE Intern</TableCell>
                      <TableCell>15 Oct 2025</TableCell>
                      <TableCell><Chip label="In Progress" color="info" size="small" /></TableCell>
                      <TableCell>Technical Round 2</TableCell>
                      <TableCell>10 Feb 2026</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Microsoft</TableCell>
                      <TableCell>Software Engineer</TableCell>
                      <TableCell>20 Sep 2025</TableCell>
                      <TableCell><Chip label="Rejected" color="error" size="small" /></TableCell>
                      <TableCell>After Technical Round 1</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 5: Offers */}
        <TabPanel value={currentTab} index={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Job Offers Received
              </Typography>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <Card variant="outlined" sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
                    <CardContent>
                      <Typography variant="h5" fontWeight="bold">Amazon</Typography>
                      <Typography variant="h6">Software Development Engineer</Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h4" fontWeight="bold">₹46.0 LPA</Typography>
                      <Typography variant="body2">Offer Date: 10 Nov 2025</Typography>
                      <Typography variant="body2">Joining: July 2027</Typography>
                      <Box sx={{ mt: 2 }}>
                        <Chip label="Intern Leads to Full Time" color="success" sx={{ mr: 1 }} />
                        <Chip label="Accepted" color="success" />
                      </Box>
                      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                        View Offer Letter
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 6: Payments */}
        <TabPanel value={currentTab} index={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Payment History
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Receipt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>15 Jan 2026</TableCell>
                      <TableCell>Placement Registration Fee</TableCell>
                      <TableCell>₹5,000</TableCell>
                      <TableCell><Chip label="Paid" color="success" size="small" /></TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><DownloadIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>20 Dec 2025</TableCell>
                      <TableCell>Mock Interview Fee</TableCell>
                      <TableCell>₹500</TableCell>
                      <TableCell><Chip label="Paid" color="success" size="small" /></TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><DownloadIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 7: Feedbacks */}
        <TabPanel value={currentTab} index={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Interview Feedbacks
              </Typography>
              {[
                { company: 'Amazon', role: 'SDE', date: '05 Nov 2025', rating: 4.5, feedback: 'Strong problem-solving skills. Good understanding of data structures.' },
                { company: 'Google', role: 'SWE Intern', date: '20 Oct 2025', rating: 4.0, feedback: 'Good coding skills. Needs improvement in system design.' },
              ].map((item, idx) => (
                <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">{item.company} - {item.role}</Typography>
                      <Typography variant="body2" color="text.secondary">{item.date}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>Rating:</Typography>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: i < item.rating ? '#ffd700' : '#ccc' }}>★</span>
                        ))}
                      </Box>
                    </Box>
                    <Typography variant="body2">{item.feedback}</Typography>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 8: Preferences */}
        <TabPanel value={currentTab} index={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Job Preferences
              </Typography>
              <Grid container spacing={3}>
                <Grid xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Preferred Role:</Typography>
                  <Typography variant="body1">Software Development Engineer</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Preferred Job Type:</Typography>
                  <Typography variant="body1">Full Time, Intern Leads to FT</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Preferred Location:</Typography>
                  <Typography variant="body1">Bangalore, Hyderabad, Pune</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Expected CTC:</Typography>
                  <Typography variant="body1">₹15-25 LPA</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Willing to Relocate:</Typography>
                  <Typography variant="body1">Yes</Typography>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Notice Period:</Typography>
                  <Typography variant="body1">Immediate (Fresher)</Typography>
                </Grid>
              </Grid>
              <Button variant="contained" sx={{ mt: 3 }} startIcon={<EditIcon />}>
                Update Preferences
              </Button>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 9: Points */}
        <TabPanel value={currentTab} index={9}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Points System
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h3" fontWeight="bold" color="primary">250</Typography>
                <Typography variant="body1" color="text.secondary">Total Points</Typography>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Overall Balance</TableCell>
                      <TableCell align="right">Applied Deduction</TableCell>
                      <TableCell align="right">Attendance Deduction</TableCell>
                      <TableCell align="right">Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Applications</TableCell>
                      <TableCell align="right">150</TableCell>
                      <TableCell align="right">-30</TableCell>
                      <TableCell align="right">-10</TableCell>
                      <TableCell align="right">15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Attendance</TableCell>
                      <TableCell align="right">80</TableCell>
                      <TableCell align="right">0</TableCell>
                      <TableCell align="right">-20</TableCell>
                      <TableCell align="right">12</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Opportunities</TableCell>
                      <TableCell align="right">20</TableCell>
                      <TableCell align="right">0</TableCell>
                      <TableCell align="right">0</TableCell>
                      <TableCell align="right">2</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Points History
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Points</TableCell>
                      <TableCell align="right">Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>25 Jan 2026</TableCell>
                      <TableCell>Applied to Amazon</TableCell>
                      <TableCell align="right">-10</TableCell>
                      <TableCell align="right">250</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>20 Jan 2026</TableCell>
                      <TableCell>Attended Workshop</TableCell>
                      <TableCell align="right">+20</TableCell>
                      <TableCell align="right">260</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>15 Jan 2026</TableCell>
                      <TableCell>Missed T&P Session</TableCell>
                      <TableCell align="right">-15</TableCell>
                      <TableCell align="right">240</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 10: Work Experience */}
        <TabPanel value={currentTab} index={10}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Work Experience</Typography>
                <Button variant="contained" startIcon={<EditIcon />}>Add Experience</Button>
              </Box>
              
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">Software Engineering Intern</Typography>
                  <Typography variant="body1" color="primary">Tech Startup Inc.</Typography>
                  <Typography variant="body2" color="text.secondary">Jun 2025 - Aug 2025 · 3 months</Typography>
                  <Typography variant="body2" color="text.secondary">Bangalore, Karnataka</Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    • Developed RESTful APIs using Node.js and Express<br />
                    • Implemented authentication and authorization using JWT<br />
                    • Collaborated with frontend team to integrate APIs
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip label="Node.js" size="small" sx={{ mr: 1 }} />
                    <Chip label="React" size="small" sx={{ mr: 1 }} />
                    <Chip label="MongoDB" size="small" />
                  </Box>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 11: Skills, Languages */}
        <TabPanel value={currentTab} index={11}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">Technical Skills</Typography>
                    <Button size="small" startIcon={<EditIcon />}>Edit</Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL', 'MongoDB', 'Git', 'Docker', 'AWS'].map(skill => (
                      <Chip key={skill} label={skill} color="primary" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">Languages</Typography>
                    <Button size="small" startIcon={<EditIcon />}>Edit</Button>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid xs={12}>
                      <Typography variant="body2" color="text.secondary">English</Typography>
                      <LinearProgress variant="determinate" value={95} sx={{ height: 8, borderRadius: 4 }} />
                      <Typography variant="caption">Professional Proficiency</Typography>
                    </Grid>
                    <Grid xs={12}>
                      <Typography variant="body2" color="text.secondary">Hindi</Typography>
                      <LinearProgress variant="determinate" value={100} sx={{ height: 8, borderRadius: 4 }} />
                      <Typography variant="caption">Native</Typography>
                    </Grid>
                    <Grid xs={12}>
                      <Typography variant="body2" color="text.secondary">Spanish</Typography>
                      <LinearProgress variant="determinate" value={60} sx={{ height: 8, borderRadius: 4 }} />
                      <Typography variant="caption">Intermediate</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 12: Projects */}
        <TabPanel value={currentTab} index={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Projects</Typography>
                <Button variant="contained" startIcon={<EditIcon />}>Add Project</Button>
              </Box>
              
              {[
                {
                  title: 'E-Commerce Platform',
                  duration: 'Jan 2025 - Mar 2025',
                  description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented payment gateway integration, cart management, and order tracking.',
                  tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                  link: 'github.com/ayush/ecommerce'
                },
                {
                  title: 'AI Chatbot',
                  duration: 'Sep 2024 - Dec 2024',
                  description: 'Developed an AI-powered chatbot using Python and TensorFlow. Implemented natural language processing for intent recognition.',
                  tech: ['Python', 'TensorFlow', 'NLP', 'Flask'],
                  link: 'github.com/ayush/chatbot'
                }
              ].map((project, idx) => (
                <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{project.title}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>{project.duration}</Typography>
                    <Typography variant="body2" sx={{ my: 2 }}>{project.description}</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {project.tech.map(tech => (
                        <Chip key={tech} label={tech} size="small" />
                      ))}
                    </Box>
                    <Typography variant="body2" color="primary">🔗 {project.link}</Typography>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 13: Awards */}
        <TabPanel value={currentTab} index={13}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Awards & Achievements</Typography>
                <Button variant="contained" startIcon={<EditIcon />}>Add Award</Button>
              </Box>
              
              {[
                { title: 'Best Student Award', issuer: 'IIIT Bhagalpur', date: 'Dec 2025', description: 'Awarded for academic excellence and leadership' },
                { title: 'Hackathon Winner', issuer: 'TechFest 2025', date: 'Oct 2025', description: 'First place in national level hackathon' },
                { title: 'Merit Scholarship', issuer: 'Government of Bihar', date: 'Aug 2024', description: 'Scholarship for top 5% students' }
              ].map((award, idx) => (
                <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>🏆 {award.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{award.date}</Typography>
                    </Box>
                    <Typography variant="body1" color="primary" gutterBottom>{award.issuer}</Typography>
                    <Typography variant="body2">{award.description}</Typography>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 14: Certification */}
        <TabPanel value={currentTab} index={14}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Certifications</Typography>
                <Button variant="contained" startIcon={<EditIcon />}>Add Certification</Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Certification</TableCell>
                      <TableCell>Issuing Organization</TableCell>
                      <TableCell>Issue Date</TableCell>
                      <TableCell>Credential ID</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>AWS Certified Solutions Architect</TableCell>
                      <TableCell>Amazon Web Services</TableCell>
                      <TableCell>Jan 2026</TableCell>
                      <TableCell>AWS-SA-123456</TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><PreviewIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Full Stack Web Development</TableCell>
                      <TableCell>Coursera</TableCell>
                      <TableCell>Nov 2025</TableCell>
                      <TableCell>COURSERA-FS-789012</TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><PreviewIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 15: Competitions */}
        <TabPanel value={currentTab} index={15}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Competitions</Typography>
                <Button variant="contained" startIcon={<EditIcon />}>Add Competition</Button>
              </Box>
              
              {[
                { name: 'Google Code Jam 2025', rank: 'Round 2 Qualifier', date: 'Apr 2025', description: 'Qualified for Round 2 among 10,000+ participants' },
                { name: 'ACM ICPC Regionals', rank: '15th Place', date: 'Dec 2024', description: 'Team competition - solved 6/10 problems' }
              ].map((comp, idx) => (
                <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" fontWeight="bold">{comp.name}</Typography>
                      <Chip label={comp.rank} color="primary" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>{comp.date}</Typography>
                    <Typography variant="body2">{comp.description}</Typography>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 16: Conferences & Workshops */}
        <TabPanel value={currentTab} index={16}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Conferences & Workshops</Typography>
                <Button variant="contained" startIcon={<EditIcon />}>Add Entry</Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Event</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Cloud Computing Workshop</TableCell>
                      <TableCell>Workshop</TableCell>
                      <TableCell>15 Jan 2026</TableCell>
                      <TableCell>Participant</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>AI/ML Conference 2025</TableCell>
                      <TableCell>Conference</TableCell>
                      <TableCell>20 Nov 2025</TableCell>
                      <TableCell>Attendee</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 17: Test Scores */}
        <TabPanel value={currentTab} index={17}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Test Scores</Typography>
                <Button variant="contained" startIcon={<EditIcon />}>Add Test Score</Button>
              </Box>
              
              <Grid container spacing={3}>
                <Grid xs={12} sm={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">GRE</Typography>
                      <Typography variant="h4" fontWeight="bold" color="primary">325</Typography>
                      <Typography variant="body2" color="text.secondary">Verbal: 160 | Quant: 165</Typography>
                      <Typography variant="body2" color="text.secondary">Test Date: Dec 2025</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">TOEFL</Typography>
                      <Typography variant="h4" fontWeight="bold" color="primary">110</Typography>
                      <Typography variant="body2" color="text.secondary">Reading: 28 | Listening: 27 | Speaking: 27 | Writing: 28</Typography>
                      <Typography variant="body2" color="text.secondary">Test Date: Nov 2025</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tabs 18-25: Placeholder sections */}
        {[
          { index: 18, title: 'Patents', content: 'No patents filed yet.' },
          { index: 19, title: 'Publications', content: 'No publications yet.' },
          { index: 20, title: 'Scholarships', content: 'No scholarships received.' },
          { index: 21, title: 'Volunteering', content: 'NSS Volunteer - Participated in community service activities.' },
          { index: 22, title: 'Extra Curricular Activities', content: 'Member of Coding Club, Sports Team Captain' },
          { index: 23, title: 'Write Ups', content: 'Technical blog posts and articles.' },
          { index: 24, title: 'Career Breaks', content: 'No career breaks.' },
        ].map(tab => (
          <TabPanel key={tab.index} value={currentTab} index={tab.index}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>{tab.title}</Typography>
                <Typography variant="body1" color="text.secondary">{tab.content}</Typography>
                <Button variant="contained" sx={{ mt: 2 }} startIcon={<EditIcon />}>
                  Add {tab.title}
                </Button>
              </CardContent>
            </Card>
          </TabPanel>
        ))}

        {/* Tab 25: Social Media */}
        <TabPanel value={currentTab} index={25}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Social Media Links</Typography>
                <Button variant="contained" startIcon={<EditIcon />}>Edit Links</Button>
              </Box>
              
              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LinkedInIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">LinkedIn</Typography>
                      <Typography variant="body1">linkedin.com/in/ayush-tiwari</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <GitHubIcon />
                    <Box>
                      <Typography variant="body2" color="text.secondary">GitHub</Typography>
                      <Typography variant="body1">github.com/ayushtiwari</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TwitterIcon color="info" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Twitter</Typography>
                      <Typography variant="body1">@ayush_codes</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <InstagramIcon sx={{ color: '#E1306C' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Instagram</Typography>
                      <Typography variant="body1">@ayush.tiwari</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit {currentEditSection}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Field Name"
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setEditDialogOpen(false)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentProfile;
