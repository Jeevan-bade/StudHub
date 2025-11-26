import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  CheckCircle, 
  Lock, 
  Clock, 
  BookOpen, 
  Award,
  Download,
  Star,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { useState } from "react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  type: "video" | "quiz" | "assignment" | "reading";
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  progress: number;
}

interface CourseProgressProps {
  courseTitle: string;
  instructor: string;
  overallProgress: number;
  modules: Module[];
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  certificate?: {
    available: boolean;
    downloadUrl?: string;
  };
}

export const CourseProgress = ({ 
  courseTitle, 
  instructor, 
  overallProgress, 
  modules, 
  isBookmarked,
  onBookmarkToggle,
  certificate 
}: CourseProgressProps) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonIcon = (lesson: Lesson) => {
    if (lesson.locked) return <Lock className="h-4 w-4 text-muted-foreground" />;
    if (lesson.completed) return <CheckCircle className="h-4 w-4 text-success" />;
    return <Play className="h-4 w-4 text-primary" />;
  };

  const getTotalLessons = () => modules.reduce((total, module) => total + module.lessons.length, 0);
  const getCompletedLessons = () => modules.reduce((total, module) => 
    total + module.lessons.filter(lesson => lesson.completed).length, 0
  );

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <Card className="bg-gradient-card border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{courseTitle}</CardTitle>
              <p className="text-muted-foreground">by {instructor}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onBookmarkToggle}
              className="flex items-center gap-2"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Overall Progress</span>
              <span className="text-2xl font-bold text-primary">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{getCompletedLessons()} of {getTotalLessons()} lessons completed</span>
              <span>{getTotalLessons() - getCompletedLessons()} remaining</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{modules.length}</div>
              <div className="text-sm text-muted-foreground">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{getTotalLessons()}</div>
              <div className="text-sm text-muted-foreground">Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {modules.reduce((total, module) => total + module.lessons.length * 15, 0)}m
              </div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
          </div>

          {/* Certificate */}
          {certificate?.available && (
            <div className="bg-gradient-success p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-success-foreground" />
                  <div>
                    <h4 className="font-semibold text-success-foreground">Certificate Available!</h4>
                    <p className="text-sm text-success-foreground/80">
                      Congratulations on completing this course
                    </p>
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modules */}
      <div className="space-y-4">
        {modules.map((module) => (
          <Card key={module.id} className="overflow-hidden">
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleModule(module.id)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{module.lessons.length} lessons</span>
                    <span>{module.lessons.filter(l => l.completed).length} completed</span>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge variant="outline">{Math.round(module.progress)}%</Badge>
                  <Progress value={module.progress} className="w-24 h-2" />
                </div>
              </div>
            </CardHeader>
            
            {expandedModules.has(module.id) && (
              <CardContent className="space-y-2 border-t">
                {module.lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      lesson.locked 
                        ? 'opacity-50 cursor-not-allowed' 
                        : lesson.completed
                        ? 'bg-success/10 border-success/20'
                        : 'hover:bg-muted/50 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getLessonIcon(lesson)}
                      <div>
                        <h5 className="font-medium">{lesson.title}</h5>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{lesson.duration}</span>
                          <Badge variant="outline" className="text-xs">
                            {lesson.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {!lesson.locked && (
                      <Button 
                        variant={lesson.completed ? "secondary" : "default"}
                        size="sm"
                      >
                        {lesson.completed ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Review
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};