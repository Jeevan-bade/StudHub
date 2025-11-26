import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  Play,
  BookOpen,
  Zap,
  Trophy,
  Target
} from "lucide-react";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Courses", count: 156 },
    { id: "programming", name: "Programming", count: 45 },
    { id: "design", name: "Design", count: 32 },
    { id: "business", name: "Business", count: 28 },
    { id: "data-science", name: "Data Science", count: 23 },
    { id: "marketing", name: "Marketing", count: 18 },
    { id: "soft-skills", name: "Soft Skills", count: 10 }
  ];

  const featuredCourses = [
    {
      id: 1,
      title: "Complete React Developer Course",
      instructor: "Sarah Chen",
      rating: 4.9,
      students: 12500,
      duration: "40 hours",
      level: "Intermediate",
      price: "Free",
      category: "programming",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&crop=center",
      skills: ["React", "JavaScript", "Redux"],
      description: "Master React development with hands-on projects and real-world applications."
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Alex Johnson",
      rating: 4.8,
      students: 8700,
      duration: "25 hours",
      level: "Beginner",
      price: "Free",
      category: "design",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop&crop=center",
      skills: ["Figma", "Design Thinking", "Prototyping"],
      description: "Learn the fundamentals of user experience and interface design."
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Dr. Maria Rodriguez",
      rating: 4.9,
      students: 15200,
      duration: "60 hours",
      level: "Intermediate",
      price: "Premium",
      category: "data-science",
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop&crop=center",
      skills: ["Python", "Pandas", "NumPy", "Machine Learning"],
      description: "Comprehensive data science course covering analysis and machine learning."
    },
    {
      id: 4,
      title: "Digital Marketing Mastery",
      instructor: "Mike Thompson",
      rating: 4.7,
      students: 6800,
      duration: "30 hours",
      level: "Beginner",
      price: "Premium",
      category: "marketing",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
      skills: ["SEO", "Social Media", "Analytics"],
      description: "Master digital marketing strategies and grow your online presence."
    }
  ];

  const recommendedCourses = [
    {
      id: 5,
      title: "Advanced JavaScript Concepts",
      instructor: "David Kim",
      rating: 4.8,
      students: 9200,
      duration: "35 hours",
      level: "Advanced",
      price: "Free",
      category: "programming",
      skills: ["JavaScript", "Async/Await", "Closures"],
      recommended: "Based on your React progress"
    },
    {
      id: 6,
      title: "Leadership in Tech",
      instructor: "Jennifer Lee",
      rating: 4.6,
      students: 4500,
      duration: "20 hours",
      level: "Intermediate",
      price: "Premium",
      category: "soft-skills",
      skills: ["Leadership", "Team Management", "Communication"],
      recommended: "Complete your skill set"
    }
  ];

  const filteredCourses = featuredCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "text-success";
      case "Intermediate": return "text-warning";
      case "Advanced": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const CourseCard = ({ course, showRecommendation = false }: { course: any, showRecommendation?: boolean }) => (
    <Card className="group hover:shadow-glow transition-all duration-300 overflow-hidden">
      <div className="relative">
        {course.thumbnail && (
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="absolute top-4 right-4">
          <Badge variant={course.price === "Free" ? "secondary" : "default"} 
                 className={course.price === "Free" ? "bg-success text-success-foreground" : ""}>
            {course.price}
          </Badge>
        </div>
        {showRecommendation && (
          <div className="absolute top-4 left-4">
            <Badge variant="default" className="bg-gradient-primary">
              <Zap size={12} className="mr-1" />
              Recommended
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground">by {course.instructor}</p>
          </div>

          {showRecommendation && course.recommended && (
            <div className="bg-accent/50 p-2 rounded-md">
              <p className="text-xs text-accent-foreground">💡 {course.recommended}</p>
            </div>
          )}

          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {course.skills.slice(0, 3).map((skill: string) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {course.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.skills.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span>{course.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.students.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className={getLevelColor(course.level)}>
              {course.level}
            </Badge>
            <Button variant="gamified" size="sm">
              <Play size={14} className="mr-1" />
              Start Learning
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Discover Courses 📚
            </h1>
            <p className="text-muted-foreground text-lg">
              Level up your skills with expert-led courses
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, instructors, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filters
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.name}
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="featured" className="flex items-center gap-2">
              <Trophy size={16} />
              Featured
            </TabsTrigger>
            <TabsTrigger value="recommended" className="flex items-center gap-2">
              <Target size={16} />
              For You
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <BookOpen size={16} />
              All Courses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="space-y-6 mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Recommended for You</h2>
              <p className="text-muted-foreground">
                Courses selected based on your learning progress and interests
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <CourseCard key={course.id} course={course} showRecommendation />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {filteredCourses.length} courses found
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Courses;