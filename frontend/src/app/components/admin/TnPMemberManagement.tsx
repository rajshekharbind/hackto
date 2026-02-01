import { useState, useEffect } from 'react';
import { Users, UserPlus, Search, Mail, Phone, Shield, Edit2, Trash2, CheckCircle, XCircle, Download, Filter, Calendar, Activity, Award, BarChart3, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface TnPMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'coordinator' | 'member';
  department: string;
  responsibilities: string[];
  status: 'active' | 'inactive';
  joinedDate: string;
  lastActive: string;
  activitiesCompleted: number;
  companiesManaged: number;
  studentsHelped: number;
  performanceRating: number;
}

interface Activity {
  id: string;
  memberId: string;
  memberName: string;
  action: string;
  timestamp: string;
  type: 'drive' | 'student' | 'company' | 'system';
}

export default function TnPMemberManagement() {
  const [members, setMembers] = useState<TnPMember[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'coordinator' | 'member'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TnPMember | null>(null);
  const [selectedTab, setSelectedTab] = useState('members');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'member' as 'admin' | 'coordinator' | 'member',
    department: '',
    responsibilities: '',
    status: 'active' as 'active' | 'inactive'
  });

  useEffect(() => {
    const saved = localStorage.getItem('tnpMembers');
    const savedActivities = localStorage.getItem('tnpActivities');
    
    if (saved) {
      setMembers(JSON.parse(saved));
    } else {
      const sampleMembers: TnPMember[] = [
        {
          id: '1',
          name: 'Dr. Rajesh Kumar',
          email: 'rajesh.kumar@college.edu',
          phone: '+91 98765 43210',
          role: 'admin',
          department: 'Computer Science',
          responsibilities: ['Strategic Planning', 'Company Relations', 'Final Approvals', 'Budget Management'],
          status: 'active',
          joinedDate: '2024-01-15',
          lastActive: '2026-02-01',
          activitiesCompleted: 145,
          companiesManaged: 25,
          studentsHelped: 320,
          performanceRating: 4.8
        },
        {
          id: '2',
          name: 'Priya Sharma',
          email: 'priya.sharma@college.edu',
          phone: '+91 98765 43211',
          role: 'coordinator',
          department: 'Training & Placement',
          responsibilities: ['Drive Scheduling', 'Student Communication', 'Resume Verification', 'Mock Interviews'],
          status: 'active',
          joinedDate: '2024-03-20',
          lastActive: '2026-02-01',
          activitiesCompleted: 198,
          companiesManaged: 15,
          studentsHelped: 280,
          performanceRating: 4.9
        },
        {
          id: '3',
          name: 'Amit Patel',
          email: 'amit.patel@college.edu',
          phone: '+91 98765 43212',
          role: 'coordinator',
          department: 'Electronics',
          responsibilities: ['Technical Training', 'Workshop Organization', 'Alumni Relations'],
          status: 'active',
          joinedDate: '2024-06-10',
          lastActive: '2026-01-31',
          activitiesCompleted: 112,
          companiesManaged: 10,
          studentsHelped: 150,
          performanceRating: 4.6
        },
        {
          id: '4',
          name: 'Sneha Reddy',
          email: 'sneha.reddy@college.edu',
          phone: '+91 98765 43213',
          role: 'member',
          department: 'IT',
          responsibilities: ['Documentation', 'Social Media Updates', 'Event Coordination'],
          status: 'active',
          joinedDate: '2024-09-01',
          lastActive: '2026-01-30',
          activitiesCompleted: 75,
          companiesManaged: 5,
          studentsHelped: 95,
          performanceRating: 4.4
        },
        {
          id: '5',
          name: 'Dr. Vikram Singh',
          email: 'vikram.singh@college.edu',
          phone: '+91 98765 43214',
          role: 'member',
          department: 'Mechanical',
          responsibilities: ['Industry Connect', 'Project Guidance'],
          status: 'inactive',
          joinedDate: '2023-12-05',
          lastActive: '2025-12-15',
          activitiesCompleted: 48,
          companiesManaged: 3,
          studentsHelped: 60,
          performanceRating: 4.2
        }
      ];
      setMembers(sampleMembers);
      localStorage.setItem('tnpMembers', JSON.stringify(sampleMembers));
    }

    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
      const sampleActivities: Activity[] = [
        {
          id: '1',
          memberId: '2',
          memberName: 'Priya Sharma',
          action: 'Scheduled campus drive for TCS',
          timestamp: '2026-02-01T10:30:00',
          type: 'drive'
        },
        {
          id: '2',
          memberId: '1',
          memberName: 'Dr. Rajesh Kumar',
          action: 'Approved partnership with Microsoft',
          timestamp: '2026-02-01T09:15:00',
          type: 'company'
        },
        {
          id: '3',
          memberId: '3',
          memberName: 'Amit Patel',
          action: 'Conducted technical workshop for 45 students',
          timestamp: '2026-01-31T15:00:00',
          type: 'student'
        },
        {
          id: '4',
          memberId: '2',
          memberName: 'Priya Sharma',
          action: 'Verified 28 student resumes',
          timestamp: '2026-01-31T14:20:00',
          type: 'student'
        },
        {
          id: '5',
          memberId: '4',
          memberName: 'Sneha Reddy',
          action: 'Updated placement statistics on website',
          timestamp: '2026-01-31T11:45:00',
          type: 'system'
        }
      ];
      setActivities(sampleActivities);
      localStorage.setItem('tnpActivities', JSON.stringify(sampleActivities));
    }
  }, []);

  const saveMembers = (updatedMembers: TnPMember[]) => {
    setMembers(updatedMembers);
    localStorage.setItem('tnpMembers', JSON.stringify(updatedMembers));
  };

  const saveActivities = (updatedActivities: Activity[]) => {
    setActivities(updatedActivities);
    localStorage.setItem('tnpActivities', JSON.stringify(updatedActivities));
  };

  const handleAddMember = () => {
    const newMember: TnPMember = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      department: formData.department,
      responsibilities: formData.responsibilities.split(',').map(r => r.trim()).filter(r => r),
      status: formData.status,
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      activitiesCompleted: 0,
      companiesManaged: 0,
      studentsHelped: 0,
      performanceRating: 0
    };
    saveMembers([...members, newMember]);
    
    // Log activity
    const newActivity: Activity = {
      id: Date.now().toString(),
      memberId: newMember.id,
      memberName: newMember.name,
      action: `New ${newMember.role} joined the TnP team`,
      timestamp: new Date().toISOString(),
      type: 'system'
    };
    saveActivities([newActivity, ...activities]);
    
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditMember = () => {
    if (!editingMember) return;
    const updatedMembers = members.map(m => 
      m.id === editingMember.id 
        ? {
            ...m,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            department: formData.department,
            responsibilities: formData.responsibilities.split(',').map(r => r.trim()).filter(r => r),
            status: formData.status
          }
        : m
    );
    saveMembers(updatedMembers);
    resetForm();
    setEditingMember(null);
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      saveMembers(members.filter(m => m.id !== id));
      
      // Log activity
      const newActivity: Activity = {
        id: Date.now().toString(),
        memberId: id,
        memberName: name,
        action: `${name} removed from TnP team`,
        timestamp: new Date().toISOString(),
        type: 'system'
      };
      saveActivities([newActivity, ...activities]);
    }
  };

  const openEditDialog = (member: TnPMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      department: member.department,
      responsibilities: member.responsibilities.join(', '),
      status: member.status
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'member',
      department: '',
      responsibilities: '',
      status: 'active'
    });
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Role', 'Department', 'Status', 'Joined Date', 'Activities', 'Companies', 'Students Helped', 'Rating'];
    const rows = filteredMembers.map(m => [
      m.name,
      m.email,
      m.phone,
      m.role,
      m.department,
      m.status,
      m.joinedDate,
      m.activitiesCompleted,
      m.companiesManaged,
      m.studentsHelped,
      m.performanceRating
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tnp_members_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    inactive: members.filter(m => m.status === 'inactive').length,
    admins: members.filter(m => m.role === 'admin').length,
    coordinators: members.filter(m => m.role === 'coordinator').length,
    totalActivities: members.reduce((sum, m) => sum + m.activitiesCompleted, 0),
    totalStudentsHelped: members.reduce((sum, m) => sum + m.studentsHelped, 0),
    avgRating: members.length > 0 ? (members.reduce((sum, m) => sum + m.performanceRating, 0) / members.length).toFixed(1) : '0'
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Total Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  {stats.total}
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  {stats.active}
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Avg Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold flex items-center gap-2 text-yellow-600">
                  <Award className="h-5 w-5" />
                  {stats.avgRating}
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Students Helped</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold flex items-center gap-2 text-purple-600">
                  <TrendingUp className="h-5 w-5" />
                  {stats.totalStudentsHelped}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  TnP Team Members
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={exportToCSV} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={resetForm} size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New TnP Member</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Dr. John Doe" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@college.edu" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone *</Label>
                            <Input id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+91 98765 43210" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department">Department *</Label>
                            <Input id="department" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} placeholder="Computer Science" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="role">Role *</Label>
                            <Select value={formData.role} onValueChange={(value: any) => setFormData({...formData, role: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="member">Member</SelectItem>
                                <SelectItem value="coordinator">Coordinator</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="status">Status *</Label>
                            <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="responsibilities">Responsibilities (comma-separated)</Label>
                          <Input id="responsibilities" value={formData.responsibilities} onChange={(e) => setFormData({...formData, responsibilities: e.target.value})} placeholder="Drive Scheduling, Student Communication" />
                        </div>
                        <Button onClick={handleAddMember} className="w-full">Add Member</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search members..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                </div>
                <div className="flex gap-2">
                  <Select value={filterRole} onValueChange={(value: any) => setFilterRole(value)}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="coordinator">Coordinator</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {filteredMembers.map((member) => (
                  <Card key={member.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                    <CardContent className="pt-4 md:pt-6">
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="space-y-3 flex-1 w-full">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base md:text-lg font-semibold">{member.name}</h3>
                            <Badge variant={member.role === 'admin' ? 'destructive' : member.role === 'coordinator' ? 'default' : 'secondary'}>
                              {member.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                              {member.role.toUpperCase()}
                            </Badge>
                            {member.status === 'active' ? (
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                <CheckCircle className="h-3 w-3 mr-1" />Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-gray-600">
                                <XCircle className="h-3 w-3 mr-1" />Inactive
                              </Badge>
                            )}
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium">{member.performanceRating.toFixed(1)}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{member.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-4 w-4 flex-shrink-0" />
                              {member.phone}
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Department:</span> {member.department}
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="bg-blue-50 p-2 rounded">
                              <div className="text-xs text-blue-600">Activities</div>
                              <div className="font-bold">{member.activitiesCompleted}</div>
                            </div>
                            <div className="bg-green-50 p-2 rounded">
                              <div className="text-xs text-green-600">Companies</div>
                              <div className="font-bold">{member.companiesManaged}</div>
                            </div>
                            <div className="bg-purple-50 p-2 rounded">
                              <div className="text-xs text-purple-600">Students</div>
                              <div className="font-bold">{member.studentsHelped}</div>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Responsibilities:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {member.responsibilities.map((resp, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">{resp}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Joined: {new Date(member.joinedDate).toLocaleDateString()}</span>
                            <span>Last Active: {new Date(member.lastActive).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => openEditDialog(member)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Edit Member</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Name *</Label>
                                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Email *</Label>
                                    <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Phone *</Label>
                                    <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Department *</Label>
                                    <Input value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Role *</Label>
                                    <Select value={formData.role} onValueChange={(value: any) => setFormData({...formData, role: value})}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="member">Member</SelectItem>
                                        <SelectItem value="coordinator">Coordinator</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Status *</Label>
                                    <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Responsibilities</Label>
                                  <Input value={formData.responsibilities} onChange={(e) => setFormData({...formData, responsibilities: e.target.value})} />
                                </div>
                                <Button onClick={handleEditMember} className="w-full">Update Member</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteMember(member.id, member.name)} className="text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredMembers.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No members found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Activities Completed</span>
                    <span className="font-bold">{stats.totalActivities}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Students Helped</span>
                    <span className="font-bold">{stats.totalStudentsHelped}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Average Team Rating</span>
                    <span className="font-bold flex items-center gap-1">
                      <Award className="h-4 w-4 text-yellow-500" />
                      {stats.avgRating}/5.0
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {members
                    .sort((a, b) => b.performanceRating - a.performanceRating)
                    .slice(0, 5)
                    .map((member, index) => (
                      <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Badge variant={index === 0 ? 'default' : 'outline'}>{index + 1}</Badge>
                          <span className="text-sm font-medium">{member.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-bold">{member.performanceRating.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Role Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <div className="text-2xl font-bold">{stats.admins}</div>
                  <div className="text-sm text-muted-foreground">Admins</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{stats.coordinators}</div>
                  <div className="text-sm text-muted-foreground">Coordinators</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">{stats.total - stats.admins - stats.coordinators}</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.slice(0, 10).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'drive' ? 'bg-blue-100' :
                      activity.type === 'company' ? 'bg-green-100' :
                      activity.type === 'student' ? 'bg-purple-100' :
                      'bg-gray-100'
                    }`}>
                      <Calendar className={`h-4 w-4 ${
                        activity.type === 'drive' ? 'text-blue-600' :
                        activity.type === 'company' ? 'text-green-600' :
                        activity.type === 'student' ? 'text-purple-600' :
                        'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.memberName}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
