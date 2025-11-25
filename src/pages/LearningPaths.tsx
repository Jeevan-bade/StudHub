import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, CheckCircle, Lock, ArrowRight } from "lucide-react";

export default function LearningPaths() {
  const [paths] = useState([
    {
      id: 1,
      title: "Full Stack JavaScript Developer",
      description: "Complete path from frontend to backend development",
      courses: 8,
      totalHours: 120,
      students: 1250,
      progress: 45,
      difficulty: "Intermediate",
      status: "In Progress"
    },
    {
      id: 2,
      title: "React Specialist",
      description: "Master React development and ecosystem",
      courses: 6,
      totalHours: 80,
      students: 890,
      progress: 80,
      difficulty: "Advanced",
      status: "Nearly Complete"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Learning Paths
          </h1>
          <p className="text-muted-foreground">Structured sequences to achieve your learning goals</p>
        </div>

        <div className="grid gap-6">
          {paths.map((path) => (
            <Card key={path.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                    <CardDescription className="mt-2">{path.description}</CardDescription>
                  </div>
                  <Badge variant={path.difficulty === "Advanced" ? "default" : "secondary"}>
                    {path.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{path.courses} courses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{path.totalHours} hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{path.students} students</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} />
                </div>

                <div className="flex justify-between items-center">
                  <Badge variant="outline">{path.status}</Badge>
                  <Button>
                    Continue Path <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}