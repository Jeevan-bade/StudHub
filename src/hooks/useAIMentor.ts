import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface StudentActivity {
  id: string;
  type: 'course_completion' | 'quiz_completed' | 'study_session' | 'achievement_earned' | 'streak_milestone';
  timestamp: Date;
  details: {
    courseId?: string;
    courseName?: string;
    score?: number;
    duration?: number;
    skillsImproved?: string[];
    achievementId?: string;
    streakDays?: number;
  };
  xpGained: number;
}

export interface LearningInsight {
  id: string;
  type: 'strength' | 'weakness' | 'recommendation' | 'achievement';
  title: string;
  description: string;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
  suggestedActions?: string[];
}

export interface ProactiveNotification {
  id: string;
  type: 'achievement' | 'suggestion' | 'encouragement' | 'milestone';
  title: string;
  message: string;
  timestamp: Date;
  actions?: { label: string; action: () => void }[];
  autoShow: boolean;
}

export const useAIMentor = () => {
  const [activities, setActivities] = useState<StudentActivity[]>([]);
  const [insights, setInsights] = useState<LearningInsight[]>([]);
  const [notifications, setNotifications] = useState<ProactiveNotification[]>([]);
  const [learningProfile, setLearningProfile] = useState({
    strengths: ['JavaScript', 'React'],
    weaknesses: ['Testing', 'System Design'],
    preferredLearningStyle: 'visual',
    studySchedule: 'evening',
    goals: ['Become Full-Stack Developer', 'Master TypeScript'],
    currentStreak: 15,
    totalXP: 2450,
    level: 8
  });

  // Log student activity and trigger AI analysis
  const logActivity = useCallback((activity: Omit<StudentActivity, 'id' | 'timestamp'>) => {
    const newActivity: StudentActivity = {
      ...activity,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };

    setActivities(prev => [newActivity, ...prev.slice(0, 49)]); // Keep last 50 activities
    
    // Trigger AI analysis for insights and notifications
    analyzeActivityForInsights(newActivity);
    checkForAchievements(newActivity);
  }, []);

  // AI analysis of activities to generate insights
  const analyzeActivityForInsights = useCallback((activity: StudentActivity) => {
    const newInsights: LearningInsight[] = [];

    // Analyze based on activity type
    switch (activity.type) {
      case 'course_completion':
        if (activity.details.score && activity.details.score > 85) {
          newInsights.push({
            id: crypto.randomUUID(),
            type: 'strength',
            title: 'Excellent Performance',
            description: `You scored ${activity.details.score}% in ${activity.details.courseName}. This shows strong understanding!`,
            actionable: true,
            priority: 'medium',
            suggestedActions: ['Take advanced course in this topic', 'Help others in study groups']
          });
        } else if (activity.details.score && activity.details.score < 70) {
          newInsights.push({
            id: crypto.randomUUID(),
            type: 'weakness',
            title: 'Room for Improvement',
            description: `Your score of ${activity.details.score}% suggests this topic needs more practice.`,
            actionable: true,
            priority: 'high',
            suggestedActions: ['Review course materials', 'Practice with additional exercises', 'Join study group']
          });
        }
        break;

      case 'study_session':
        if (activity.details.duration && activity.details.duration > 120) {
          newInsights.push({
            id: crypto.randomUUID(),
            type: 'recommendation',
            title: 'Long Study Session Detected',
            description: 'You studied for over 2 hours. Consider taking breaks every 45-60 minutes for better retention.',
            actionable: true,
            priority: 'medium',
            suggestedActions: ['Use Pomodoro technique', 'Schedule breaks', 'Stay hydrated']
          });
        }
        break;
    }

    if (newInsights.length > 0) {
      setInsights(prev => [...newInsights, ...prev.slice(0, 19)]); // Keep last 20 insights
    }
  }, []);

  // Check for achievements and trigger notifications
  const checkForAchievements = useCallback((activity: StudentActivity) => {
    const notifications: ProactiveNotification[] = [];

    // Course completion achievements
    if (activity.type === 'course_completion') {
      notifications.push({
        id: crypto.randomUUID(),
        type: 'achievement',
        title: '🎉 Course Completed!',
        message: `Congratulations! You've completed ${activity.details.courseName}. You earned ${activity.xpGained} XP!`,
        timestamp: new Date(),
        actions: [
          { label: 'Continue Learning Path', action: () => toast.success('Navigating to next course...') },
          { label: 'Share Achievement', action: () => toast.success('Achievement shared!') }
        ],
        autoShow: true
      });

      // Check for streak milestones
      if (learningProfile.currentStreak % 7 === 0) {
        notifications.push({
          id: crypto.randomUUID(),
          type: 'milestone',
          title: '🔥 Weekly Streak!',
          message: `Amazing! You've maintained a ${learningProfile.currentStreak}-day learning streak!`,
          timestamp: new Date(),
          actions: [
            { label: 'View Achievements', action: () => toast.success('Opening achievements...') }
          ],
          autoShow: true
        });
      }
    }

    // Level up notifications
    if (activity.xpGained > 0) {
      const newTotalXP = learningProfile.totalXP + activity.xpGained;
      const newLevel = Math.floor(newTotalXP / 300) + 1;
      
      if (newLevel > learningProfile.level) {
        notifications.push({
          id: crypto.randomUUID(),
          type: 'achievement',
          title: '⭐ Level Up!',
          message: `Congratulations! You've reached Level ${newLevel}! Your dedication is paying off.`,
          timestamp: new Date(),
          actions: [
            { label: 'View Profile', action: () => toast.success('Opening profile...') },
            { label: 'Claim Rewards', action: () => toast.success('Rewards claimed!') }
          ],
          autoShow: true
        });
        
        setLearningProfile(prev => ({ ...prev, level: newLevel, totalXP: newTotalXP }));
      } else {
        setLearningProfile(prev => ({ ...prev, totalXP: newTotalXP }));
      }
    }

    if (notifications.length > 0) {
      setNotifications(prev => [...notifications, ...prev]);
      
      // Auto-show notifications after a short delay
      notifications.forEach(notification => {
        if (notification.autoShow) {
          setTimeout(() => {
            showProactiveNotification(notification);
          }, 1000);
        }
      });
    }
  }, [learningProfile]);

  // Show proactive notification as toast
  const showProactiveNotification = useCallback((notification: ProactiveNotification) => {
    toast.success(notification.message, {
      description: notification.title,
      action: notification.actions?.[0] ? {
        label: notification.actions[0].label,
        onClick: notification.actions[0].action,
      } : undefined,
      duration: 6000,
    });
  }, []);

  // Generate learning suggestions based on patterns
  const generateSuggestions = useCallback((): string[] => {
    const suggestions: string[] = [];
    
    // Time-based suggestions
    const currentHour = new Date().getHours();
    if (currentHour >= 18 && currentHour <= 22 && learningProfile.studySchedule === 'evening') {
      suggestions.push("It's your prime study time! Ready to dive into some learning?");
    }

    // Streak-based suggestions
    if (learningProfile.currentStreak > 10) {
      suggestions.push("Your streak is impressive! Consider tackling a challenging topic today.");
    }

    // Weakness-based suggestions
    learningProfile.weaknesses.forEach(weakness => {
      suggestions.push(`Ready to strengthen your ${weakness} skills? I have some great resources!`);
    });

    // Goal-based suggestions
    suggestions.push(`Let's work towards your goal: ${learningProfile.goals[0]}`);

    return suggestions.slice(0, 3); // Return top 3 suggestions
  }, [learningProfile]);

  // Dismiss notification
  const dismissNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  return {
    activities,
    insights,
    notifications,
    learningProfile,
    logActivity,
    generateSuggestions,
    dismissNotification,
    showProactiveNotification
  };
};