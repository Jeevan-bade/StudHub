import { useState } from "react";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { 
  Calendar as CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Users,
  AlertCircle,
  Target,
  Video,
  Edit,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CalendarSchedule() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [viewMode, setViewMode] = useState<"calendar" | "week">("week");

  const [events] = useState([
    {
      id: 1,
      title: "JavaScript Advanced Concepts",
      type: "study",
      date: new Date(),
      startTime: "09:00",
      endTime: "11:00",
      course: "Advanced JavaScript",
      description: "Deep dive into closures and prototypes",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "React Study Group",
      type: "group",
      date: new Date(),
      startTime: "14:00",
      endTime: "16:00",
      course: "React Best Practices",
      description: "Weekly discussion on React patterns",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Assignment: Database Design",
      type: "deadline",
      date: addDays(new Date(), 1),
      startTime: "23:59",
      endTime: "23:59",
      course: "Database Design",
      description: "Submit ER diagram and schema design",
      color: "bg-red-500"
    },
    {
      id: 4,
      title: "Weekly Goal Review",
      type: "goal",
      date: addDays(new Date(), 2),
      startTime: "10:00",
      endTime: "10:30",
      course: "Personal Development",
      description: "Review and set new learning goals",
      color: "bg-purple-500"
    },
    {
      id: 5,
      title: "Node.js Workshop",
      type: "workshop",
      date: addDays(new Date(), 3),
      startTime: "13:00",
      endTime: "17:00",
      course: "Node.js Fundamentals",
      description: "Hands-on Express.js development",
      color: "bg-orange-500"
    }
  ]);

  const [upcomingEvents] = useState([
    {
      id: 6,
      title: "Monthly Progress Review",
      type: "review",
      date: addDays(new Date(), 5),
      time: "15:00",
      course: "General"
    },
    {
      id: 7,
      title: "AI/ML Study Session",
      type: "study",
      date: addDays(new Date(), 7),
      time: "10:00",
      course: "Machine Learning Basics"
    }
  ]);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "study":
        return <BookOpen className="h-4 w-4" />;
      case "group":
        return <Users className="h-4 w-4" />;
      case "deadline":
        return <AlertCircle className="h-4 w-4" />;
      case "goal":
        return <Target className="h-4 w-4" />;
      case "workshop":
        return <Video className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const handleAddEvent = () => {
    toast({
      title: "Event Added",
      description: "Your study session has been scheduled successfully."
    });
    setIsAddingEvent(false);
  };

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentWeek(prev => addDays(prev, direction === "next" ? 7 : -7));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Calendar & Schedule
          </h1>
          <p className="text-muted-foreground">
            Plan your study sessions and track important deadlines
          </p>
        </div>

        {/* View Controls */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("week")}
                >
                  Week View
                </Button>
                <Button
                  variant={viewMode === "calendar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                >
                  Month View
                </Button>
              </div>

              <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Schedule New Event</DialogTitle>
                    <DialogDescription>
                      Add a study session, deadline, or goal to your calendar
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-title">Title</Label>
                      <Input id="event-title" placeholder="Enter event title..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-type">Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="study">Study Session</SelectItem>
                            <SelectItem value="group">Study Group</SelectItem>
                            <SelectItem value="deadline">Deadline</SelectItem>
                            <SelectItem value="goal">Goal Review</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-course">Course</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="javascript">Advanced JavaScript</SelectItem>
                            <SelectItem value="react">React Best Practices</SelectItem>
                            <SelectItem value="database">Database Design</SelectItem>
                            <SelectItem value="nodejs">Node.js Fundamentals</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input id="start-time" type="time" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-time">End Time</Label>
                        <Input id="end-time" type="time" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-description">Description</Label>
                      <Textarea 
                        id="event-description" 
                        placeholder="Add notes or details about this event..." 
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddEvent}>
                        Schedule Event
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Calendar/Week View */}
          <div className="lg:col-span-3 space-y-6">
            {viewMode === "week" ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Week of {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
                      </CardTitle>
                      <CardDescription>
                        Your weekly schedule overview
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((day) => {
                      const dayEvents = getEventsForDate(day);
                      return (
                        <div
                          key={day.toISOString()}
                          className={cn(
                            "p-3 rounded-lg border min-h-32",
                            isToday(day) ? "bg-primary/5 border-primary/20" : "bg-card"
                          )}
                        >
                          <div className="text-center mb-2">
                            <p className="text-xs text-muted-foreground">
                              {format(day, "EEE")}
                            </p>
                            <p className={cn(
                              "text-sm font-medium",
                              isToday(day) && "text-primary font-bold"
                            )}>
                              {format(day, "d")}
                            </p>
                          </div>
                          <div className="space-y-1">
                            {dayEvents.map((event) => (
                              <div
                                key={event.id}
                                className={cn(
                                  "p-1 rounded text-xs text-white cursor-pointer hover:opacity-80",
                                  event.color
                                )}
                              >
                                <div className="flex items-center gap-1">
                                  {getEventIcon(event.type)}
                                  <span className="truncate">{event.title}</span>
                                </div>
                                <p className="text-xs opacity-90">
                                  {event.startTime}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Monthly Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            )}

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>
                  {format(new Date(), "EEEE, MMMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getEventsForDate(new Date()).length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      No events scheduled for today
                    </p>
                  ) : (
                    getEventsForDate(new Date()).map((event) => (
                      <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                        <div className={cn("p-2 rounded-full text-white", event.color)}>
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.course}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.startTime} - {event.endTime}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>
                  Next few scheduled items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-2 rounded border bg-card/50">
                      <h5 className="font-medium text-sm">{event.title}</h5>
                      <p className="text-xs text-muted-foreground">{event.course}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <CalendarIcon className="h-3 w-3" />
                        {format(event.date, "MMM d")}
                        <Clock className="h-3 w-3 ml-2" />
                        {event.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Study Sessions</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Deadlines</span>
                    <Badge variant="destructive">1</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Group Sessions</span>
                    <Badge variant="secondary">2</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Hours</span>
                    <Badge>12h</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}