import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bookmark, 
  BookmarkCheck, 
  FileText, 
  Download, 
  Award,
  MessageSquare,
  PenTool,
  Share2,
  Clock,
  Users,
  Star,
  ThumbsUp,
  Flag
} from "lucide-react";
import { useState } from "react";

interface Note {
  id: string;
  lessonId: string;
  content: string;
  timestamp: string;
  lessonTitle: string;
}

interface Discussion {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isLiked: boolean;
}

interface AdvancedCourseFeaturesProps {
  courseId: string;
  isBookmarked: boolean;
  certificate?: {
    available: boolean;
    downloadUrl?: string;
  };
}

export const AdvancedCourseFeatures = ({ 
  courseId, 
  isBookmarked, 
  certificate 
}: AdvancedCourseFeaturesProps) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      lessonId: "lesson-1",
      content: "Key insight: React hooks allow functional components to have state and lifecycle methods. This is a game-changer for component architecture.",
      timestamp: "2024-01-15T10:30:00",
      lessonTitle: "Introduction to React Hooks"
    },
    {
      id: "2", 
      lessonId: "lesson-3",
      content: "Remember: useEffect with empty dependency array runs once on mount, perfect for API calls.",
      timestamp: "2024-01-16T14:20:00",
      lessonTitle: "useEffect Deep Dive"
    }
  ]);

  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "1",
      user: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      content: "Great explanation of useState! I was confused about the state updates being asynchronous, but this cleared it up perfectly.",
      timestamp: "2 hours ago",
      likes: 12,
      replies: 3,
      isLiked: false
    },
    {
      id: "2",
      user: "Sarah Kim", 
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      content: "Quick question about useCallback - when exactly should we use it? The performance implications aren't clear to me.",
      timestamp: "4 hours ago",
      likes: 8,
      replies: 5,
      isLiked: true
    },
    {
      id: "3",
      user: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face", 
      content: "Love the practical examples! The todo app really helped me understand how to structure components properly.",
      timestamp: "1 day ago",
      likes: 15,
      replies: 2,
      isLiked: true
    }
  ]);

  const [newNote, setNewNote] = useState("");
  const [newDiscussion, setNewDiscussion] = useState("");

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        lessonId: "current-lesson",
        content: newNote,
        timestamp: new Date().toISOString(),
        lessonTitle: "Current Lesson"
      };
      setNotes([note, ...notes]);
      setNewNote("");
    }
  };

  const addDiscussion = () => {
    if (newDiscussion.trim()) {
      const discussion: Discussion = {
        id: Date.now().toString(),
        user: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
        content: newDiscussion,
        timestamp: "Just now",
        likes: 0,
        replies: 0,
        isLiked: false
      };
      setDiscussions([discussion, ...discussions]);
      setNewDiscussion("");
    }
  };

  const toggleLike = (discussionId: string) => {
    setDiscussions(discussions.map(d => 
      d.id === discussionId 
        ? { ...d, isLiked: !d.isLiked, likes: d.isLiked ? d.likes - 1 : d.likes + 1 }
        : d
    ));
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Bar */}
      <Card className="bg-gradient-card border-primary/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Course
            </Button>
            
            {certificate?.available && (
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Certificate
              </Button>
            )}
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Report Issue
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <PenTool size={16} />
            My Notes ({notes.length})
          </TabsTrigger>
          <TabsTrigger value="discussions" className="flex items-center gap-2">
            <MessageSquare size={16} />
            Discussions ({discussions.length})
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <FileText size={16} />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="space-y-4 mt-6">
          {/* Add New Note */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add a Note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Write your note here... (Tip: Include timestamps or lesson references for better organization)"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={addNote} disabled={!newNote.trim()}>
                <PenTool className="h-4 w-4 mr-2" />
                Save Note
              </Button>
            </CardContent>
          </Card>

          {/* Notes List */}
          <div className="space-y-3">
            {notes.map((note) => (
              <Card key={note.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="text-xs">
                        {note.lessonTitle}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(note.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{note.content}</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-xs">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-destructive">
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4 mt-6">
          {/* Add New Discussion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Start a Discussion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Ask a question, share insights, or start a discussion..."
                value={newDiscussion}
                onChange={(e) => setNewDiscussion(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={addDiscussion} disabled={!newDiscussion.trim()}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Post Discussion
              </Button>
            </CardContent>
          </Card>

          {/* Discussions List */}
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={discussion.avatar}
                        alt={discussion.user}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{discussion.user}</span>
                          <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{discussion.content}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`flex items-center gap-1 ${discussion.isLiked ? 'text-primary' : ''}`}
                        onClick={() => toggleLike(discussion.id)}
                      >
                        <ThumbsUp className={`h-4 w-4 ${discussion.isLiked ? 'fill-current' : ''}`} />
                        {discussion.likes}
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {discussion.replies} replies
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Course Materials */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Course Materials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">React Cheat Sheet</p>
                    <p className="text-xs text-muted-foreground">PDF • 2.3 MB</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Exercise Files</p>
                    <p className="text-xs text-muted-foreground">ZIP • 15.7 MB</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Additional Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm mb-1">Official React Documentation</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Comprehensive guide to React concepts
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Visit Site
                  </Button>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm mb-1">MDN Web Docs</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    JavaScript and web development reference
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Visit Site
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};