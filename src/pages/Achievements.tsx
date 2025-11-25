import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, Star, Download, Calendar, Target, Zap, BookOpen } from "lucide-react";

export default function Achievements() {
  const [achievements] = useState([
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first course lesson",
      icon: BookOpen,
      color: "bg-blue-500",
      earned: true,
      earnedDate: "2024-01-15",
      points: 50
    },
    {
      id: 2,
      title: "Speed Learner",
      description: "Complete 5 lessons in one day",
      icon: Zap,
      color: "bg-yellow-500",
      earned: true,
      earnedDate: "2024-01-20",
      points: 100
    },
    {
      id: 3,
      title: "Course Master",
      description: "Complete an entire course",
      icon: Trophy,
      color: "bg-gold-500",
      earned: false,
      progress: 75,
      points: 500
    }
  ]);

  const [certificates] = useState([
    {
      id: 1,
      course: "Advanced JavaScript Concepts",
      instructor: "Sarah Chen",
      completedDate: "2024-01-25",
      grade: "A+",
      credentialId: "JS-ADV-2024-001"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Achievements & Certificates
          </h1>
          <p className="text-muted-foreground">Track your learning milestones and accomplishments</p>
        </div>

        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements">
            <div className="grid gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={achievement.earned ? "border-primary/50" : ""}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${achievement.color} ${!achievement.earned ? "opacity-50" : ""}`}>
                        <achievement.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {achievement.earned ? (
                          <Badge className="mt-2">Earned on {achievement.earnedDate}</Badge>
                        ) : (
                          <Progress value={achievement.progress || 0} className="mt-2" />
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{achievement.points} XP</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certificates">
            <div className="grid gap-4">
              {certificates.map((cert) => (
                <Card key={cert.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{cert.course}</h3>
                        <p className="text-sm text-muted-foreground">by {cert.instructor}</p>
                        <p className="text-sm">Completed: {cert.completedDate} | Grade: {cert.grade}</p>
                      </div>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}