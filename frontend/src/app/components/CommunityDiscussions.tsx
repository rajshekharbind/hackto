import { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, Search, Plus, Filter, TrendingUp, Users, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  likes: number;
  replies: number;
  views: number;
  createdAt: string;
  lastActivity: string;
  isPinned: boolean;
  isSolved: boolean;
}

interface Reply {
  id: string;
  discussionId: string;
  content: string;
  author: string;
  authorRole: string;
  likes: number;
  createdAt: string;
}

interface CommunityDiscussionsProps {
  userRole: 'student' | 'coordinator' | 'admin';
  userName: string;
}

export default function CommunityDiscussions({ userRole, userName }: CommunityDiscussionsProps) {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newReply, setNewReply] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: ''
  });

  const categories = ['General', 'Interview Tips', 'Resume Help', 'Company Reviews', 'Technical', 'HR', 'Career Advice', 'Opportunities'];

  useEffect(() => {
    const saved = localStorage.getItem('discussions');
    const savedReplies = localStorage.getItem('discussionReplies');
    
    if (saved) {
      setDiscussions(JSON.parse(saved));
    } else {
      const sampleDiscussions: Discussion[] = [
        {
          id: '1',
          title: 'Tips for Technical Interview at Google?',
          content: 'I have a technical interview scheduled with Google next week. Can anyone share their experience and preparation tips?',
          author: 'Rahul Verma',
          authorRole: 'CS Student',
          category: 'Interview Tips',
          tags: ['Google', 'Technical Interview', 'Preparation'],
          likes: 24,
          replies: 8,
          views: 156,
          createdAt: '2026-01-30T10:00:00',
          lastActivity: '2026-02-01T09:30:00',
          isPinned: true,
          isSolved: false
        },
        {
          id: '2',
          title: 'How to improve resume for product-based companies?',
          content: 'My resume gets rejected at the initial screening stage. What should I include to make it stand out for companies like Microsoft and Amazon?',
          author: 'Ananya Singh',
          authorRole: 'IT Student',
          category: 'Resume Help',
          tags: ['Resume', 'Product Companies', 'Career'],
          likes: 18,
          replies: 12,
          views: 203,
          createdAt: '2026-01-29T14:20:00',
          lastActivity: '2026-02-01T08:15:00',
          isPinned: false,
          isSolved: true
        },
        {
          id: '3',
          title: 'TCS Interview Experience - Jan 2026',
          content: 'Just completed my TCS interview. Here\'s what happened in each round...',
          author: 'Priya Sharma',
          authorRole: 'Coordinator',
          category: 'Company Reviews',
          tags: ['TCS', 'Interview Experience', 'Service Company'],
          likes: 45,
          replies: 15,
          views: 389,
          createdAt: '2026-01-28T16:45:00',
          lastActivity: '2026-01-31T20:10:00',
          isPinned: false,
          isSolved: false
        },
        {
          id: '4',
          title: 'Best resources for Data Structures preparation?',
          content: 'What are the best books, courses, and practice platforms for mastering DSA?',
          author: 'Vikram Mehta',
          authorRole: 'EC Student',
          category: 'Technical',
          tags: ['DSA', 'Resources', 'Learning'],
          likes: 32,
          replies: 20,
          views: 445,
          createdAt: '2026-01-27T11:30:00',
          lastActivity: '2026-01-31T15:00:00',
          isPinned: true,
          isSolved: true
        }
      ];
      setDiscussions(sampleDiscussions);
      localStorage.setItem('discussions', JSON.stringify(sampleDiscussions));
    }

    if (savedReplies) {
      setReplies(JSON.parse(savedReplies));
    } else {
      const sampleReplies: Reply[] = [
        {
          id: '1',
          discussionId: '1',
          content: 'Focus on DSA, system design basics, and behavioral questions. Practice on LeetCode and mock interviews.',
          author: 'Dr. Rajesh Kumar',
          authorRole: 'TnP Admin',
          likes: 12,
          createdAt: '2026-01-30T11:00:00'
        },
        {
          id: '2',
          discussionId: '1',
          content: 'Google focuses heavily on problem-solving. Make sure you can explain your thought process clearly.',
          author: 'Alumni Mentor',
          authorRole: 'Ex-Googler',
          likes: 18,
          createdAt: '2026-01-30T14:30:00'
        }
      ];
      setReplies(sampleReplies);
      localStorage.setItem('discussionReplies', JSON.stringify(sampleReplies));
    }
  }, []);

  const saveDiscussions = (updated: Discussion[]) => {
    setDiscussions(updated);
    localStorage.setItem('discussions', JSON.stringify(updated));
  };

  const saveReplies = (updated: Reply[]) => {
    setReplies(updated);
    localStorage.setItem('discussionReplies', JSON.stringify(updated));
  };

  const createDiscussion = () => {
    const newDiscussion: Discussion = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      author: userName,
      authorRole: userRole === 'admin' ? 'TnP Admin' : userRole === 'coordinator' ? 'Coordinator' : 'Student',
      category: formData.category,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      likes: 0,
      replies: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      isPinned: false,
      isSolved: false
    };
    saveDiscussions([newDiscussion, ...discussions]);
    setFormData({ title: '', content: '', category: 'general', tags: '' });
    setIsCreateDialogOpen(false);
  };

  const addReply = () => {
    if (!newReply.trim() || !selectedDiscussion) return;

    const reply: Reply = {
      id: Date.now().toString(),
      discussionId: selectedDiscussion.id,
      content: newReply,
      author: userName,
      authorRole: userRole === 'admin' ? 'TnP Admin' : userRole === 'coordinator' ? 'Coordinator' : 'Student',
      likes: 0,
      createdAt: new Date().toISOString()
    };

    saveReplies([...replies, reply]);

    // Update discussion
    const updated = discussions.map(d =>
      d.id === selectedDiscussion.id
        ? { ...d, replies: d.replies + 1, lastActivity: new Date().toISOString() }
        : d
    );
    saveDiscussions(updated);
    setNewReply('');
  };

  const likeDiscussion = (id: string) => {
    const updated = discussions.map(d =>
      d.id === id ? { ...d, likes: d.likes + 1 } : d
    );
    saveDiscussions(updated);
  };

  const likeReply = (id: string) => {
    const updated = replies.map(r =>
      r.id === id ? { ...r, likes: r.likes + 1 } : r
    );
    saveReplies(updated);
  };

  const viewDiscussion = (discussion: Discussion) => {
    const updated = discussions.map(d =>
      d.id === discussion.id ? { ...d, views: d.views + 1 } : d
    );
    saveDiscussions(updated);
    setSelectedDiscussion(discussion);
  };

  const filteredDiscussions = discussions.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || d.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const discussionReplies = replies.filter(r => r.discussionId === selectedDiscussion?.id);

  const stats = {
    total: discussions.length,
    solved: discussions.filter(d => d.isSolved).length,
    trending: discussions.filter(d => d.views > 200).length,
    active: discussions.filter(d => {
      const lastActivity = new Date(d.lastActivity);
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return lastActivity > oneDayAgo;
    }).length
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Users className="h-7 w-7" />
          Community Discussions
        </h1>
        <p className="text-muted-foreground mt-1">Share knowledge, ask questions, and help each other</p>
      </div>

      <Tabs defaultValue="discussions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="stats">Stats & Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Total Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  {stats.total}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Solved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold flex items-center gap-2 text-green-600">
                  {stats.solved}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Trending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold flex items-center gap-2 text-orange-600">
                  <TrendingUp className="h-5 w-5" />
                  {stats.trending}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Active Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold flex items-center gap-2 text-purple-600">
                  {stats.active}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="flex-1 flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search discussions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Discussion
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Discussion</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Title *</Label>
                        <Input
                          placeholder="What's your question or topic?"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Content *</Label>
                        <Textarea
                          placeholder="Provide details about your question or topic..."
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          rows={6}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Tags (comma-separated)</Label>
                        <Input
                          placeholder="e.g., Google, Interview, Technical"
                          value={formData.tags}
                          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        />
                      </div>
                      <Button onClick={createDiscussion} className="w-full" disabled={!formData.title || !formData.content}>
                        Create Discussion
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDiscussions.map((discussion) => (
                  <Card
                    key={discussion.id}
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      discussion.isPinned ? 'border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => viewDiscussion(discussion)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-2 min-w-[60px]">
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); likeDiscussion(discussion.id); }}>
                            <ThumbsUp className={`h-4 w-4 ${discussion.likes > 0 ? 'fill-current text-blue-600' : ''}`} />
                          </Button>
                          <span className="font-bold">{discussion.likes}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{discussion.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{discussion.content}</p>
                            </div>
                            {discussion.isSolved && (
                              <Badge className="bg-green-600 flex-shrink-0">Solved</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge variant="outline">{discussion.category}</Badge>
                            {discussion.tags.map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Avatar className="h-5 w-5">
                                  <AvatarFallback className="text-xs">{discussion.author[0]}</AvatarFallback>
                                </Avatar>
                                {discussion.author}
                              </span>
                              <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                {discussion.replies}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {discussion.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredDiscussions.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No discussions found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map(cat => {
                    const count = discussions.filter(d => d.category === cat).length;
                    return (
                      <div key={cat} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span>{cat}</span>
                        <Badge>{count}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(
                    discussions.reduce((acc, d) => {
                      acc[d.author] = (acc[d.author] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  )
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([author, count]) => (
                      <div key={author} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{author[0]}</AvatarFallback>
                          </Avatar>
                          <span>{author}</span>
                        </div>
                        <Badge>{count} posts</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Discussion Detail Dialog */}
      <Dialog open={!!selectedDiscussion} onOpenChange={() => setSelectedDiscussion(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedDiscussion && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedDiscussion.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{selectedDiscussion.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedDiscussion.author}</p>
                    <p className="text-sm text-muted-foreground">{selectedDiscussion.authorRole}</p>
                  </div>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {new Date(selectedDiscussion.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedDiscussion.content}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDiscussion.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-4">{discussionReplies.length} Replies</h4>
                  <div className="space-y-4 mb-4">
                    {discussionReplies.map((reply) => (
                      <div key={reply.id} className="bg-muted p-4 rounded-lg">
                        <div className="flex items-start gap-3 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{reply.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{reply.author}</p>
                                <p className="text-xs text-muted-foreground">{reply.authorRole}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(reply.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="mt-2 whitespace-pre-wrap">{reply.content}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2"
                              onClick={() => likeReply(reply.id)}
                            >
                              <ThumbsUp className={`h-4 w-4 mr-1 ${reply.likes > 0 ? 'fill-current' : ''}`} />
                              {reply.likes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label>Add a reply</Label>
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      rows={3}
                    />
                    <Button onClick={addReply} disabled={!newReply.trim()}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Post Reply
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
