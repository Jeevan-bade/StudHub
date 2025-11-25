import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare,
  Send,
  Search,
  Plus,
  Bell,
  BellOff,
  Star,
  Archive,
  Trash2,
  Users,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Clock,
  Pin,
  MoreVertical
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Messages() {
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const [conversations] = useState([
    {
      id: 1,
      type: "direct",
      participant: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg",
        status: "online",
        role: "Instructor"
      },
      lastMessage: {
        text: "Great question about async/await! Let me explain the difference...",
        time: "2 min ago",
        sender: "Sarah Chen",
        unread: true
      },
      course: "Advanced JavaScript"
    },
    {
      id: 2,
      type: "group",
      name: "React Study Group",
      participants: 8,
      lastMessage: {
        text: "Alex: Anyone know why my useEffect is running infinitely?",
        time: "15 min ago",
        sender: "Alex Johnson",
        unread: false
      },
      course: "React Best Practices"
    },
    {
      id: 3,
      type: "direct",
      participant: {
        name: "Mike Rodriguez",
        avatar: "/placeholder.svg",
        status: "away",
        role: "Student"
      },
      lastMessage: {
        text: "Thanks for the help with the database assignment!",
        time: "1 hour ago",
        sender: "Mike Rodriguez",
        unread: false
      },
      course: "Database Design"
    },
    {
      id: 4,
      type: "announcement",
      name: "Course Updates",
      lastMessage: {
        text: "New assignment posted: React Component Optimization",
        time: "3 hours ago",
        sender: "System",
        unread: true
      },
      course: "React Best Practices"
    }
  ]);

  const [messages] = useState([
    {
      id: 1,
      conversationId: 1,
      sender: "Sarah Chen",
      text: "Hi Alex! I saw your question about closures in the course forum. Would you like me to explain it in more detail?",
      time: "10:30 AM",
      isOwn: false,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      conversationId: 1,
      sender: "You",
      text: "Yes, that would be really helpful! I'm struggling to understand when to use them.",
      time: "10:32 AM",
      isOwn: true,
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      conversationId: 1,
      sender: "Sarah Chen",
      text: "Great question about async/await! Let me explain the difference between promises and async/await syntax. Async/await is just syntactic sugar over promises, but it makes asynchronous code much more readable.",
      time: "10:35 AM",
      isOwn: false,
      avatar: "/placeholder.svg"
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      type: "message",
      title: "New message from Sarah Chen",
      description: "Great question about async/await! Let me explain...",
      time: "2 min ago",
      unread: true,
      course: "Advanced JavaScript"
    },
    {
      id: 2,
      type: "announcement",
      title: "Course Update: React Best Practices",
      description: "New assignment posted: Component Optimization",
      time: "3 hours ago",
      unread: true,
      course: "React Best Practices"
    },
    {
      id: 3,
      type: "reminder",
      title: "Study Group Meeting Tomorrow",
      description: "React Study Group - 2:00 PM in Virtual Room",
      time: "1 day ago",
      unread: false,
      course: "React Best Practices"
    },
    {
      id: 4,
      type: "achievement",
      title: "New Badge Earned!",
      description: "You've earned the 'Active Participant' badge",
      time: "2 days ago",
      unread: false,
      course: "General"
    }
  ]);

  const currentConversation = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = messages.filter(m => m.conversationId === selectedConversation);

  const filteredConversations = conversations.filter(conv => {
    const searchLower = searchTerm.toLowerCase();
    if (conv.type === "direct") {
      return conv.participant.name.toLowerCase().includes(searchLower);
    } else {
      return conv.name?.toLowerCase().includes(searchLower);
    }
  });

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been delivered."
    });
    setMessageText("");
  };

  const handleStartConversation = () => {
    toast({
      title: "Conversation Started",
      description: "New conversation has been created."
    });
    setIsComposing(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "announcement":
        return <Bell className="h-4 w-4" />;
      case "reminder":
        return <Clock className="h-4 w-4" />;
      case "achievement":
        return <Star className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Messages & Notifications
          </h1>
          <p className="text-muted-foreground">
            Connect with instructors, classmates, and stay updated
          </p>
        </div>

        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
              <Badge variant="destructive" className="text-xs">
                {notifications.filter(n => n.unread).length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* Conversations List */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Dialog open={isComposing} onOpenChange={setIsComposing}>
                    <DialogTrigger asChild>
                      <Button size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Start New Conversation</DialogTitle>
                        <DialogDescription>
                          Send a message to an instructor or classmate
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="recipient">Recipient</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select recipient" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sarah">Sarah Chen (Instructor)</SelectItem>
                              <SelectItem value="mike">Mike Rodriguez (Student)</SelectItem>
                              <SelectItem value="emma">Emma Thompson (Instructor)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" placeholder="Message subject..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea 
                            id="message" 
                            placeholder="Type your message..." 
                            rows={4}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsComposing(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleStartConversation}>
                            Send Message
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <ScrollArea className="h-[500px]">
                  <div className="space-y-2">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedConversation === conversation.id
                            ? "bg-accent border-primary"
                            : "bg-card hover:bg-accent/50"
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="flex items-start gap-3">
                          {conversation.type === "direct" ? (
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={conversation.participant.avatar} />
                                <AvatarFallback>
                                  {conversation.participant.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                                conversation.participant.status === "online" ? "bg-green-500" : "bg-gray-400"
                              }`} />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              {conversation.type === "group" ? (
                                <Users className="h-5 w-5 text-primary" />
                              ) : (
                                <Bell className="h-5 w-5 text-primary" />
                              )}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm truncate">
                                {conversation.type === "direct" 
                                  ? conversation.participant.name
                                  : conversation.name
                                }
                              </h4>
                              {conversation.lastMessage.unread && (
                                <div className="h-2 w-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {conversation.course}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {conversation.lastMessage.text}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {conversation.lastMessage.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Chat Area */}
              <div className="lg:col-span-2">
                {selectedConversation ? (
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {currentConversation?.type === "direct" ? (
                            <Avatar>
                              <AvatarImage src={currentConversation.participant.avatar} />
                              <AvatarFallback>
                                {currentConversation.participant.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              {currentConversation?.type === "group" ? (
                                <Users className="h-5 w-5 text-primary" />
                              ) : (
                                <Bell className="h-5 w-5 text-primary" />
                              )}
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold">
                              {currentConversation?.type === "direct" 
                                ? currentConversation.participant.name
                                : currentConversation?.name
                              }
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {currentConversation?.course}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <Separator />
                    
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {conversationMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.avatar} />
                              <AvatarFallback>
                                {message.isOwn ? "You" : message.sender.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`max-w-[70%] ${message.isOwn ? "text-right" : ""}`}>
                              <div className={`p-3 rounded-lg ${
                                message.isOwn 
                                  ? "bg-primary text-primary-foreground" 
                                  : "bg-muted"
                              }`}>
                                <p className="text-sm">{message.text}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <Separator />
                    
                    <div className="p-4">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Type your message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          rows={2}
                          className="resize-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="h-full flex items-center justify-center">
                    <CardContent className="text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a conversation to start messaging</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Notifications</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark All Read
                </Button>
                <Button variant="outline" size="sm">
                  <BellOff className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`${notification.unread ? "border-primary/50" : ""}`}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        notification.unread ? "bg-primary/10" : "bg-muted"
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {notification.course}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {notification.unread && (
                              <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                            )}
                            <Button variant="ghost" size="sm">
                              <Archive className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}