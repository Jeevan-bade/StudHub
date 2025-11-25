import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SkillScoreCard } from "@/components/SkillScoreCard";
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Award,
  Play,
  Calendar,
  Users,
  Zap,
  MessageCircle
} from "lucide-react";

const Dashboard = () => {
  const skillScoreData = {
    score: 742,
    level: "Advanced",
    nextLevelScore: 1000,
    recentActivities: [
      { activity: "Completed React Fundamentals", points: 50, date: "2024-01-15" },
      { activity: "Finished JavaScript Assessment", points: 30, date: "2024-01-14" },
      { activity: "Submitted Portfolio Project", points: 80, date: "2024-01-13" },
    ]
  };

  const activeCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      progress: 75,
      instructor: "Sarah Chen",
      nextLesson: "Redux Toolkit",
      estimatedTime: "2h 30m",
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      progress: 45,
      instructor: "Alex Johnson",
      nextLesson: "Color Theory",
      estimatedTime: "1h 45m",
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "Python for Data Science",
      progress: 20,
      instructor: "Dr. Maria Rodriguez",
      nextLesson: "Pandas Basics",
      estimatedTime: "3h 15m",
      difficulty: "Beginner"
    }
  ];

  const achievements = [
    { title: "Course Completionist", description: "Completed 5 courses", icon: Award, earned: true },
    { title: "Quick Learner", description: "Finished course in record time", icon: Zap, earned: true },
    { title: "Team Player", description: "Participated in 10 group projects", icon: Users, earned: false },
    { title: "Streak Master", description: "7-day learning streak", icon: Target, earned: false },
  ];

  const upcomingEvents = [
    { title: "Web Dev Workshop", date: "Jan 20", time: "2:00 PM", type: "Workshop" },
    { title: "Career Guidance Session", date: "Jan 22", time: "4:00 PM", type: "Mentoring" },
    { title: "Hackathon Registration", date: "Jan 25", time: "6:00 PM", type: "Competition" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-primary text-primary-foreground border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">Courses Completed</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary-foreground/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary text-secondary-foreground border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-foreground/80 text-sm">Learning Hours</p>
                  <p className="text-3xl font-bold">156</p>
                </div>
                <Clock className="h-8 w-8 text-secondary-foreground/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-success text-success-foreground border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-success-foreground/80 text-sm">Certificates</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <Award className="h-8 w-8 text-success-foreground/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Current Streak</p>
                  <p className="text-3xl font-bold text-primary">15 days</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Courses */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Continue Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeCourses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                      </div>
                      <Badge variant="outline">{course.difficulty}</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          Next: {course.nextLesson} • {course.estimatedTime}
                        </div>
                        <Button size="sm" variant="gamified">
                          <Play size={14} className="mr-1" />
                          Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          achievement.earned 
                            ? 'border-primary/20 bg-gradient-card shadow-sm' 
                            : 'border-muted border-dashed bg-muted/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon 
                            className={`h-8 w-8 ${
                              achievement.earned ? 'text-primary' : 'text-muted-foreground'
                            }`} 
                          />
                          <div>
                            <h4 className={`font-semibold ${
                              achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {achievement.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skill Score */}
            <SkillScoreCard {...skillScoreData} />

            {/* Upcoming Events */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.date} at {event.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Events
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="hero" className="w-full">
                  <MessageCircle size={16} className="mr-2" />
                  Chat with AI Mentor
                </Button>
                <Button variant="secondary" className="w-full">
                  <BookOpen size={16} className="mr-2" />
                  Browse Courses
                </Button>
                <Button variant="outline" className="w-full">
                  <Target size={16} className="mr-2" />
                  Take Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;