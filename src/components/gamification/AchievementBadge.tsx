import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  xpReward: number;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  onClick?: () => void;
}

export const AchievementBadge = ({ achievement, onClick }: AchievementBadgeProps) => {
  const { title, description, icon: Icon, earned, earnedDate, progress, maxProgress, rarity, xpReward } = achievement;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "border-muted";
      case "uncommon": return "border-success";
      case "rare": return "border-warning";
      case "legendary": return "border-primary bg-gradient-card";
      default: return "border-muted";
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-muted";
      case "uncommon": return "bg-success";
      case "rare": return "bg-warning";
      case "legendary": return "bg-gradient-primary";
      default: return "bg-muted";
    }
  };

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-glow ${
        earned 
          ? `border-2 ${getRarityColor(rarity)} ${rarity === 'legendary' ? 'shadow-primary/20' : ''}` 
          : 'border-dashed border-muted opacity-60 hover:opacity-80'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${earned ? 'bg-primary/10' : 'bg-muted/50'}`}>
                <Icon 
                  className={`h-6 w-6 ${earned ? 'text-primary' : 'text-muted-foreground'}`}
                />
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold ${earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {description}
                </p>
              </div>
            </div>
            
            {earned && (
              <Badge className={`${getRarityBadgeColor(rarity)} text-white border-0 text-xs`}>
                {rarity}
              </Badge>
            )}
          </div>

          {/* Progress Bar (for unearned achievements with progress) */}
          {!earned && progress !== undefined && maxProgress && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{progress}/{maxProgress}</span>
              </div>
              <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(progress / maxProgress) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                +{xpReward} XP
              </Badge>
            </div>
            
            {earned && earnedDate && (
              <span className="text-xs text-muted-foreground">
                Earned {new Date(earnedDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};