import { Code2, Users, BookOpen } from 'lucide-react'

const Hero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('registration-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id='hero' className="relative text-white overflow-hidden">
      {/* Modern Animated Network & Floating Logos */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm from-blue-900 via-blue-950 to-transparent" />
        {/* Animated SVG network */}
        <svg width="100%" height="100%" viewBox="0 0 1440 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse-slow">
          {/* Multiple subtle animated lines */}
          <polyline points="100,420 300,320 500,400 700,250 900,320 1100,180 1300,260" stroke="#60a5fa" strokeWidth="2.5" opacity="0.13" fill="none" />
          <polyline points="200,350 400,200 600,300 800,120 1000,200 1200,80" stroke="#a78bfa" strokeWidth="2" opacity="0.10" fill="none" />
          <polyline points="300,480 600,420 900,480 1200,400" stroke="#fff" strokeWidth="1.5" opacity="0.08" fill="none" />
          {/* Animated nodes */}
          <circle cx="300" cy="320" r="8" fill="#60a5fa" opacity="0.18">
            <animate attributeName="cy" values="320;340;320" dur="7s" repeatCount="indefinite" />
          </circle>
          <circle cx="700" cy="250" r="10" fill="#a78bfa" opacity="0.15">
            <animate attributeName="cy" values="250;270;250" dur="8s" repeatCount="indefinite" />
          </circle>
          <circle cx="1100" cy="180" r="9" fill="#fff" opacity="0.13">
            <animate attributeName="cy" values="180;200;180" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="900" cy="320" r="7" fill="#60a5fa" opacity="0.13">
            <animate attributeName="cy" values="320;340;320" dur="7s" repeatCount="indefinite" />
          </circle>
        </svg>
        {/* Floating Git and GitHub logos (CSS animated) */}
        {/* Multiple floating Git and GitHub logos for dynamic effect */}
        <div className="absolute left-[10%] top-[20%] animate-float-slow">
          <img src="/git-vector-logos.png" alt="Logo" width="38" height="38" />
        </div>
        <div className="absolute left-[80%] top-[35%] animate-float-slower">
          <img src="/git-vector-logos.png" alt="Logo" width="38" height="38" />
        </div>
        <div className="absolute left-[25%] top-[60%] animate-float-slowest">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#f14e32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#f14e32" />
            <path d="M17.7 10.3l-4-4a1 1 0 0 0-1.4 0l-4 4a1 1 0 0 0 1.4 1.4L11 9.42V16a1 1 0 0 0 2 0V9.42l1.3 1.3a1 1 0 1 0 1.4-1.42z" fill="#fff" />
          </svg>
        </div>
        <div className="absolute left-[60%] top-[10%] animate-float-slow-x">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#23272f" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#23272f" />
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 7.07c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" fill="#fff" />
          </svg>
        </div>
        <div className="absolute left-[70%] top-[70%] animate-float-slowest-x">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#23272f" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#23272f" />
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 7.07c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" fill="#fff" />
          </svg>
        </div>
        {/* More floating icons can be added similarly for extra effect */}
        <style>{`
          @keyframes float-slow { 0% { transform: translateY(0); } 50% { transform: translateY(-18px); } 100% { transform: translateY(0); } }
          @keyframes float-slower { 0% { transform: translateY(0); } 50% { transform: translateY(-28px); } 100% { transform: translateY(0); } }
          @keyframes float-slowest { 0% { transform: translateY(0); } 50% { transform: translateY(-38px); } 100% { transform: translateY(0); } }
          @keyframes float-slow-x { 0% { transform: translateX(0); } 50% { transform: translateX(24px); } 100% { transform: translateX(0); } }
          @keyframes float-slowest-x { 0% { transform: translateX(0); } 50% { transform: translateX(-24px); } 100% { transform: translateX(0); } }
          .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
          .animate-float-slower { animation: float-slower 11s ease-in-out infinite; }
          .animate-float-slowest { animation: float-slowest 13s ease-in-out infinite; }
          .animate-float-slow-x { animation: float-slow-x 9s ease-in-out infinite; }
          .animate-float-slowest-x { animation: float-slowest-x 15s ease-in-out infinite; }
          .bg-gradient-radial { background: radial-gradient(ellipse at 60% 40%, #1e293b 60%, transparent 100%); }
          .animate-pulse-slow { animation: pulse-slow 12s ease-in-out infinite; }
          @keyframes pulse-slow { 0%,100% { opacity: 1; } 50% { opacity: 0.7; } }
        `}</style>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <div className="mb-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Collaborating in a Software Project
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-200">
              using Git and GitHub
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Learn the essential skills for modern software development. Master version control,
            collaborative workflows, and best practices for working in teams.
          </p>

          {/* Features with Hover Effect */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <img src="/git-vector-logos.png" alt="Logo" className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Git Basics</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <Code2 className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Branching</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <Users className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Collaboration</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <BookOpen className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Best Practices</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToForm}
            className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Register Now
          </button>

          {/* Additional Info */}
          <p className="mt-6 text-blue-200 text-sm">
            Join our community and start your journey in collaborative software development
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
