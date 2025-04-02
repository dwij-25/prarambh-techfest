"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface HomeSectionProps {
  id: string
}

export default function HomeSection({ id }: HomeSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Calculate time until event (April 23, 2025)
  const eventDate = new Date("April 23, 2025").getTime()
  const now = new Date().getTime()
  const distance = eventDate - now

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  return (
    <section
      id={id}
      ref={ref}
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden py-20"
    >
      <div className="container mx-auto px-4 z-10 text-center">
        {/* Organization logos */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="mb-8 md:mb-0"
          >
            <Image src="/logos/iste-logo.svg" alt="ISTE Logo" width={150} height={150} className="h-24 w-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 md:mb-0"
          >
            <Image
              src="/logos/prarambh-logo.svg"
              alt="Prarambh Logo"
              width={200}
              height={200}
              className="h-40 w-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="mb-8 md:mb-0"
          >
            <Image
              src="/logos/sal-logo.svg"
              alt="SAL Education Logo"
              width={150}
              height={150}
              className="h-24 w-auto"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl text-gray-300 max-w-2xl mx-auto mb-2">
            19 ISTE Gujarat State Annual Students Convention
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">The Ultimate Tech Fest Experience</p>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">23 April, 2025 • SAL Education</p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          className="flex justify-center gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { label: "Days", value: days },
            { label: "Hours", value: hours },
            { label: "Minutes", value: minutes },
            { label: "Seconds", value: seconds },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center justify-center">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                {item.value.toString().padStart(2, "0")}
              </div>
              <div className="text-sm md:text-base text-gray-400">{item.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link href="#registration">
            <motion.button
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-gray-400">JOINTLY ORGANIZED BY</p>
          <p className="text-white text-lg mt-2">INDIAN SOCIETY FOR TECHNICAL EDUCATION (ISTE) & SAL EDUCATION</p>
        </motion.div>
      </div>
    </section>
  )
}

