import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  Search,
  Plus,
  Clock,
  BookOpen,
  Star,
  MapPin
} from "lucide-react";
import { useState } from "react";

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  maxMembers: number;
  topic: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  nextSession: string;
  location: "Online" | "Hybrid" | string;
  isJoined: boolean;
  rating: number;
  tags: string[];
  recentActivity: string;
  moderator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
}

export const StudyGroups = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const studyGroups: StudyGroup[] = [
    {
      id: "1",
      name: "React Developers Circle",
      description: "Weekly React study sessions covering advanced patterns, hooks, and best practices.",
      members: 24,
      maxMembers: 30,
      topic: "React Development",
      level: "Advanced",
      nextSession: "Tomorrow at 7:00 PM",
      location: "Online",
      isJoined: true,
      rating: 4.8,
      tags: ["React", "JavaScript", "Frontend"],
      recentActivity: "2 hours ago",
      moderator: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
        verified: true
      }
    },
    {
      id: "2",
      name: "UI/UX Design Lab",
      description: "Collaborative design challenges and portfolio reviews. Perfect for aspiring designers.",
      members: 18,
      maxMembers: 25,
      topic: "Design",
      level: "Intermediate",
      nextSession: "Friday at 6:30 PM",
      location: "Online",
      isJoined: false,
      rating: 4.6,
      tags: ["Design", "Figma", "Portfolio"],
      recentActivity: "5 hours ago",
      moderator: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        verified: true
      }
    },
    {
      id: "3",
      name: "Python Data Science Hub",
      description: "Data analysis projects, machine learning discussions, and coding challenges.",
      members: 32,
      maxMembers: 40,
      topic: "Data Science",
      level: "Intermediate",
      nextSession: "Sunday at 4:00 PM",
      location: "Hybrid - NYC",
      isJoined: false,
      rating: 4.9,
      tags: ["Python", "Data Science", "ML"],
      recentActivity: "1 hour ago",
      moderator: {
        name: "Dr. Maria Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        verified: true
      }
    },
    {
      id: "4",
      name: "Beginner Coders Unite",
      description: "Supportive community for coding beginners. We help each other learn programming fundamentals.",
      members: 45,
      maxMembers: 50,
      topic: "Programming Basics",
      level: "Beginner",
      nextSession: "Wednesday at 8:00 PM",
      location: "Online",
      isJoined: true,
      rating: 4.7,
      tags: ["Beginner", "HTML", "CSS", "JavaScript"],
      recentActivity: "30 minutes ago",
      moderator: {
        name: "Mike Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        verified: false
      }
    }
  ];

  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "joined" && group.isJoined) ||
                         (selectedFilter === "available" && !group.isJoined) ||
                         group.level.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-success";
      case "Intermediate": return "bg-warning";
      case "Advanced": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Study Groups</h2>
          <p className="text-muted-foreground">Connect with fellow learners and grow together</p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search study groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {["all", "joined", "available", "beginner", "intermediate", "advanced"].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className="capitalize"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Study Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="group hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {group.name}
                    </CardTitle>
                    {group.moderator.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{group.members}/{group.maxMembers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span>{group.rating}</span>
                    </div>
                  </div>
                </div>
                
                <Badge className={`${getLevelColor(group.level)} text-white`}>
                  {group.level}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {group.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {group.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Next Session & Location */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">{group.nextSession}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{group.location}</span>
                </div>
              </div>

              {/* Moderator */}
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={group.moderator.avatar} />
                  <AvatarFallback>{group.moderator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{group.moderator.name}</p>
                  <p className="text-xs text-muted-foreground">Moderator</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {group.isJoined ? (
                  <>
                    <Button variant="default" size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Open Chat
                    </Button>
                    <Button variant="outline" size="sm">
                      Leave
                    </Button>
                  </>
                ) : (
                  <Button variant="gamified" size="sm" className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Join Group
                  </Button>
                )}
              </div>

              {/* Recent Activity */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground border-t pt-3">
                <Clock className="h-3 w-3" />
                <span>Last activity: {group.recentActivity}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No study groups found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or create a new study group
          </p>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Study Group
          </Button>
        </div>
      )}
    </div>
  );
};