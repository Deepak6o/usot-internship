"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const THEMES = {
  primary: "from-red-500 via-red-600 to-red-700",
  secondary: "from-red-400 via-red-500 to-red-600",
  accent: "from-red-600 via-red-700 to-red-800",
};

const Card3D = React.forwardRef((props, ref) => {
  const {
    title,
    description,
    iconSrc,
    theme = "primary",
    className,
    size = "md",
    ...otherProps
  } = props;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const finalGradient = useMemo(() => THEMES[theme], [theme]);
  
  const patternId = useMemo(
    () => `pattern-${theme}-${title.replace(/\s+/g, "-").toLowerCase()}`,
    [theme, title]
  );

  const handleMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({
      x: (x / rect.width - 0.5) * 25,
      y: (y / rect.height - 0.5) * -25,
    });
  }, []);

  const handleEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(false);
    setMousePos({ x: 0, y: 0 });
  }, []);

  const sizeClass = size === "sm" ? "h-64" : size === "lg" ? "h-96" : "h-80";

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl transform-gpu transition-all duration-500 ease-out shadow-lg hover:shadow-2xl",
        sizeClass,
        className
      )}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      animate={{
        rotateX: mousePos.y,
        rotateY: mousePos.x,
        z: hovered ? 30 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
      style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
      {...otherProps}
    >
      {/* Main background */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${finalGradient}`}
        animate={{ scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ transform: "translateZ(-10px)" }}
      />

      {/* Pattern overlay */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-20">
        <svg
          className="absolute -top-4 -right-4 w-32 h-32 text-white/30"
          viewBox="0 0 100 100"
        >
          <defs>
            <pattern
              id={patternId}
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="10"
                cy="10"
                r="1"
                fill="currentColor"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#${patternId})`} />
        </svg>

        <motion.div
          className="absolute -bottom-4 -left-4 w-24 h-24 opacity-30"
          animate={{ rotate: hovered ? 180 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-white/40">
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              rx="8"
            />
            <rect
              x="35"
              y="35"
              width="30"
              height="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              rx="4"
            />
          </svg>
        </motion.div>
      </div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)`,
          transform: "translateZ(5px)",
        }}
        animate={{ opacity: hovered ? 0.5 : 0.7 }}
        transition={{ duration: 0.3 }}
      />

      {/* Light reflection */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
        style={{ transform: "translateZ(15px)" }}
      >
        <motion.div
          className="absolute -inset-full"
          animate={{
            background: hovered
              ? `linear-gradient(${mousePos.x + 135}deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)`
              : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-20 flex h-full flex-col justify-center items-center p-8 text-white text-center"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Icon */}
        {iconSrc && (
          <motion.div
            className="relative mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="filter drop-shadow-lg"
              animate={{
                rotateZ: hovered ? 5 : 0,
                y: hovered ? -4 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={iconSrc}
                alt={title}
                width={120}
                height={120}
                className="mx-auto opacity-90 filter brightness-0 invert"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Text Content */}
        <motion.div
          className="space-y-4"
          animate={{ y: hovered ? -3 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3
            className="text-xl font-bold tracking-tight drop-shadow-md leading-tight"
            animate={{ scale: hovered ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-sm text-white/90 leading-relaxed drop-shadow-sm"
            animate={{ opacity: hovered ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Top highlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.1) 100%)`,
          transform: "translateZ(25px)",
        }}
        animate={{ opacity: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${finalGradient})`,
          filter: "blur(15px)",
          transform: "translateZ(-5px)",
        }}
        animate={{ opacity: hovered ? 0.3 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
});

Card3D.displayName = "Card3D";

export default function AfterInternship() {
  const items = [
    {
      id: "certificate",
      title: "Certificate of Completion",
      description: "Certificate of Completion from upGrad School of Technology.",
      iconSrc: "/assets/i1.png",
      theme: "primary",
    },
    {
      id: "recommendation",
      title: "Letters of Recommendation", 
      description: "Letters of Recommendation for top performers, signed by industry-embedded faculty.",
      iconSrc: "/assets/i2.png",
      theme: "secondary",
    },
    {
      id: "scholarship",
      title: "Scholarship Opportunities",
      description: "Exclusive opportunities to apply for uGSOT scholarships.",
      iconSrc: "/assets/i3.png",
      theme: "accent",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12, mass: 0.7 },
    },
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]">
          <svg
            width="100%"
            height="100%"
            className="text-gray-900"
          >
            <defs>
              <pattern
                id="grid-after"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-after)" />
          </svg>
        </div>

        <motion.div
          className="absolute top-10 right-10 w-64 h-64 opacity-[0.04]"
          animate={{ rotate: [0, 360], scale: [1, 1.05, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full text-red-300"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
            After the Internship
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
            Your journey doesn't end when the program does. At uGSOT, we ensure
            your achievements are recognized and valued:
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px", amount: 0.2 }}
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              custom={index}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card3D
                title={item.title}
                description={item.description}
                iconSrc={item.iconSrc}
                theme={item.theme}
                size="md"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}