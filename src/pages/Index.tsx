import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StudHubLogo } from "@/components/StudHubLogo";
import { Link, useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  Brain, 
  Trophy, 
  Users, 
  Rocket,
  Star,
  BookOpen,
  Target
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Mentoring",
      description: "Get personalized learning guidance from your AI mentor"
    },
    {
      icon: Trophy,
      title: "Skill Scoring System",
      description: "Track your progress with our credit score-like skill system"
    },
    {
      icon: BookOpen,
      title: "Course Discovery",
      description: "Find the perfect courses for your learning journey"
    },
    {
      icon: Target,
      title: "Gamified Learning",
      description: "Earn points, unlock achievements, and level up your skills"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <StudHubLogo size="lg" variant="white" className="justify-center mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Your Learning Journey Starts Here
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Join thousands of students using AI-powered mentoring, skill scoring, and gamified learning to master new skills.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button variant="secondary" size="xl" className="font-bold">
                <Rocket className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="xl" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose StudHub?</h2>
            <p className="text-xl text-muted-foreground">Everything you need for successful learning in one platform</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="flex justify-center mb-6">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 text-warning fill-warning" />
              ))}
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students already accelerating their careers with StudHub
          </p>
          <Link to="/auth">
            <Button variant="hero" size="xl" className="font-bold">
              <GraduationCap className="mr-2 h-6 w-6" />
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
