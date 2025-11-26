import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Trophy, Target, Star } from "lucide-react";

interface XPSystemProps {
  currentXP: number;
  level: number;
  levelName: string;
  nextLevelXP: number;
  dailyStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

export const XPSystem = ({ 
  currentXP, 
  level, 
  levelName, 
  nextLevelXP, 
  dailyStreak, 
  weeklyGoal, 
  weeklyProgress 
}: XPSystemProps) => {
  const progressPercentage = (currentXP / nextLevelXP) * 100;
  const weeklyPercentage = (weeklyProgress / weeklyGoal) * 100;

  return (
    <Card className="bg-gradient-primary text-primary-foreground border-0 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10"></div>
      
      <CardContent className="p-6 relative z-10">
        <div className="space-y-6">
          {/* Level and XP */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-5 w-5" />
                <span className="text-sm opacity-90">Level {level}</span>
              </div>
              <h3 className="text-xl font-bold">{levelName}</h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{currentXP.toLocaleString()}</div>
              <div className="text-sm opacity-75">XP</div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {level + 1}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-white/20" />
            <div className="text-xs opacity-75">
              {(nextLevelXP - currentXP).toLocaleString()} XP to next level
            </div>
          </div>

          {/* Streak and Goals */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4" />
                <span className="text-sm">Daily Streak</span>
              </div>
              <div className="text-xl font-bold">{dailyStreak} days</div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4" />
                <span className="text-sm">Weekly Goal</span>
              </div>
              <div className="text-xl font-bold">{Math.round(weeklyPercentage)}%</div>
              <Progress value={weeklyPercentage} className="h-1 mt-1 bg-white/20" />
            </div>
          </div>

          {/* Recent XP Gains */}
          <div className="space-y-2">
            <div className="text-sm opacity-90">Recent gains:</div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                <Star className="h-3 w-3 mr-1" />
                +50 XP Course Complete
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                +25 XP Daily Goal
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};