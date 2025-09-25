"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Users, CheckCircle, Award } from 'lucide-react'

const AdmissionProcess = () => {
  const steps = [
    {
      id: 1,
      title: "Register",
      icon: <UserPlus className="w-5 h-5 sm:w-6 sm:h-6" />,
      completed: true
    },
    {
      id: 2,
      title: "Attend Workshops",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      completed: true
    },
    {
      id: 3,
      title: "Completion",
      icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      completed: true
    },
    {
      id: 4,
      title: "Certificate and Rewards",
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
      completed: true
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Heading */}
        <div className="text-center space-y-2 px-2">
          <h2 className="text-2xl sm:text-3xl text-red-600 lg:text-4xl font-bold text-foreground">
            The Internship Journey
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            A simple, transparent journey from application to completion.
          </p>
        </div>

        {/* Desktop / Tablet Layout */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div
                  variants={stepVariants}
                  className="flex flex-col items-center space-y-2 sm:space-y-3 relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      step.completed
                        ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'bg-background border-border text-muted-foreground'
                    }`}
                  >
                    {step.icon}
                    {step.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-600 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                  <div className="text-center px-2">
                    <h3 className={`font-semibold text-xs sm:text-sm md:text-base transition-colors ${
                      step.completed ? 'text-primary' : 'text-foreground'
                    }`}>
                      {step.title}
                    </h3>
                    {/* Step Number */}
                    <p className="text-xs sm:text-sm text-red-600">Step {step.id}</p>
                  </div>
                </motion.div>

                {index < steps.length - 1 && (
                  <div className="flex-1 relative mx-2 sm:mx-4">
                    <div className="h-0.5 sm:h-1 bg-gray-800 rounded-full"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.div
                variants={stepVariants}
                className="flex items-center space-x-3 sm:space-x-4"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step.completed
                      ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'bg-background border-border text-muted-foreground'
                  }`}
                >
                  {step.icon}
                </motion.div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm sm:text-base transition-colors ${
                    step.completed ? 'text-primary' : 'text-foreground'
                  }`}>
                    {step.title}
                  </h3>
                  {/* Step Number */}
                  <p className="text-xs text-gray-400">Step {step.id}</p>
                </div>
                {step.completed && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-5 h-5 sm:w-6 sm:h-6 bg-red-600 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </motion.div>
                )}
              </motion.div>

              {index < steps.length - 1 && (
                <div className="ml-5 sm:ml-6 relative">
                  <div className="w-0.5 sm:w-1 h-6 sm:h-8 bg-gray-800 rounded-full"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default AdmissionProcess
