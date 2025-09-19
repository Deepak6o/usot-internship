"use client";

import React, { useEffect, useRef, useState } from "react";

const WhyAttendHero = () => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fade in animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Canvas particle animation setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 150 };

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Mouse collision detection
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 4;
            this.y -= forceDirectionY * force * 4;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particles = [];
      // Increased particle density from 12000 to 6000 (doubled the density)
      let numberOfParticles = (canvas.height * canvas.width) / 6000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.5;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.3) - 0.15;
        let directionY = (Math.random() * 0.3) - 0.15;
        // Slightly increased opacity for better visibility
        let color = 'rgba(239, 68, 68, 0.4)'; // Red particles with moderate opacity
        particles.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(); 
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
            + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          
          if (distance < (canvas.width / 8) * (canvas.height / 8)) {
            opacityValue = 1 - (distance / 25000);
            
            let dx_mouse_a = particles[a].x - mouse.x;
            let dy_mouse_a = particles[a].y - mouse.y;
            let distance_mouse_a = Math.sqrt(dx_mouse_a * dx_mouse_a + dy_mouse_a * dy_mouse_a);

            if (mouse.x && distance_mouse_a < mouse.radius) {
              // Increased mouse interaction opacity while keeping it controlled
              ctx.strokeStyle = `rgba(239, 68, 68, ${opacityValue * 0.7})`;
            } else {
              // Slightly more visible connection lines
              ctx.strokeStyle = `rgba(185, 28, 28, ${opacityValue * 0.45})`;
            }
            
            // Slightly thicker lines for better visibility
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.5, '#1f2937');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
    };
    
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Content - Ensure it stays above canvas */}
      <div
        className={`relative z-10 min-h-screen flex flex-col justify-center px-6 py-16 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Main Title Section */}
          <div className="text-center mb-10">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.9] mb-8 relative z-20">
              Why Should You <span className="text-red-500">Attend it ?</span>
            </h1>

            <div className="space-y-6 max-w-6xl mx-auto relative z-20">
              <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed">
                Opportunities like this don't come often, an internship
                opportunity while you're still in school. Add it to your
                profile, showcase certificates and Letters of Recommendation,
                and stand out from the crowd. At 18, most students are
                preparing; you'll already be proving.
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                <p className="text-red-500 font-bold text-lg md:text-xl tracking-wide">
                  That's how you get noticed.
                </p>
                <div className="h-px w-16 bg-gradient-to-l from-transparent via-red-500 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="text-center z-20">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-12">
              Rewards and <span className="text-red-500">Recognition</span>
            </h2>

            {/* Modern Features Grid */}
            <div className="max-w-6xl mx-auto">
              {/* Top Row - 2 Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/50 to-red-800/50 rounded-2xl blur opacity-0  transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl p-6 rounded-2xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-300">
                    <div className="flex items-start gap-3 mb-3">
                      <h3 className="text-red-500 font-semibold text-sm uppercase tracking-wider">
                        NAAC Accredited Program
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      A 4-year fully residential B.Tech program, NAAC
                      accredited, designed to create future-ready engineers,
                      innovators, and leaders.
                    </p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/50 to-red-800/50 rounded-2xl blur opacity-0  transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl p-6 rounded-2xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-300">
                    <div className="flex items-start gap-3 mb-3">
                      <h3 className="text-red-500 font-semibold text-sm uppercase tracking-wider">
                        Cutting-Edge Learning
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Learn GenAI, Robotics, and Quantum Computing from seasoned
                      industry professionals who've built and scaled in the real
                      world.
                    </p>
                  </div>
                </div>
              </div>

              {/* Middle Row - 2 Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/50 to-red-800/50 rounded-2xl blur opacity-0  transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl p-6 rounded-2xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-300">
                    <div className="flex items-start gap-3 mb-3">
                      <h3 className="text-red-500 font-semibold text-sm uppercase tracking-wider">
                        Clear Outcomes
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Crystal clear outcomes: high-paying jobs, groundbreaking
                      research, and entrepreneurship pathways.
                    </p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/50 to-red-800/50 rounded-2xl blur opacity-0  transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl p-6 rounded-2xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-300">
                    <div className="flex items-start gap-3 mb-3">
                      <h3 className="text-red-500 font-semibold text-sm uppercase tracking-wider">
                        WorkX360™ Experience
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Dive into WorkX360™ internships (₹25K/month avg.),
                      hackathons, global immersions, and real-world projects.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Full Width Card */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 via-red-500/20 to-red-500/30 rounded-3xl blur-xl opacity-0  transition-opacity duration-700"></div>
                <div className="relative bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 hover:border-red-500/40 transition-all duration-500">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <h3 className="text-red-500 font-bold text-base uppercase tracking-wider">
                        Ultimate Support System
                      </h3>
                    </div>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
                      Backed by{" "}
                      <span className="text-white font-semibold">
                        3000+ hiring partners
                      </span>
                      ,
                      <span className="text-white font-semibold">
                        {" "}
                        scholarships up to 100%
                      </span>
                      , and
                      <span className="text-white font-semibold">
                        {" "}
                        lifelong career support
                      </span>
                      . This isn't just a degree — it's your
                      <span className="bg-gradient-to-r from-red-500 to-red-500 bg-clip-text text-transparent font-bold">
                        {" "}
                        launchpad to building the future
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAttendHero;