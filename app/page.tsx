import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Code, Trophy, BookOpen, Gamepad, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen backdrop-blur-[2px]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Code className="h-6 w-6 mr-2" />
          <span className="font-bold">CodeVenture</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#faqs">
            FAQs
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="flex flex-col items-center lg:items-start space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Welcome to CodeVenture
                  </h1>
                  <p className="mx-auto lg:mx-0 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Embark on an epic coding journey. Learn, challenge yourself, and become a master programmer through
                    gamified learning experiences.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button asChild size="lg">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              </div>
              <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rGfGOGDDzCbbZ8FG8bQK84FR2byhyN.png"
                  alt="Gamified Coding Platform"
                  width={600}
                  height={500}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-8 md:py-12 lg:py-16 bg-white/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
                  Experience the Future of Coding Education
                </h2>
                <p className="text-gray-500 md:text-xl dark:text-gray-400 mb-8">
                  Immerse yourself in our interactive learning environment. With cutting-edge technology and gamified
                  experiences, learning to code has never been more engaging.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FeatureCard
                    icon={<Trophy className="h-10 w-10 text-primary" />}
                    title="Challenges"
                    description="Test your skills with our coding challenges, ranging from easy to expert levels."
                  />
                  <FeatureCard
                    icon={<BookOpen className="h-10 w-10 text-primary" />}
                    title="Courses"
                    description="Learn new programming languages and concepts with our structured courses."
                  />
                  <FeatureCard
                    icon={<Gamepad className="h-10 w-10 text-primary" />}
                    title="Coding Games"
                    description="Have fun while learning with our interactive coding games and puzzles."
                  />
                  <FeatureCard
                    icon={<Code className="h-10 w-10 text-primary" />}
                    title="Real Projects"
                    description="Build real-world applications and expand your portfolio as you learn."
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="relative w-full h-[400px] lg:h-[600px]">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IZXyjM7CNULaGzw6xLbUSYBOYmva4n.png"
                    alt="Interactive Coding Experience"
                    width={600}
                    height={600}
                    className="object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white/50 backdrop-blur-sm border-t">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <Code className="h-6 w-6" />
                <span className="font-bold text-lg">CodeVenture</span>
              </Link>
              <p className="text-sm text-gray-600">
                Empowering the next generation of developers through gamified learning experiences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-primary">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-primary">
                    Challenges
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-primary">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Stay Connected</h3>
              <p className="text-sm text-gray-600 mb-4">Subscribe to our newsletter for updates and coding tips.</p>
              <form className="space-y-2">
                <Input type="email" placeholder="Enter your email" />
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
              <div className="flex space-x-4 mt-4">
                <Link href="#" className="text-gray-600 hover:text-primary">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            <p>&copy; 2024 CodeVenture. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-start p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4 p-3 rounded-full bg-primary/10">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}

