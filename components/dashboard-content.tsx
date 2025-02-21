import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Trophy,
  Code,
  Zap,
  BookOpen,
  Star,
  Award,
  Users,
  Gamepad,
  Terminal,
  Brain,
  Lock,
  GraduationCap,
  Clock,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface DashboardContentProps {
  userName: string
}

interface Training {
  id: number
  title: string
  description: string
  duration: string
  level: string
}

interface EnrolledTraining extends Training {
  progress: number
}

export default function DashboardContent({ userName }: DashboardContentProps) {
  // Simulated user data
  const user = {
    name: userName || "Coder",
    level: 5,
    xp: 2500,
    nextLevelXp: 5000,
    avatar: "/placeholder.svg?height=100&width=100",
  }

  // Simulated challenge data
  const challenges = [
    { id: 1, title: "Python Basics", type: "coding", difficulty: "Easy", xp: 50 },
    { id: 2, title: "JavaScript Arrays", type: "debugging", difficulty: "Medium", xp: 100 },
    { id: 3, title: "HTML/CSS Quiz", type: "quiz", difficulty: "Easy", xp: 75 },
  ]

  // Simulated unlocked courses
  const unlockedCourses = [
    { id: 1, title: "Intro to Python", progress: 60, totalLessons: 10, completedLessons: 6 },
    { id: 2, title: "JavaScript Fundamentals", progress: 30, totalLessons: 12, completedLessons: 4 },
  ]

  // Simulated leaderboard data
  const leaderboard = [
    { name: "Alice", xp: 5000, avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Bob", xp: 4500, avatar: "/placeholder.svg?height=40&width=40" },
    { name: "Charlie", xp: 4000, avatar: "/placeholder.svg?height=40&width=40" },
  ]

  // Add games data
  const games = [
    {
      id: 1,
      title: "Algorithm Arena",
      description: "Battle through algorithmic challenges in real-time",
      icon: <Terminal className="w-8 h-8 text-purple-500" />,
      difficulty: "Medium",
    },
    {
      id: 2,
      title: "Code Puzzle",
      description: "Solve coding puzzles and unlock new levels",
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      difficulty: "Easy",
    },
    {
      id: 3,
      title: "Debug Master",
      description: "Find and fix bugs in increasingly complex code",
      icon: <Code className="w-8 h-8 text-green-500" />,
      difficulty: "Hard",
    },
  ]

  // Add training data
  const [availableTrainings, setAvailableTrainings] = useState<Training[]>([
    {
      id: 1,
      title: "Data Structures Mastery",
      description: "Learn essential data structures for efficient coding",
      duration: "4 weeks",
      level: "Intermediate",
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      description: "Comprehensive course on modern web development",
      duration: "8 weeks",
      level: "Beginner to Advanced",
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      description: "Introduction to machine learning algorithms and applications",
      duration: "6 weeks",
      level: "Advanced",
    },
  ])

  const [enrolledTrainings, setEnrolledTrainings] = useState<EnrolledTraining[]>([])

  const handleEnroll = (training: Training) => {
    setEnrolledTrainings([...enrolledTrainings, { ...training, progress: 0 }])
    setAvailableTrainings(availableTrainings.filter((t) => t.id !== training.id))
    toast({
      title: "Enrolled Successfully",
      description: `You have enrolled in ${training.title}`,
    })
    // Navigate to the specific training page
    if (training.id === 1) {
      // Assuming Data Structures Mastery has id 1
      window.location.href = "/training/data-structures-mastery"
    }
  }

  const handleUpdateProgress = (trainingId: number, newProgress: number) => {
    setEnrolledTrainings(enrolledTrainings.map((t) => (t.id === trainingId ? { ...t, progress: newProgress } : t)))
    toast({
      title: "Progress Updated",
      description: `Your progress has been updated to ${newProgress}%`,
    })
  }

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 mb-8">
        <div className="flex items-center mb-4">
          <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-20 h-20 rounded-full mr-4" />
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-xl">Ready to level up your coding skills?</p>
          </div>
        </div>
        <div className="bg-white/20 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span>Level {user.level}</span>
            <span>
              {user.xp} / {user.nextLevelXp} XP
            </span>
          </div>
          <Progress value={(user.xp / user.nextLevelXp) * 100} className="w-full h-3" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Achievements Section */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  <Award className="w-8 h-8 text-gray-400" />
                </div>
                <span className="text-sm text-gray-600">Achievement {i + 1}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-6 h-6 text-purple-500 mr-2" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Challenges Completed</span>
                <Badge variant="secondary">15</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Courses Unlocked</span>
                <Badge variant="secondary">2</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Coding Streak</span>
                <Badge variant="secondary">7 days</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Challenges Section */}
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Star className="w-6 h-6 text-yellow-500 mr-2" />
        Available Challenges
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="overflow-hidden">
            <div
              className={`h-2 ${
                challenge.difficulty === "Easy"
                  ? "bg-green-500"
                  : challenge.difficulty === "Medium"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            />
            <CardHeader>
              <CardTitle>{challenge.title}</CardTitle>
              <CardDescription>{challenge.type} challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Badge variant="outline">{challenge.difficulty}</Badge>
                <span className="text-sm font-semibold">{challenge.xp} XP</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/challenge/${challenge.id}`}>Start Challenge</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Courses Section */}
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
        Your Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {unlockedCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>
                {course.completedLessons} of {course.totalLessons} lessons completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={course.progress} className="w-full h-3 mb-2" />
              <span className="text-sm text-gray-500">{course.progress}% complete</span>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/course/${course.id}`}>Continue Course</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        <Card className="flex flex-col justify-center items-center p-6">
          <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
          <CardTitle className="text-center mb-2">Unlock New Courses</CardTitle>
          <CardDescription className="text-center">Complete challenges to unlock more courses</CardDescription>
        </Card>
      </div>

      {/* Training Courses with Games Section */}
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Gamepad className="w-6 h-6 text-green-500 mr-2" />
        Training Courses with Games
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            id: 1,
            title: "Data Structures Adventure",
            description: "Learn data structures through interactive games",
            progress: 40,
          },
          {
            id: 2,
            title: "Algorithm Quest",
            description: "Master algorithms with fun coding challenges",
            progress: 25,
          },
          { id: 3, title: "Web Dev Warrior", description: "Build web apps while playing engaging games", progress: 60 },
        ].map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={course.progress} className="w-full h-3 mb-2" />
              <span className="text-sm text-gray-500">{course.progress}% complete</span>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/training-course/${course.id}`}>Continue Course</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        <Card key="pyramid-loop">
          <CardHeader>
            <CardTitle>Pyramid Loop Visualizer</CardTitle>
            <CardDescription>Master nested loops by creating various star patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={0} className="w-full h-3 mb-2" />
            <span className="text-sm text-gray-500">New course</span>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/training-course/pyramid-loop">Start Course</Link>
            </Button>
          </CardFooter>
        </Card>
        {/* In the "Training Courses with Games" section, add a new card for the King vs Error Monster game */}
        <Card key="king-vs-error">
          <CardHeader>
            <CardTitle>King vs Error Monster</CardTitle>
            <CardDescription>Defeat the Error Monster by writing clean, error-free code</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={0} className="w-full h-3 mb-2" />
            <span className="text-sm text-gray-500">New course</span>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/training-course/king-vs-error">Start Course</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Games Section */}
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Gamepad className="w-6 h-6 text-indigo-500 mr-2" />
        Featured Games
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {games.map((game) => (
          <Link href={`/game/${game.id}`} key={game.id}>
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-lg bg-gray-100/50 backdrop-blur-sm">{game.icon}</div>
                  <Badge
                    variant={
                      game.difficulty === "Easy"
                        ? "secondary"
                        : game.difficulty === "Medium"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {game.difficulty}
                  </Badge>
                </div>
                <CardTitle className="mt-4">{game.title}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <Button className="w-full group-hover:bg-primary/90 transition-colors">Play Now</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
        <Link href="/programming-games">
          <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-center items-center p-6">
            <div className="p-3 rounded-lg bg-gray-100/50 backdrop-blur-sm mb-4">
              <Gamepad className="w-8 h-8 text-indigo-500" />
            </div>
            <CardTitle className="text-center mb-2">Programming Games Dashboard</CardTitle>
            <CardDescription className="text-center">Explore all coding games and challenges</CardDescription>
            <Button className="mt-4 w-full">View All Games</Button>
          </Card>
        </Link>
      </div>

      {/* Enrolled Training Section */}
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <GraduationCap className="w-6 h-6 text-green-500 mr-2" />
        Your Enrolled Training Programs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {enrolledTrainings.map((training) => (
          <Card key={training.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-gray-100/50 backdrop-blur-sm">
                  <GraduationCap className="w-8 h-8 text-green-500" />
                </div>
                <Badge variant="outline">{training.level}</Badge>
              </div>
              <CardTitle className="mt-4">{training.title}</CardTitle>
              <CardDescription>{training.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Clock className="w-4 h-4 mr-1" />
                Duration: {training.duration}
              </div>
              <Progress value={training.progress} className="w-full h-3 mb-2" />
              <span className="text-sm text-gray-500">{training.progress}% complete</span>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full group-hover:bg-primary/90 transition-colors"
                onClick={() => handleUpdateProgress(training.id, Math.min(training.progress + 10, 100))}
              >
                Update Progress
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Available Training Section */}
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <GraduationCap className="w-6 h-6 text-blue-500 mr-2" />
        Available Training Programs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {availableTrainings.map((training) => (
          <Card key={training.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-gray-100/50 backdrop-blur-sm">
                  <GraduationCap className="w-8 h-8 text-blue-500" />
                </div>
                <Badge variant="outline">{training.level}</Badge>
              </div>
              <CardTitle className="mt-4">{training.title}</CardTitle>
              <CardDescription>{training.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                Duration: {training.duration}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                <Link href="/training/data-structures-mastery">View Course</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Leaderboard Section */}
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Users className="w-6 h-6 text-green-500 mr-2" />
        Leaderboard
      </h2>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <div key={user.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-4">{index + 1}</span>
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <span className="font-semibold">{user.name}</span>
                </div>
                <Badge variant="secondary">{user.xp} XP</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Locked Boxes Section */}
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Lock className="w-6 h-6 text-orange-500 mr-2" />
        Locked Boxes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2 text-orange-500" />
                Bronze Box
              </CardTitle>
              <Badge variant="secondary">Locked</Badge>
            </div>
            <CardDescription>Reach Level 10 to unlock special rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={50} className="mb-2" />
            <p className="text-sm text-muted-foreground">Level 5/10</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>
              <Lock className="w-4 h-4 mr-2" />
              Unlock at Level 10
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2 text-yellow-500" />
                Gold Box
              </CardTitle>
              <Badge variant="secondary">Locked</Badge>
            </div>
            <CardDescription>Complete 20 challenges to unlock premium content</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={75} className="mb-2" />
            <p className="text-sm text-muted-foreground">15/20 Challenges</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>
              <Lock className="w-4 h-4 mr-2" />
              Complete 5 more challenges
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2 text-purple-500" />
                Diamond Box
              </CardTitle>
              <Badge variant="secondary">Locked</Badge>
            </div>
            <CardDescription>Achieve a 30-day coding streak for exclusive rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={25} className="mb-2" />
            <p className="text-sm text-muted-foreground">7/30 Days</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>
              <Lock className="w-4 h-4 mr-2" />
              Continue your streak
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

