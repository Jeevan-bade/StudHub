import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearningAnalytics } from "@/components/analytics/LearningAnalytics";
import { XPSystem } from "@/components/gamification/XPSystem";
import { AchievementBadge } from "@/components/gamification/AchievementBadge";
import { 
  BarChart3, 
  TrendingUp, 
  Trophy, 
  Target,
  Award,
  Users,
  Zap,
  BookOpen,
  Calendar,
  Clock
} from "lucide-react";

const Analytics = () => {
  const analyticsData = {
    weeklyStats: {
      hoursStudied: 24,
      coursesStarted: 3,
      lessonsCompleted: 18,
      streakDays: 12
    },
    learningVelocity: {
      current: 8.5,
      previous: 6.2,
      trend: "up" as const
    },
    skillGrowth: [
      { skill: "React Development", growth: 25, level: "Advanced" },
      { skill: "UI/UX Design", growth: 18, level: "Intermediate" },
      { skill: "JavaScript", growth: 15, level: "Expert" },
      { skill: "TypeScript", growth: 12, level: "Intermediate" }
    ],
    timeDistribution: [
      { category: "Programming", hours: 15, percentage: 60, color: "#3b82f6" },
      { category: "Design", hours: 6, percentage: 25, color: "#10b981" },
      { category: "Business", hours: 3, percentage: 15, color: "#f59e0b" }
    ],
    achievements: {
      total: 24,
      thisWeek: 3,
      nextGoal: "Complete 5 courses milestone"
    },
    predictiveInsights: {
      estimatedCourseCompletion: "3 weeks",
      suggestedStudyTime: "2h daily",
      nextMilestone: "Level 15 (850 XP)"
    }
  };

  const xpData = {
    currentXP: 2450,
    level: 14,
    levelName: "Advanced Learner",
    nextLevelXP: 3000,
    dailyStreak: 12,
    weeklyGoal: 40,
    weeklyProgress: 24
  };

  const achievements = [
    {
      id: "1",
      title: "Course Completionist",
      description: "Complete 10 courses",
      icon: BookOpen,
      earned: true,
      earnedDate: "2024-01-15",
      rarity: "uncommon" as const,
      xpReward: 100
    },
    {
      id: "2",
      title: "Speed Learner",
      description: "Complete a course in under 2 days",
      icon: Zap,
      earned: true,
      earnedDate: "2024-01-12",
      rarity: "rare" as const,
      xpReward: 150
    },
    {
      id: "3",
      title: "Knowledge Seeker",
      description: "Earn 5000 XP",
      icon: Target,
      earned: false,
      progress: 2450,
      maxProgress: 5000,
      rarity: "legendary" as const,
      xpReward: 500
    },
    {
      id: "4",
      title: "Streak Master",
      description: "Maintain a 30-day learning streak",
      icon: Calendar,
      earned: false,
      progress: 12,
      maxProgress: 30,
      rarity: "rare" as const,
      xpReward: 200
    },
    {
      id: "5",
      title: "Time Champion",
      description: "Study for 100 hours total",
      icon: Clock,
      earned: false,
      progress: 67,
      maxProgress: 100,
      rarity: "uncommon" as const,
      xpReward: 75
    },
    {
      id: "6",
      title: "Community Helper",
      description: "Help 5 fellow students",
      icon: Users,
      earned: false,
      progress: 2,
      maxProgress: 5,
      rarity: "common" as const,
      xpReward: 50
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Learning Analytics 📊
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your progress and optimize your learning journey
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp size={16} />
              Progress
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy size={16} />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="gamification" className="flex items-center gap-2">
              <Award size={16} />
              XP & Level
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <LearningAnalytics data={analyticsData} />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Learning Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-8 border-2 border-dashed border-muted rounded-lg">
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Interactive charts and detailed progress tracking coming soon
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Study Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-8 border-2 border-dashed border-muted rounded-lg">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Detailed study pattern analysis and recommendations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <AchievementBadge 
                  key={achievement.id} 
                  achievement={achievement}
                  onClick={() => console.log('Achievement clicked:', achievement.title)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gamification" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <XPSystem {...xpData} />
              </div>
              
              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Level Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-sm">Exclusive course access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-sm">Priority mentor support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-muted rounded-full" />
                      <span className="text-sm text-muted-foreground">Custom certificates (Level 15)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-muted rounded-full" />
                      <span className="text-sm text-muted-foreground">Beta features access (Level 20)</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>XP Multipliers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Daily streak bonus</span>
                      <span className="text-sm font-bold text-primary">2x</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Weekend learning</span>
                      <span className="text-sm font-bold text-success">1.5x</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Course completion</span>
                      <span className="text-sm font-bold text-warning">3x</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;