import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseProgress } from "@/components/courses/CourseProgress";
import { AdvancedCourseFeatures } from "@/components/courses/AdvancedCourseFeatures";
import { 
  Play, 
  Users, 
  Clock, 
  Star, 
  Award,
  BookOpen,
  ChevronLeft
} from "lucide-react";

const CourseDetail = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock course data
  const courseData = {
    id: "react-course-1",
    title: "Complete React Developer Course",
    instructor: "Sarah Chen",
    rating: 4.9,
    students: 12500,
    duration: "40 hours",
    level: "Intermediate",
    description: "Master React development with hands-on projects and real-world applications. This comprehensive course covers everything from basic components to advanced patterns, state management, and deployment strategies.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&crop=center",
    skills: ["React", "JavaScript", "Redux", "Hooks", "Context API"],
    prerequisites: ["Basic JavaScript knowledge", "HTML & CSS fundamentals"],
    whatYouWillLearn: [
      "Build modern React applications from scratch",
      "Master React Hooks and functional components",
      "Implement state management with Redux and Context",
      "Create responsive and accessible user interfaces",
      "Deploy React applications to production",
      "Optimize performance and handle edge cases"
    ],
    overallProgress: 65,
    isEnrolled: true
  };

  const modules = [
    {
      id: "module-1",
      title: "React Fundamentals",
      progress: 100,
      lessons: [
        { id: "1", title: "Introduction to React", duration: "15 min", completed: true, locked: false, type: "video" as const },
        { id: "2", title: "JSX and Components", duration: "20 min", completed: true, locked: false, type: "video" as const },
        { id: "3", title: "Props and State", duration: "25 min", completed: true, locked: false, type: "video" as const },
        { id: "4", title: "Quiz: React Basics", duration: "10 min", completed: true, locked: false, type: "quiz" as const }
      ]
    },
    {
      id: "module-2", 
      title: "Advanced React Concepts",
      progress: 75,
      lessons: [
        { id: "5", title: "React Hooks Deep Dive", duration: "30 min", completed: true, locked: false, type: "video" as const },
        { id: "6", title: "Context API", duration: "25 min", completed: true, locked: false, type: "video" as const },
        { id: "7", title: "Performance Optimization", duration: "35 min", completed: false, locked: false, type: "video" as const },
        { id: "8", title: "Custom Hooks Project", duration: "45 min", completed: false, locked: false, type: "assignment" as const }
      ]
    },
    {
      id: "module-3",
      title: "State Management & Redux",
      progress: 25,
      lessons: [
        { id: "9", title: "Introduction to Redux", duration: "20 min", completed: true, locked: false, type: "video" as const },
        { id: "10", title: "Redux Toolkit", duration: "30 min", completed: false, locked: false, type: "video" as const },
        { id: "11", title: "Async Actions", duration: "25 min", completed: false, locked: true, type: "video" as const },
        { id: "12", title: "Redux Project", duration: "60 min", completed: false, locked: true, type: "assignment" as const }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Back Button */}
        <Button variant="ghost" size="sm" className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>

        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{courseData.title}</h1>
              <p className="text-lg text-muted-foreground">{courseData.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium">{courseData.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{courseData.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{courseData.duration}</span>
                </div>
                <Badge variant="outline">{courseData.level}</Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">by</span>
                <span className="font-medium">{courseData.instructor}</span>
                <Badge variant="secondary">Expert Instructor</Badge>
              </div>
            </div>

            {/* Course Image */}
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={courseData.thumbnail} 
                alt={courseData.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Play className="h-6 w-6 mr-2" />
                  Continue Learning
                </Button>
              </div>
            </div>
          </div>

          {/* Course Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {courseData.overallProgress}%
                  </div>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
                
                <Button className="w-full bg-gradient-primary">
                  <Play className="h-4 w-4 mr-2" />
                  Continue Learning
                </Button>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Modules:</span>
                    <span className="font-medium">{modules.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lessons:</span>
                    <span className="font-medium">
                      {modules.reduce((total, module) => total + module.lessons.length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed:</span>
                    <span className="font-medium">
                      {modules.reduce((total, module) => 
                        total + module.lessons.filter(lesson => lesson.completed).length, 0
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills You'll Learn */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Skills You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {courseData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {courseData.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {prereq}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content Tabs */}
        <Tabs defaultValue="curriculum" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="space-y-6 mt-6">
            <CourseProgress
              courseTitle={courseData.title}
              instructor={courseData.instructor}
              overallProgress={courseData.overallProgress}
              modules={modules}
              isBookmarked={isBookmarked}
              onBookmarkToggle={() => setIsBookmarked(!isBookmarked)}
              certificate={{ available: courseData.overallProgress >= 80 }}
            />
          </TabsContent>

          <TabsContent value="features" className="space-y-6 mt-6">
            <AdvancedCourseFeatures
              courseId={courseData.id}
              isBookmarked={isBookmarked}
              certificate={{ available: courseData.overallProgress >= 80 }}
            />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {courseData.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6 mt-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Reviews Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Student reviews and ratings will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseDetail;