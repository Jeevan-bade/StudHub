import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Camera, Mail, Phone, MapPin, Calendar, BookOpen, Trophy, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSecureForm } from "@/hooks/useSecureForm";
import { profileSchema, sanitizeText } from "@/lib/security";

export default function Profile() {
  const { toast } = useToast();
  const [initialProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate learner focused on web development and AI. Always eager to explore new technologies and collaborate with fellow developers.",
    joinDate: "January 2024"
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    courseReminders: true,
    publicProfile: false,
    showProgress: true
  });

  const profileForm = useSecureForm({
    schema: profileSchema,
    rateLimitKey: 'profile-update',
    sanitizeFields: ['name', 'location', 'bio'],
    onSubmit: async (data) => {
      // Here you would typically send the data to your backend
      console.log('Secure profile data:', data);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved securely."
      });
    }
  });

  // Initialize form with existing data
  useState(() => {
    const profileFields = ['name', 'email', 'phone', 'location', 'bio'] as const;
    profileFields.forEach((key) => {
      if (initialProfile[key]) {
        profileForm.updateField(key, initialProfile[key]);
      }
    });
  });

  const handleSavePreferences = () => {
    // Validate preferences before saving
    const sanitizedPreferences = {
      ...preferences,
      // Ensure boolean values are actually booleans
      emailNotifications: Boolean(preferences.emailNotifications),
      pushNotifications: Boolean(preferences.pushNotifications),
      weeklyDigest: Boolean(preferences.weeklyDigest),
      courseReminders: Boolean(preferences.courseReminders),
      publicProfile: Boolean(preferences.publicProfile),
      showProgress: Boolean(preferences.showProgress)
    };
    
    console.log('Secure preferences data:', sanitizedPreferences);
    toast({
      title: "Preferences Updated",
      description: "Your notification and privacy preferences have been saved securely."
    });
  };

  const stats = [
    { icon: BookOpen, label: "Courses Completed", value: "12" },
    { icon: Trophy, label: "Achievements", value: "8" },
    { icon: Users, label: "Study Groups", value: "3" },
    { icon: Calendar, label: "Days Active", value: "45" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            User Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and public profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-lg">AJ</AvatarFallback>
                    </Avatar>
                    <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">{sanitizeText(profileForm.data.name || initialProfile.name)}</h3>
                    <p className="text-sm text-muted-foreground">Member since {initialProfile.joinDate}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileForm.data.name || ''}
                      onChange={(e) => profileForm.updateField('name', e.target.value)}
                      maxLength={100}
                      required
                    />
                    {profileForm.errors.name && (
                      <p className="text-sm text-destructive">{profileForm.errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.data.email || ''}
                      onChange={(e) => profileForm.updateField('email', e.target.value)}
                      maxLength={254}
                      required
                    />
                    {profileForm.errors.email && (
                      <p className="text-sm text-destructive">{profileForm.errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileForm.data.phone || ''}
                      onChange={(e) => profileForm.updateField('phone', e.target.value)}
                      maxLength={20}
                    />
                    {profileForm.errors.phone && (
                      <p className="text-sm text-destructive">{profileForm.errors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileForm.data.location || ''}
                      onChange={(e) => profileForm.updateField('location', e.target.value)}
                      maxLength={100}
                    />
                    {profileForm.errors.location && (
                      <p className="text-sm text-destructive">{profileForm.errors.location}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileForm.data.bio || ''}
                    onChange={(e) => profileForm.updateField('bio', e.target.value)}
                    maxLength={500}
                    rows={3}
                  />
                  {profileForm.errors.bio && (
                    <p className="text-sm text-destructive">{profileForm.errors.bio}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {(profileForm.data.bio || '').length}/500 characters
                  </p>
                </div>

                <Button 
                  onClick={profileForm.handleSubmit} 
                  className="w-full"
                  disabled={profileForm.isSubmitting}
                >
                  {profileForm.isSubmitting ? 'Saving...' : 'Save Profile Changes'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Statistics</CardTitle>
                <CardDescription>Your learning progress overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center space-y-2">
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive course updates and important announcements
                    </p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get real-time notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, pushNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of your learning progress
                    </p>
                  </div>
                  <Switch
                    checked={preferences.weeklyDigest}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, weeklyDigest: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Course Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded about upcoming deadlines and sessions
                    </p>
                  </div>
                  <Switch
                    checked={preferences.courseReminders}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, courseReminders: checked })
                    }
                  />
                </div>

                <Button onClick={handleSavePreferences} className="w-full">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control who can see your information and activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow other users to view your profile and learning progress
                    </p>
                  </div>
                  <Switch
                    checked={preferences.publicProfile}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, publicProfile: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Progress</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your course completion and achievements publicly
                    </p>
                  </div>
                  <Switch
                    checked={preferences.showProgress}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, showProgress: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Data Management</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Export Learning History
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      Delete Account
                    </Button>
                  </div>
                </div>

                <Button onClick={handleSavePreferences} className="w-full">
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Security Features</h4>
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label>Input Validation</Label>
                        <p className="text-sm text-muted-foreground">
                          All form inputs are validated and sanitized
                        </p>
                      </div>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label>XSS Protection</Label>
                        <p className="text-sm text-muted-foreground">
                          Content Security Policy and input sanitization active
                        </p>
                      </div>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label>Rate Limiting</Label>
                        <p className="text-sm text-muted-foreground">
                          Form submissions are rate-limited to prevent abuse
                        </p>
                      </div>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label>Secure Headers</Label>
                        <p className="text-sm text-muted-foreground">
                          Security headers prevent common attacks
                        </p>
                      </div>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Account Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Enable Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Review Login Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}