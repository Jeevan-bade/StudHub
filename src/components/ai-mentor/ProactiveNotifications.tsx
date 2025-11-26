import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Bell, Lightbulb, Award, TrendingUp } from 'lucide-react';
import { ProactiveNotification } from '@/hooks/useAIMentor';

interface ProactiveNotificationsProps {
  notifications: ProactiveNotification[];
  onDismiss: (id: string) => void;
}

export const ProactiveNotifications = ({ notifications, onDismiss }: ProactiveNotificationsProps) => {
  const [visibleNotifications, setVisibleNotifications] = useState<ProactiveNotification[]>([]);

  useEffect(() => {
    // Show new notifications with animation delay
    const newNotifications = notifications.filter(
      n => !visibleNotifications.find(v => v.id === n.id)
    );
    
    newNotifications.forEach((notification, index) => {
      setTimeout(() => {
        setVisibleNotifications(prev => [notification, ...prev]);
      }, index * 500);
    });
  }, [notifications]);

  const getNotificationIcon = (type: ProactiveNotification['type']) => {
    switch (type) {
      case 'achievement': return Award;
      case 'suggestion': return Lightbulb;
      case 'encouragement': return TrendingUp;
      case 'milestone': return Award;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: ProactiveNotification['type']) => {
    switch (type) {
      case 'achievement': return 'border-primary bg-primary/5';
      case 'suggestion': return 'border-secondary bg-secondary/5';
      case 'encouragement': return 'border-success bg-success/5';
      case 'milestone': return 'border-warning bg-warning/5';
      default: return 'border-muted bg-muted/5';
    }
  };

  const handleDismiss = (notification: ProactiveNotification) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== notification.id));
    setTimeout(() => onDismiss(notification.id), 300);
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50 space-y-3 max-w-sm">
      {visibleNotifications.slice(0, 3).map((notification) => {
        const Icon = getNotificationIcon(notification.type);
        
        return (
          <Card 
            key={notification.id}
            className={`animate-slide-in-right shadow-lg border-2 ${getNotificationColor(notification.type)}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-destructive/10"
                      onClick={() => handleDismiss(notification)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {notification.actions && notification.actions.length > 0 && (
                    <div className="flex gap-2">
                      {notification.actions.slice(0, 2).map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => {
                            action.action();
                            handleDismiss(notification);
                          }}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {notification.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {notification.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {visibleNotifications.length > 3 && (
        <Card className="border-dashed">
          <CardContent className="p-3 text-center">
            <p className="text-xs text-muted-foreground">
              +{visibleNotifications.length - 3} more notifications
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs mt-1"
              onClick={() => setVisibleNotifications(prev => prev.slice(3))}
            >
              Show All
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};