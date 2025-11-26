import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Brain, 
  Calendar,
  BookOpen,
  Award,
  Zap
} from "lucide-react";

interface AnalyticsData {
  weeklyStats: {
    hoursStudied: number;
    coursesStarted: number;
    lessonsCompleted: number;
    streakDays: number;
  };
  learningVelocity: {
    current: number;
    previous: number;
    trend: "up" | "down" | "stable";
  };
  skillGrowth: {
    skill: string;
    growth: number;
    level: string;
  }[];
  timeDistribution: {
    category: string;
    hours: number;
    percentage: number;
    color: string;
  }[];
  achievements: {
    total: number;
    thisWeek: number;
    nextGoal: string;
  };
  predictiveInsights: {
    estimatedCourseCompletion: string;
    suggestedStudyTime: string;
    nextMilestone: string;
  };
}

interface LearningAnalyticsProps {
  data: AnalyticsData;
}

export const LearningAnalytics = ({ data }: LearningAnalyticsProps) => {
  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === "down") return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
    return <TrendingUp className="h-4 w-4 text-muted-foreground" />;
  };

  const getTrendColor = (trend: "up" | "down" | "stable") => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-primary text-primary-foreground border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Hours Studied</p>
                <p className="text-2xl font-bold">{data.weeklyStats.hoursStudied}</p>
              </div>
              <Clock className="h-6 w-6 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary text-secondary-foreground border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Courses Started</p>
                <p className="text-2xl font-bold">{data.weeklyStats.coursesStarted}</p>
              </div>
              <BookOpen className="h-6 w-6 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success text-success-foreground border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Lessons Completed</p>
                <p className="text-2xl font-bold">{data.weeklyStats.lessonsCompleted}</p>
              </div>
              <Target className="h-6 w-6 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-warning text-warning-foreground border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Current Streak</p>
                <p className="text-2xl font-bold">{data.weeklyStats.streakDays} days</p>
              </div>
              <Zap className="h-6 w-6 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Velocity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Learning Velocity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current pace</p>
                <p className="text-3xl font-bold">{data.learningVelocity.current}h/week</p>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(data.learningVelocity.trend)}
                <span className={`text-sm font-medium ${getTrendColor(data.learningVelocity.trend)}`}>
                  {data.learningVelocity.trend === "up" ? "+" : ""}
                  {data.learningVelocity.current - data.learningVelocity.previous}h
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Weekly Goal Progress</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Keep up the pace! You're on track to exceed your weekly goal.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Skill Growth */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Skill Development
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.skillGrowth.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{skill.level}</Badge>
                    <span className="text-sm text-success">+{skill.growth}%</span>
                  </div>
                </div>
                <Progress value={skill.growth} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Time Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Study Time Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.timeDistribution.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">{category.hours}h</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({category.percentage}%)
                    </span>
                  </div>
                </div>
                <Progress 
                  value={category.percentage} 
                  className="h-2"
                  style={{ 
                    background: `linear-gradient(to right, ${category.color} 0%, ${category.color} ${category.percentage}%, var(--muted) ${category.percentage}%)` 
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements & Insights */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Achievements & Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Achievement Stats */}
            <div className="bg-gradient-card p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Total Achievements</span>
                <Badge className="bg-primary">{data.achievements.total}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                +{data.achievements.thisWeek} earned this week
              </div>
              <div className="mt-2 text-xs text-primary">
                Next goal: {data.achievements.nextGoal}
              </div>
            </div>

            {/* Predictive Insights */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Predictive Insights</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course completion:</span>
                  <span className="font-medium">{data.predictiveInsights.estimatedCourseCompletion}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Suggested study time:</span>
                  <span className="font-medium">{data.predictiveInsights.suggestedStudyTime}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next milestone:</span>
                  <span className="font-medium">{data.predictiveInsights.nextMilestone}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};