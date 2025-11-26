import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  BookOpen, 
  Target,
  Sparkles,
  Brain,
  Zap,
  Award,
  Activity,
  BarChart3
} from "lucide-react";
import { useAIMentor } from "@/hooks/useAIMentor";
import { ProactiveNotifications } from "@/components/ai-mentor/ProactiveNotifications";
import { LearningInsights } from "@/components/ai-mentor/LearningInsights";
import { ActivityTracker } from "@/components/ai-mentor/ActivityTracker";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  suggestions?: string[];
}

const AIMentor = () => {
  const {
    activities,
    insights,
    notifications,
    learningProfile,
    logActivity,
    generateSuggestions,
    dismissNotification
  } = useAIMentor();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hi ${learningProfile.level > 5 ? 'Expert' : 'there'}! 👋 I'm your AI Mentor. I've been analyzing your learning patterns and I'm excited to help you on your journey! You're currently Level ${learningProfile.level} with ${learningProfile.totalXP} XP. What would you like to explore today?`,
      sender: "ai",
      timestamp: new Date(),
      suggestions: generateSuggestions()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string = currentMessage) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): Message => {
    // Log this interaction as an activity
    logActivity({
      type: 'study_session',
      details: {
        courseName: 'AI Mentor Chat',
        duration: 5
      },
      xpGained: 5
    });

    const responses = {
      "roadmap": {
        text: `Excellent! 🗺️ Based on your Level ${learningProfile.level} progress and ${learningProfile.currentStreak}-day streak, here's your personalized roadmap:\n\n📚 **Recommended Path:**\n1. Strengthen your ${learningProfile.weaknesses[0]} skills (identified weakness)\n2. Build on your ${learningProfile.strengths[0]} expertise\n3. Work towards: ${learningProfile.goals[0]}\n4. Join study groups for accountability\n\n🎯 **Timeline:** Customized for your ${learningProfile.studySchedule} study schedule\n\nShall I create specific milestones?`,
        suggestions: [
          "Create weekly milestones",
          "Find study group partners",
          "Suggest practice projects",
          "Set up learning reminders"
        ]
      },
      "recommend": {
        text: `Perfect! 🎯 Based on your ${activities.length} recent activities and Level ${learningProfile.level} status, here are my AI-powered recommendations:\n\n🌟 **Personalized for You:**\n• ${learningProfile.weaknesses[0]} Mastery Course (addresses your growth area)\n• Advanced ${learningProfile.strengths[0]} (build on your strength)\n• ${learningProfile.goals[0]} Bootcamp (aligns with your goals)\n\n💡 **Based on Your Patterns:**\n• Study Group for ${learningProfile.weaknesses[1]} (peer learning)\n• Evening courses (matches your ${learningProfile.studySchedule} preference)\n\nWhich recommendation excites you most?`,
        suggestions: [
          `Improve ${learningProfile.weaknesses[0]} skills`,
          `Master ${learningProfile.strengths[0]} further`,
          "Join a study group",
          "View my learning analytics"
        ]
      },
      "skills": {
        text: `Great question! 💪 Let me analyze your skill development based on your learning data:\n\n📊 **Your Strengths (AI Analysis):**\n${learningProfile.strengths.map(skill => `• ${skill} (Strong based on recent activities)`).join('\n')}\n\n🎯 **Growth Opportunities:**\n${learningProfile.weaknesses.map(skill => `• ${skill} (Focus area identified)`).join('\n')}\n\n🔥 **Your Progress:**\n• ${learningProfile.currentStreak}-day learning streak\n• Level ${learningProfile.level} achievement\n• ${learningProfile.totalXP} total XP earned\n\nReady to tackle ${learningProfile.weaknesses[0]}?`,
        suggestions: [
          `Master ${learningProfile.weaknesses[0]}`,
          `Practice ${learningProfile.weaknesses[1]}`,
          "View detailed analytics",
          "Set skill-based goals"
        ]
      },
      "career": {
        text: "Exciting! 🚀 Let me help you explore tech career paths that align with your interests and skills:\n\n💼 **Top Matches for You:**\n\n1. **Frontend Developer** (90% match)\n   - Focus: React, TypeScript, Modern CSS\n   - Salary Range: $70k-$120k\n   - Growth: High demand\n\n2. **Full-Stack Developer** (85% match)\n   - Focus: Frontend + Backend + Databases\n   - Salary Range: $80k-$140k\n   - Growth: Very high demand\n\n3. **UI/UX Developer** (75% match)\n   - Focus: Design + Frontend implementation\n   - Salary Range: $65k-$110k\n   - Growth: Growing field\n\nWhich path sounds most interesting to you?",
        suggestions: [
          "Learn more about frontend development",
          "Explore full-stack requirements",
          "UI/UX development details",
          "Compare all three paths"
        ]
      }
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("roadmap") || lowerMessage.includes("learning path")) {
      return {
        id: Date.now().toString(),
        text: responses.roadmap.text,
        sender: "ai",
        timestamp: new Date(),
        suggestions: responses.roadmap.suggestions
      };
    } else if (lowerMessage.includes("recommend") || lowerMessage.includes("suggest")) {
      return {
        id: Date.now().toString(),
        text: responses.recommend.text,
        sender: "ai",
        timestamp: new Date(),
        suggestions: responses.recommend.suggestions
      };
    } else if (lowerMessage.includes("skill") || lowerMessage.includes("improve")) {
      return {
        id: Date.now().toString(),
        text: responses.skills.text,
        sender: "ai",
        timestamp: new Date(),
        suggestions: responses.skills.suggestions
      };
    } else if (lowerMessage.includes("career") || lowerMessage.includes("job")) {
      return {
        id: Date.now().toString(),
        text: responses.career.text,
        sender: "ai",
        timestamp: new Date(),
        suggestions: responses.career.suggestions
      };
    }

    // Default response with personalized context
    return {
      id: Date.now().toString(),
      text: `That's a great question! 🤔 I understand you're asking about "${userMessage}". \n\nBased on your Level ${learningProfile.level} status and ${learningProfile.currentStreak}-day streak, here's my AI-powered insight:\n\n🎯 **Personalized Recommendations:**\n• Focus on ${learningProfile.goals[0]} (your main goal)\n• Practice ${learningProfile.weaknesses[0]} (growth opportunity)\n• Leverage your ${learningProfile.strengths[0]} skills\n• Consider ${learningProfile.studySchedule} study sessions\n\nI'm continuously learning from your activities to provide better guidance. What would you like to explore?`,
      sender: "ai",
      timestamp: new Date(),
      suggestions: generateSuggestions()
    };
  };

  const quickActions = [
    { icon: Target, text: "Create Learning Roadmap", color: "text-primary" },
    { icon: BookOpen, text: "Course Recommendations", color: "text-secondary" },
    { icon: Brain, text: "Skill Assessment", color: "text-success" },
    { icon: Award, text: "Career Guidance", color: "text-warning" },
    { icon: Activity, text: "View My Learning Analytics", color: "text-info" },
    { icon: BarChart3, text: "Achievement Progress", color: "text-purple-500" }
  ];

  // Handle insight actions
  const handleInsightAction = (insight: any, action: string) => {
    toast.success(`Taking action: ${action}`);
    // Simulate activity
    logActivity({
      type: 'study_session',
      details: { courseName: action, duration: 10 },
      xpGained: 15
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <ActivityTracker />
      <ProactiveNotifications 
        notifications={notifications} 
        onDismiss={dismissNotification}
      />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-full">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                AI Mentor
              </h1>
              <p className="text-muted-foreground">
                Your personal learning assistant powered by AI
              </p>
            </div>
          </div>
        </div>

        {/* Learning Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-gradient-primary text-primary-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold">{learningProfile.level}</div>
              <div className="text-sm opacity-90">Current Level</div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-secondary text-secondary-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold">{learningProfile.currentStreak}</div>
              <div className="text-sm opacity-90">Day Streak</div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-success text-success-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold">{learningProfile.totalXP.toLocaleString()}</div>
              <div className="text-sm opacity-90">Total XP</div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-warning text-warning-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold">{activities.length}</div>
              <div className="text-sm opacity-90">Activities</div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto flex-col gap-2 p-4 hover:shadow-md transition-all duration-200"
                onClick={() => handleSendMessage(action.text)}
              >
                <Icon className={`h-5 w-5 ${action.color}`} />
                <span className="text-xs text-center">{action.text}</span>
              </Button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <Card className="lg:col-span-2 shadow-card">
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.sender === "ai" && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] space-y-2 ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`rounded-lg p-3 whitespace-pre-wrap ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-muted"
                        }`}
                      >
                        {message.text}
                      </div>
                      
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => handleSendMessage(suggestion)}
                            >
                              <Lightbulb size={12} className="mr-1" />
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>

                    {message.sender === "user" && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-secondary-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-lg p-3 flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ask your AI mentor anything about learning, courses, or career guidance..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 min-h-[60px] resize-none"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!currentMessage.trim()}
                    variant="gamified"
                    size="lg"
                    className="self-end"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* AI Learning Insights */}
            <LearningInsights 
              insights={insights} 
              onActionClick={handleInsightAction}
            />

            {/* Learning Profile Summary */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Your Learning Profile
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <p className="text-sm font-medium text-primary">Strengths</p>
                    <p className="text-xs text-muted-foreground">{learningProfile.strengths.join(', ')}</p>
                  </div>
                  <div className="p-3 bg-warning/10 rounded-md">
                    <p className="text-sm font-medium text-warning">Focus Areas</p>
                    <p className="text-xs text-muted-foreground">{learningProfile.weaknesses.join(', ')}</p>
                  </div>
                  <div className="p-3 bg-success/10 rounded-md">
                    <p className="text-sm font-medium text-success">Goals</p>
                    <p className="text-xs text-muted-foreground">{learningProfile.goals[0]}</p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-md">
                    <p className="text-sm font-medium text-secondary">Study Style</p>
                    <p className="text-xs text-muted-foreground">
                      {learningProfile.preferredLearningStyle} learner, {learningProfile.studySchedule} sessions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-2">
                  {activities.slice(0, 5).map((activity, index) => (
                    <div key={activity.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                      <Activity className="h-3 w-3 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-xs font-medium capitalize">{activity.type.replace('_', ' ')}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.details.courseName || 'General activity'}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        +{activity.xpGained} XP
                      </Badge>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      Start learning to see your activity here!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMentor;