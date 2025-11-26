import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BookOpen, 
  Bookmark, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Star,
  Tag,
  Calendar,
  ExternalLink,
  FileText,
  Video,
  Link
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NotesBookmarks() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);

  const [notes] = useState([
    {
      id: 1,
      title: "JavaScript Closures",
      content: "A closure is a function that has access to variables in its outer scope even after the outer function has returned. This is a powerful feature that enables data privacy and function factories.",
      course: "Advanced JavaScript",
      tags: ["javascript", "closures", "functions"],
      createdAt: "2024-01-15",
      lastModified: "2024-01-20",
      favorite: true
    },
    {
      id: 2,
      title: "React Hooks Best Practices",
      content: "1. Use useState for simple state\n2. Use useEffect for side effects\n3. Custom hooks for reusable logic\n4. Use useCallback and useMemo for performance optimization",
      course: "React Best Practices",
      tags: ["react", "hooks", "best-practices"],
      createdAt: "2024-01-18",
      lastModified: "2024-01-18",
      favorite: false
    },
    {
      id: 3,
      title: "Database Indexing Strategies",
      content: "Indexing is crucial for database performance. Consider B-tree indexes for equality and range queries, hash indexes for equality queries only, and composite indexes for multi-column queries.",
      course: "Database Design",
      tags: ["database", "indexing", "performance"],
      createdAt: "2024-01-22",
      lastModified: "2024-01-23",
      favorite: true
    }
  ]);

  const [bookmarks] = useState([
    {
      id: 1,
      title: "MDN Web Docs - JavaScript Guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
      description: "Comprehensive JavaScript documentation and tutorials",
      course: "Advanced JavaScript",
      tags: ["documentation", "javascript", "reference"],
      type: "documentation",
      createdAt: "2024-01-10",
      favorite: true
    },
    {
      id: 2,
      title: "React Testing Library Tutorial",
      url: "https://testing-library.com/docs/react-testing-library/intro/",
      description: "Learn how to test React components effectively",
      course: "React Best Practices",
      tags: ["testing", "react", "tutorial"],
      type: "tutorial",
      createdAt: "2024-01-16",
      favorite: false
    },
    {
      id: 3,
      title: "Clean Code Principles Video",
      url: "https://youtube.com/watch?v=example",
      description: "Uncle Bob's presentation on writing clean, maintainable code",
      course: "Software Engineering",
      tags: ["clean-code", "principles", "video"],
      type: "video",
      createdAt: "2024-01-20",
      favorite: true
    },
    {
      id: 4,
      title: "PostgreSQL Performance Tuning",
      url: "https://wiki.postgresql.org/wiki/Performance_Optimization",
      description: "Guide to optimizing PostgreSQL database performance",
      course: "Database Design",
      tags: ["postgresql", "performance", "optimization"],
      type: "documentation",
      createdAt: "2024-01-25",
      favorite: false
    }
  ]);

  const categories = ["all", "javascript", "react", "database", "testing", "performance"];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || note.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || bookmark.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleAddNote = () => {
    toast({
      title: "Note Added",
      description: "Your note has been saved successfully."
    });
    setIsAddingNote(false);
  };

  const handleAddBookmark = () => {
    toast({
      title: "Bookmark Added",
      description: "Resource has been bookmarked successfully."
    });
    setIsAddingBookmark(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "documentation":
        return <FileText className="h-4 w-4" />;
      case "tutorial":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Link className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Notes & Bookmarks
          </h1>
          <p className="text-muted-foreground">
            Your personal knowledge base and saved resources
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes and bookmarks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="notes" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="notes" className="gap-2">
                <FileText className="h-4 w-4" />
                Notes ({filteredNotes.length})
              </TabsTrigger>
              <TabsTrigger value="bookmarks" className="gap-2">
                <Bookmark className="h-4 w-4" />
                Bookmarks ({filteredBookmarks.length})
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Note</DialogTitle>
                    <DialogDescription>
                      Add a new note to your knowledge base
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="note-title">Title</Label>
                      <Input id="note-title" placeholder="Enter note title..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="note-course">Course</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="javascript">Advanced JavaScript</SelectItem>
                          <SelectItem value="react">React Best Practices</SelectItem>
                          <SelectItem value="database">Database Design</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="note-content">Content</Label>
                      <Textarea 
                        id="note-content" 
                        placeholder="Write your note content..." 
                        rows={6}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="note-tags">Tags</Label>
                      <Input id="note-tags" placeholder="Enter tags separated by commas..." />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddingNote(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddNote}>
                        Save Note
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isAddingBookmark} onOpenChange={setIsAddingBookmark}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bookmark
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Bookmark</DialogTitle>
                    <DialogDescription>
                      Save a useful resource for later reference
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bookmark-title">Title</Label>
                      <Input id="bookmark-title" placeholder="Enter bookmark title..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bookmark-url">URL</Label>
                      <Input id="bookmark-url" placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bookmark-description">Description</Label>
                      <Textarea 
                        id="bookmark-description" 
                        placeholder="Describe this resource..." 
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bookmark-course">Course</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="javascript">Advanced JavaScript</SelectItem>
                            <SelectItem value="react">React Best Practices</SelectItem>
                            <SelectItem value="database">Database Design</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bookmark-type">Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="documentation">Documentation</SelectItem>
                            <SelectItem value="tutorial">Tutorial</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="article">Article</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bookmark-tags">Tags</Label>
                      <Input id="bookmark-tags" placeholder="Enter tags separated by commas..." />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddingBookmark(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddBookmark}>
                        Save Bookmark
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <TabsContent value="notes" className="space-y-4">
            {filteredNotes.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No notes found. Create your first note to get started!
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredNotes.map((note) => (
                  <Card key={note.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {note.title}
                            {note.favorite && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <BookOpen className="h-3 w-3" />
                            {note.course}
                            <span className="mx-2">•</span>
                            <Calendar className="h-3 w-3" />
                            {note.lastModified}
                          </CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        {note.content}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="bookmarks" className="space-y-4">
            {filteredBookmarks.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No bookmarks found. Save your first resource to get started!
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredBookmarks.map((bookmark) => (
                  <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {getTypeIcon(bookmark.type)}
                            {bookmark.title}
                            {bookmark.favorite && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <BookOpen className="h-3 w-3" />
                            {bookmark.course}
                            <span className="mx-2">•</span>
                            <Calendar className="h-3 w-3" />
                            {bookmark.createdAt}
                          </CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {bookmark.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {bookmark.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                            Visit Resource
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}