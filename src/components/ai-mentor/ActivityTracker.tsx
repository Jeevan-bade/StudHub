import { useEffect } from 'react';
import { useAIMentor } from '@/hooks/useAIMentor';
import { toast } from 'sonner';

// This component automatically tracks user activities and logs them to the AI Mentor
export const ActivityTracker = () => {
  const { logActivity } = useAIMentor();

  useEffect(() => {
    // Simulate real-time activity tracking
    const trackActivity = () => {
      // In a real application, this would hook into actual user interactions
      // For demo purposes, we'll simulate some activities
      
      // Track page visits
      const handlePageView = () => {
        logActivity({
          type: 'study_session',
          details: {
            duration: Math.floor(Math.random() * 120) + 30, // 30-150 minutes
          },
          xpGained: 10
        });
      };

      // Track course interactions
      const handleCourseInteraction = () => {
        const courses = [
          'React Fundamentals',
          'JavaScript Advanced',
          'TypeScript Basics',
          'Node.js Development',
          'Database Design'
        ];
        
        const randomCourse = courses[Math.floor(Math.random() * courses.length)];
        
        // Simulate course completion occasionally
        if (Math.random() > 0.7) {
          logActivity({
            type: 'course_completion',
            details: {
              courseId: `course-${Math.random().toString(36).substr(2, 9)}`,
              courseName: randomCourse,
              score: Math.floor(Math.random() * 40) + 60, // 60-100%
              skillsImproved: ['JavaScript', 'React', 'Problem Solving']
            },
            xpGained: Math.floor(Math.random() * 100) + 50
          });
        } else {
          // Regular study session
          logActivity({
            type: 'study_session',
            details: {
              courseId: `course-${Math.random().toString(36).substr(2, 9)}`,
              courseName: randomCourse,
              duration: Math.floor(Math.random() * 60) + 15,
            },
            xpGained: Math.floor(Math.random() * 25) + 5
          });
        }
      };

      // Set up periodic activity simulation (for demo)
      const activityInterval = setInterval(() => {
        if (Math.random() > 0.8) {
          handleCourseInteraction();
        }
      }, 30000); // Every 30 seconds

      return () => clearInterval(activityInterval);
    };

    // Set up event listeners for real activity tracking
    const setupRealTracking = () => {
      // Track focus/blur to measure engagement
      let focusTime = Date.now();
      
      const handleFocus = () => {
        focusTime = Date.now();
      };
      
      const handleBlur = () => {
        const sessionDuration = Math.floor((Date.now() - focusTime) / 1000 / 60); // minutes
        if (sessionDuration > 5) { // Only log sessions longer than 5 minutes
          logActivity({
            type: 'study_session',
            details: {
              duration: sessionDuration,
            },
            xpGained: Math.min(sessionDuration * 2, 50) // Max 50 XP per session
          });
        }
      };

      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);
      
      return () => {
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('blur', handleBlur);
      };
    };

    const cleanupTracking = trackActivity();
    const cleanupRealTracking = setupRealTracking();

    return () => {
      cleanupTracking();
      cleanupRealTracking();
    };
  }, [logActivity]);

  return null; // This component doesn't render anything
};