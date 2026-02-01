import { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, Search, MoreVertical, Paperclip, Smile, Users, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Textarea } from '@/app/components/ui/textarea';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Chat {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

interface MessagingChatProps {
  userRole: 'student' | 'coordinator' | 'admin';
  currentUserId: string;
  currentUserName: string;
}

export default function MessagingChat({ userRole, currentUserId, currentUserName }: MessagingChatProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load chats from localStorage
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    } else {
      // Sample data
      const sampleChats: Chat[] = [
        {
          id: '1',
          userId: 'coord1',
          userName: 'Priya Sharma',
          userRole: 'Placement Coordinator',
          lastMessage: 'Your resume has been approved for TCS drive',
          lastMessageTime: '2026-02-01T10:30:00',
          unreadCount: 2,
          online: true
        },
        {
          id: '2',
          userId: 'admin1',
          userName: 'Dr. Rajesh Kumar',
          userRole: 'TnP Admin',
          lastMessage: 'Please update your profile information',
          lastMessageTime: '2026-02-01T09:15:00',
          unreadCount: 0,
          online: false
        },
        {
          id: '3',
          userId: 'student1',
          userName: 'Rahul Verma',
          userRole: 'CS Student',
          lastMessage: 'Thanks for the guidance!',
          lastMessageTime: '2026-01-31T16:20:00',
          unreadCount: 0,
          online: true
        }
      ];
      setChats(sampleChats);
      localStorage.setItem('chats', JSON.stringify(sampleChats));
    }
  }, []);

  useEffect(() => {
    if (selectedChat) {
      // Load messages for selected chat
      const savedMessages = localStorage.getItem(`messages_${selectedChat.id}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        // Sample messages
        const sampleMessages: Message[] = [
          {
            id: '1',
            senderId: selectedChat.userId,
            senderName: selectedChat.userName,
            content: 'Hi! I wanted to discuss about the upcoming placement drive.',
            timestamp: '2026-02-01T09:00:00',
            read: true
          },
          {
            id: '2',
            senderId: currentUserId,
            senderName: currentUserName,
            content: 'Sure! What would you like to know?',
            timestamp: '2026-02-01T09:05:00',
            read: true
          },
          {
            id: '3',
            senderId: selectedChat.userId,
            senderName: selectedChat.userName,
            content: selectedChat.lastMessage,
            timestamp: selectedChat.lastMessageTime,
            read: false
          }
        ];
        setMessages(sampleMessages);
        localStorage.setItem(`messages_${selectedChat.id}`, JSON.stringify(sampleMessages));
      }
      
      // Mark messages as read
      markAsRead(selectedChat.id);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const markAsRead = (chatId: string) => {
    const updatedChats = chats.map(chat =>
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    );
    setChats(updatedChats);
    localStorage.setItem('chats', JSON.stringify(updatedChats));
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserName,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem(`messages_${selectedChat.id}`, JSON.stringify(updatedMessages));

    // Update chat's last message
    const updatedChats = chats.map(chat =>
      chat.id === selectedChat.id
        ? { ...chat, lastMessage: newMessage, lastMessageTime: message.timestamp }
        : chat
    );
    setChats(updatedChats);
    localStorage.setItem('chats', JSON.stringify(updatedChats));

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.userRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  return (
    <div className="p-4 md:p-6 h-[calc(100vh-100px)]">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <MessageCircle className="h-7 w-7" />
          Messages
          {totalUnread > 0 && (
            <Badge variant="destructive" className="ml-2">{totalUnread}</Badge>
          )}
        </h1>
        <p className="text-muted-foreground mt-1">Connect with students, coordinators, and admins</p>
      </div>

      <div className="grid grid-cols-12 gap-4 h-[calc(100%-80px)]">
        {/* Chat List */}
        <Card className="col-span-12 md:col-span-4 overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="space-y-1">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 cursor-pointer hover:bg-accent transition-colors border-b ${
                    selectedChat?.id === chat.id ? 'bg-accent' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{chat.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm truncate">{chat.userName}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{chat.userRole}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate flex-1">{chat.lastMessage}</p>
                        {chat.unreadCount > 0 && (
                          <Badge variant="default" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredChats.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No conversations found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="col-span-12 md:col-span-8 overflow-hidden flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{selectedChat.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {selectedChat.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedChat.userName}</h3>
                      <p className="text-sm text-muted-foreground">{selectedChat.userRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                {messages.map((message) => {
                  const isOwn = message.senderId === currentUserId;
                  return (
                    <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            isOwn
                              ? 'bg-primary text-primary-foreground rounded-tr-none'
                              : 'bg-card border rounded-tl-none'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 px-2">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 min-h-[44px] max-h-32 resize-none"
                    rows={1}
                  />
                  <Button onClick={sendMessage} size="icon" disabled={!newMessage.trim()}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm">Choose a chat from the list to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
