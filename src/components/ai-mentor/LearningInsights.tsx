import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, Award, ChevronRight } from 'lucide-react';
import { LearningInsight } from '@/hooks/useAIMentor';

interface LearningInsightsProps {
  insights: LearningInsight[];
  onActionClick?: (insight: LearningInsight, action: string) => void;
}

export const LearningInsights = ({ insights, onActionClick }: LearningInsightsProps) => {
  const getInsightIcon = (type: LearningInsight['type']) => {
    switch (type) {
      case 'strength': return Award;
      case 'weakness': return AlertTriangle;
      case 'recommendation': return Brain;
      case 'achievement': return TrendingUp;
      default: return Brain;
    }
  };

  const getInsightColor = (type: LearningInsight['type']) => {
    switch (type) {
      case 'strength': return 'text-success border-success/20 bg-success/5';
      case 'weakness': return 'text-destructive border-destructive/20 bg-destructive/5';
      case 'recommendation': return 'text-primary border-primary/20 bg-primary/5';
      case 'achievement': return 'text-warning border-warning/20 bg-warning/5';
      default: return 'text-muted-foreground border-muted/20 bg-muted/5';
    }
  };

  const getPriorityBadge = (priority: LearningInsight['priority']) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive" className="text-xs">High Priority</Badge>;
      case 'medium': return <Badge variant="secondary" className="text-xs">Medium</Badge>;
      case 'low': return <Badge variant="outline" className="text-xs">Low</Badge>;
      default: return null;
    }
  };

  const groupedInsights = insights.reduce((acc, insight) => {
    if (!acc[insight.type]) acc[insight.type] = [];
    acc[insight.type].push(insight);
    return acc;
  }, {} as Record<string, LearningInsight[]>);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Learning Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(groupedInsights).map(([type, typeInsights]) => (
          <div key={type} className="space-y-3">
            <h4 className="font-medium text-sm capitalize flex items-center gap-2">
              {type === 'strength' && <Award className="h-4 w-4 text-success" />}
              {type === 'weakness' && <AlertTriangle className="h-4 w-4 text-destructive" />}
              {type === 'recommendation' && <Brain className="h-4 w-4 text-primary" />}
              {type === 'achievement' && <TrendingUp className="h-4 w-4 text-warning" />}
              {type}s
            </h4>
            
            {typeInsights.slice(0, 3).map((insight) => {
              const Icon = getInsightIcon(insight.type);
              
              return (
                <div
                  key={insight.id}
                  className={`p-3 rounded-lg border ${getInsightColor(insight.type)} space-y-2`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 flex-1">
                      <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <h5 className="font-medium text-sm">{insight.title}</h5>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                    {getPriorityBadge(insight.priority)}
                  </div>
                  
                  {insight.actionable && insight.suggestedActions && (
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">
                        Suggested Actions:
                      </div>
                      <div className="space-y-1">
                        {insight.suggestedActions.slice(0, 2).map((action, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="h-auto p-2 justify-start text-xs hover:bg-background/50"
                            onClick={() => onActionClick?.(insight, action)}
                          >
                            <ChevronRight className="h-3 w-3 mr-1" />
                            {action}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        
        {insights.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No insights yet. Keep learning to see AI-powered recommendations!</p>
          </div>
        )}
        
        {insights.length > 6 && (
          <Button variant="outline" className="w-full" size="sm">
            View All Insights ({insights.length})
          </Button>
        )}
      </CardContent>
    </Card>
  );
};