import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Star, Target } from "lucide-react";

interface SkillScoreCardProps {
  score: number;
  level: string;
  nextLevelScore: number;
  recentActivities: Array<{
    activity: string;
    points: number;
    date: string;
  }>;
}

export const SkillScoreCard = ({ 
  score, 
  level, 
  nextLevelScore, 
  recentActivities 
}: SkillScoreCardProps) => {
  const progressPercentage = (score / nextLevelScore) * 100;
  
  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-success";
    if (score >= 600) return "text-warning";
    return "text-destructive";
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "Expert": return "default";
      case "Advanced": return "secondary";
      case "Intermediate": return "outline";
      default: return "outline";
    }
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span>Skill Score</span>
          </div>
          <Badge variant={getLevelBadgeVariant(level)} className="font-semibold">
            {level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Score Display */}
        <div className="text-center">
          <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
            {score}
          </div>
          <div className="text-sm text-muted-foreground">
            Out of {nextLevelScore}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to next level</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="h-4 w-4 text-warning" />
            </div>
            <div className="text-sm font-medium">Courses</div>
            <div className="text-xs text-muted-foreground">350 pts</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Target className="h-4 w-4 text-secondary" />
            </div>
            <div className="text-sm font-medium">Projects</div>
            <div className="text-xs text-muted-foreground">280 pts</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <div className="text-sm font-medium">Skills</div>
            <div className="text-xs text-muted-foreground">220 pts</div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Recent Activities</h4>
          <div className="space-y-2">
            {recentActivities.slice(0, 3).map((activity, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                <div className="text-sm">{activity.activity}</div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-success font-medium">+{activity.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};