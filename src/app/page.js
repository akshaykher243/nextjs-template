'use client';
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const letterVariants = {
    initial: { opacity: 0, y: 20, rotate: 0 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    hover: { scale: 1.2, rotate: 5, color: '#3b82f6' }
  };

  const name = "Akshay Kher";
  const title = "Full Stack Developer";
  const subtitle = "Crafting Digital Experiences";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          {/* Greeting */}
          <div className="mb-6 opacity-80">
            <p className="text-lg md:text-xl text-gray-300 font-light tracking-wider">
              Hello, I'm
            </p>
          </div>

          {/* Name with interactive letters */}
          <div 
            className="mb-6 relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 cursor-default">
              {name.split('').map((letter, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-300 hover:scale-110 hover:text-blue-400 hover:drop-shadow-lg ${
                    letter === ' ' ? 'w-4 md:w-6' : 'hover:animate-bounce'
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    transform: isHovering 
                      ? `translateY(${Math.sin(index * 0.5) * 10}px) rotate(${Math.sin(index * 0.3) * 5}deg)` 
                      : 'translateY(0) rotate(0deg)'
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>
            
            {/* Gradient underline */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transform scale-x-0 transition-transform duration-700 hover:scale-x-100 mx-auto w-3/4"></div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-light italic">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Skills/Technologies floating cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-2xl">
          {['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind'].map((tech, index) => (
            <div
              key={tech}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:rotate-1"
              style={{
                animationDelay: `${index * 200}ms`,
                transform: `translateY(${Math.sin(Date.now() * 0.001 + index) * 5}px)`
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Interactive buttons */}
        <div className="flex gap-6 items-center flex-col sm:flex-row">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 overflow-hidden">
            <span className="relative z-10">Get In Touch</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className="group px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:border-white/60 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-rotate-1 backdrop-blur-sm">
            View Projects
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-6 text-center text-gray-400 text-sm">
        <div className="flex justify-center gap-8 mb-4">
          <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
            <Image
              aria-hidden
              src="/github.svg"
              alt="GitHub"
              width={16}
              height={16}
              className="dark:invert"
            />
            GitHub
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Portfolio"
              width={16}
              height={16}
              className="dark:invert"
            />
            Portfolio
          </a>
        </div>
        <p>© 2025 Akshay Kher. Crafted with ❤️ and Next.js</p>
      </footer>

      {/* Mouse follower effect */}
      <div
        className="pointer-events-none fixed w-6 h-6 bg-white/20 rounded-full blur-sm transition-all duration-300 z-50"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isHovering ? 1.5 : 1})`
        }}
      />
    </div>
  );
}
