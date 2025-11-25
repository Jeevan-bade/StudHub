import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Users,
  Award,
  Play,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight
} from "lucide-react";

export default function PersonalDashboard() {
  const [quickActions] = useState([
    { id: 1, title: "Continue JavaScript Course", type: "course", icon: Play, color: "bg-blue-500" },
    { id: 2, title: "Join Study Group", type: "social", icon: Users, color: "bg-green-500" },
    { id: 3, title: "Review Notes", type: "study", icon: BookOpen, color: "bg-purple-500" },
    { id: 4, title: "Schedule Study Time", type: "calendar", icon: Calendar, color: "bg-orange-500" }
  ]);

  const [currentCourses] = useState([
    {
      id: 1,
      title: "Advanced JavaScript Concepts",
      progress: 65,
      nextLesson: "Async/Await Patterns",
      timeLeft: "2h 30m",
      instructor: "Sarah Chen"
    },
    {
      id: 2,
      title: "React Best Practices",
      progress: 40,
      nextLesson: "Custom Hooks",
      timeLeft: "4h 15m",
      instructor: "Mike Rodriguez"
    },
    {
      id: 3,
      title: "Node.js Fundamentals",
      progress: 80,
      nextLesson: "Express Middleware",
      timeLeft: "1h 45m",
      instructor: "Emma Thompson"
    }
  ]);

  const [recentActivity] = useState([
    {
      id: 1,
      type: "completion",
      title: "Completed 'Functions and Scope' lesson",
      course: "Advanced JavaScript Concepts",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      id: 2,
      type: "achievement",
      title: "Earned 'Quick Learner' badge",
      description: "Completed 5 lessons in one day",
      time: "1 day ago",
      icon: Award,
      color: "text-yellow-500"
    },
    {
      id: 3,
      type: "social",
      title: "Joined 'React Developers' study group",
      description: "15 members • 3 active discussions",
      time: "2 days ago",
      icon: Users,
      color: "text-blue-500"
    },
    {
      id: 4,
      type: "reminder",
      title: "Assignment due tomorrow",
      course: "Node.js Fundamentals",
      time: "3 days ago",
      icon: AlertCircle,
      color: "text-orange-500"
    }
  ]);

  const [todayGoals] = useState([
    { id: 1, title: "Complete 2 JavaScript lessons", completed: true },
    { id: 2, title: "Review React notes", completed: true },
    { id: 3, title: "Practice coding exercises", completed: false },
    { id: 4, title: "Join study group discussion", completed: false }
  ]);

  const [stats] = useState({
    totalHours: 127,
    coursesCompleted: 8,
    currentStreak: 12,
    weeklyGoal: 85
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Jump right into your most important tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  className="h-20 flex-col gap-2 hover:bg-accent/50 transition-all duration-200"
                >
                  <div className={`h-8 w-8 rounded-full ${action.color} flex items-center justify-center`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-center">{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Learning Stats */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Learning Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">{stats.totalHours}</div>
                <p className="text-sm text-muted-foreground">Total Learning Hours</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Weekly Goal</span>
                  <span className="text-sm font-medium">{stats.weeklyGoal}%</span>
                </div>
                <Progress value={stats.weeklyGoal} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-xl font-bold">{stats.coursesCompleted}</div>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{stats.currentStreak}</div>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Courses */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Continue Learning
              </CardTitle>
              <CardDescription>
                Pick up where you left off
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentCourses.map((course) => (
                  <div key={course.id} className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                      </div>
                      <Badge variant="secondary">{course.progress}%</Badge>
                    </div>
                    
                    <Progress value={course.progress} className="h-2 mb-3" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Next: {course.nextLesson}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.timeLeft} remaining
                        </p>
                      </div>
                      <Button size="sm" className="gap-2">
                        Continue <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Today's Goals
              </CardTitle>
              <CardDescription>
                Stay on track with your daily objectives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center gap-3 p-2 rounded hover:bg-accent/50">
                    <div className={`h-4 w-4 rounded border-2 flex items-center justify-center ${
                      goal.completed 
                        ? 'bg-primary border-primary' 
                        : 'border-muted-foreground'
                    }`}>
                      {goal.completed && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <span className={`text-sm ${
                      goal.completed ? 'line-through text-muted-foreground' : ''
                    }`}>
                      {goal.title}
                    </span>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Add Goal
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest learning activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3 p-2 rounded hover:bg-accent/50">
                    <div className={`mt-1 ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      {activity.course && (
                        <p className="text-xs text-muted-foreground">{activity.course}</p>
                      )}
                      {activity.description && (
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                      )}
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}