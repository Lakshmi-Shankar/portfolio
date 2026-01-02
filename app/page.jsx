"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { Underline } from "lucide-react";


/* ------------------ DATA ------------------ */

const projects = [
  {
    title: "FLEXY",
    desc: "Real-time notification expert-client platform with Socket.IO, MERN.",
    img: "/projects/flexy.png",
    live: "https://flexy-life.netlify.app/",
    git: "https://github.com/kalviumcommunity/S75_SLakshmi_Shankar_Flexy.git",
  },
  {
    title: "Skill Gap Matcher AI",
    desc: "Helps users to find jobs using AI.",
    img: "/projects/skillgapmatcherai.png",
    live: "https://skillgapmatcherai.netlify.app",
    git: "https://github.com/Lakshmi-Shankar/Skill-Gap-Matcher-AI.git",
  },
];

const skills = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "SQL",
  "Figma",
  "Linux",
  "Git",
  "Docker",
  "REST APIs",
  "AI Integration",
  "Postman"
];

/* ------------------ ANIMATED BACKGROUND ------------------ */
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Floating Orbs */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-white/5"
          style={{
            width: Math.random() * 400 + 100,
            height: Math.random() * 400 + 100,
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 120 - 10}%`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, Math.random() * 150 - 75, 0],
            y: [0, Math.random() * 200 - 100, Math.random() * 150 - 75, 0],
            scale: [1, Math.random() * 0.7 + 0.6, Math.random() * 0.8 + 0.7, 1],
            opacity: [0.05, 0.15, 0.1, 0.05],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 30 + 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Grid Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Animated Particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -1000],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

/* ------------------ CURSOR FOLLOWER ------------------ */
const CursorFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeout;
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 100);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/* Main glow */}
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 70%)",
        }}
        animate={{
          x: mousePos.x - 300,
          y: mousePos.y - 300,
          scale: isMoving ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 150,
        }}
      />
      
      {/* Trailing particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2 h-2 bg-white/30 rounded-full pointer-events-none -z-10"
          animate={{
            x: mousePos.x - 4,
            y: mousePos.y - 4,
            scale: [1, 0],
            opacity: [0.6, 0],
          }}
          transition={{
            x: { type: "spring", damping: 20, stiffness: 150, delay: i * 0.02 },
            y: { type: "spring", damping: 20, stiffness: 150, delay: i * 0.02 },
            scale: { duration: 0.5, delay: i * 0.05 },
            opacity: { duration: 0.5, delay: i * 0.05 },
          }}
        />
      ))}
      
      {/* Ring pulse */}
      <motion.div
        className="fixed w-16 h-16 border border-white/20 rounded-full pointer-events-none -z-10"
        animate={{
          x: mousePos.x - 32,
          y: mousePos.y - 32,
          scale: isMoving ? 1.5 : 1,
          opacity: isMoving ? 0.5 : 0,
        }}
        transition={{
          x: { type: "spring", damping: 25, stiffness: 200 },
          y: { type: "spring", damping: 25, stiffness: 200 },
          scale: { duration: 0.3 },
          opacity: { duration: 0.3 },
        }}
      />
      
      {/* Additional pulsing rings */}
      {isMoving && [...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-16 h-16 border border-white/20 rounded-full pointer-events-none -z-10"
          initial={{ 
            x: mousePos.x - 32,
            y: mousePos.y - 32,
            scale: 1,
            opacity: 0.5 
          }}
          animate={{
            scale: 2.5,
            opacity: 0,
          }}
          transition={{
            duration: 1,
            delay: i * 0.3,
            repeat: Infinity,
          }}
        />
      ))}
    </>
  );
};

/* ------------------ PAGE ------------------ */

export default function Page() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <main ref={containerRef} className="relative overflow-x-hidden bg-black text-white">
      <AnimatedBackground />
      <CursorFollower />

      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50
                   backdrop-blur-xl bg-white/5 border border-white/10
                   px-8 py-4 rounded-full flex gap-8 text-sm shadow-2xl"
      >
        {["Home", "Projects", "Skills", "Contact"].map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 * 0.1 }}
            className="relative group"
            whileHover={{ scale: 1.2, underlinePosition: "under" }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
            <motion.span
              className="absolute left-0 -bottom-1 h-[1px] bg-white"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        ))}
      </motion.nav>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative"
      >
        <motion.div
          style={{ y: heroY, scale: scaleProgress }}
          className="text-center z-10"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.4, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight relative"
          >
            {["L", "A", "K", "S", "H", "M", "I", "_", "S", "H", "A", "N", "K", "A", "R"].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateY: -90 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{
                  delay: 0.5 * 0.1,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.3,
                  y: -20,
                  // rotateZ: [0, -10, 10, -10, 0],
                  textShadow: "0 0 20px rgba(255,255,255,0.8)",
                  transition: { duration: 0.4 },
                }}
                className="inline-block cursor-pointer relative"
                style={{
                  display: "inline-block",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.span
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="absolute inset-0 blur-xl"
                >
                  {letter}
                </motion.span>
                {letter}
              </motion.span>
            ))}
            
            {/* Floating sparkles around text */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-6"
          >
            <motion.p
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-white/60 max-w-xl mx-auto text-lg"
            >
              I don't build websites.  
              I engineer <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-bold text-white"
              >digital experiences</motion.span>.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated Glow */}
        <motion.div
          style={{ opacity: glowOpacity }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)]"
        />

        {/* Orbiting Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/50 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              boxShadow: "0 0 20px rgba(255,255,255,0.8)",
            }}
            animate={{
              x: [
                0,
                Math.cos(i * 45 * (Math.PI / 180)) * 350,
                Math.cos((i * 45 + 180) * (Math.PI / 180)) * 350,
                0
              ],
              y: [
                0,
                Math.sin(i * 45 * (Math.PI / 180)) * 350,
                Math.sin((i * 45 + 180) * (Math.PI / 180)) * 350,
                0
              ],
              scale: [0, 1.5, 1.5, 0],
              rotate: [0, 180, 360, 540],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Rotating rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute border border-white/10 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              width: 200 + i * 150,
              height: 200 + i * 150,
              marginLeft: -(100 + i * 75),
              marginTop: -(100 + i * 75),
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              rotate: { duration: 20 + i * 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity },
              opacity: { duration: 3, repeat: Infinity },
            }}
          />
        ))}
      </section>

      {/* ================= PROJECTS ================= */}
      <section
        id="projects"
        className="min-h-screen px-6 md:px-20 py-32 relative"
      >
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl font-bold mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Selected Projects
          </motion.span>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[2px] bg-white/20 mt-4"
          />
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-20">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section
        id="skills"
        className="min-h-screen px-10 md:px-32 py-32"
      >
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-16"
        >
          Tech Stack
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {skills.map((skill, i) => (
            <SkillCard key={skill} skill={skill} index={i} />
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-6 relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="
            max-w-xl w-full
            bg-white/5 border border-white/10
            rounded-2xl p-10 relative overflow-hidden
          "
        >
          <motion.div
            className="absolute inset-0 bg-white/5"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-6 relative z-10"
          >
            Contact
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/60 mb-8 relative z-10"
          >
            Open to internships, collaborations, and ambitious ideas.
          </motion.p>

          <div className="space-y-4 relative z-10">
            {[
              { icon: FaEnvelope, text: "lakshmi7708671565@gmail.com", href: "lakshmi7708671565@gmail.com" },
              { icon: FaGithub, text: "GitHub", href: "https://github.com/lakshmi-shankar" },
              { icon: FaLinkedin, text: "LinkedIn", href: "https://www.linkedin.com/in/lakshmi-shankar-013296361/" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ x: 10, scale: 1.05 }}
                className="flex items-center gap-3 hover:text-white/80 transition-colors group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon />
                </motion.div>
                {item.text}
                <motion.span
                  className="h-[1px] bg-white/30 flex-1 ml-2"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{ transformOrigin: "left" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}

/* ------------------ PROJECT CARD ------------------ */
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      ref={ref}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative"
    >
      {/* GLOW (NON-INTERACTIVE) */}
      <motion.div
        className="absolute inset-0 bg-white/10 blur-2xl rounded-3xl pointer-events-none"
        animate={{ opacity: hover ? 1 : 0 }}
      />

      <div className="relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        {/* IMAGE */}
        <div className="relative">
          <img
            src={project.img}
            className="w-full h-64 object-cover"
            alt={project.title}
          />

          {/* SHINE */}
          <motion.div
            className="absolute inset-0 bg-white/20 pointer-events-none"
            initial={{ x: "-100%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <div className="p-6 relative">
          <h3 className="text-2xl font-semibold">{project.title}</h3>
          <p className="text-white/60 mt-2">{project.desc}</p>

          {/* LINKS — CLICKABLE */}
          <div className="flex gap-6 mt-4 relative z-[999] pointer-events-auto">
            <motion.a
              href={project.git}
              target="_blank"
              whileHover={{ scale: 1.4, rotate: 360 }}
              className="pointer-events-auto"
            >
              <FaGithub className="text-xl" />
            </motion.a>

            <motion.a
              href={project.live}
              target="_blank"
              whileHover={{ scale: 1.4, rotate: -360 }}
              className="pointer-events-auto"
            >
              <FaExternalLinkAlt className="text-xl" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


/* ------------------ SKILL CARD ------------------ */
const SkillCard = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: "easeOut",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.2,
        // rotate: [0, 10, 10, -10, 10, 0],
        backgroundColor: "rgba(255,255,255,0.2)",
        y: -10,
      }}
      whileTap={{ scale: 0.9, rotate: 0 }}
      className="
        border border-white/10 rounded-xl
        px-6 py-8 text-center
        bg-white/5 cursor-pointer
        transition-colors relative overflow-hidden
      "
    >
      {/* Animated corner accents */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 border-white/30"
          style={{
            [i < 2 ? 'top' : 'bottom']: 0,
            [i % 2 === 0 ? 'left' : 'right']: 0,
            borderTopWidth: i < 2 ? '2px' : 0,
            borderBottomWidth: i >= 2 ? '2px' : 0,
            borderLeftWidth: i % 2 === 0 ? '2px' : 0,
            borderRightWidth: i % 2 === 1 ? '2px' : 0,
          }}
          animate={isHovered ? {
            [i < 2 ? 'top' : 'bottom']: -8,
            [i % 2 === 0 ? 'left' : 'right']: -8,
            opacity: [0, 1, 0],
          } : {}}
          transition={{ duration: 0.5 }}
        />
      ))}
      
      {/* Wave effect */}
      {/* <motion.div
        className="absolute inset-0 bg-white/10"
        initial={{ y: "100%" }}
        animate={isHovered ? { 
          y: "0%",
          transition: { duration: 0.4 }
        } : { 
          y: "100%",
          transition: { duration: 0.3 }
        }}
      /> */}
      
      {/* Rotating border */}
      {/* {isHovered && (
        <motion.div
          className="absolute inset-0 border-2 border-white/30 rounded-xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )} */}
      
      {/* Particle burst on hover */}
      {isHovered && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: "50%",
            top: "50%",
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: Math.cos(i * 45 * (Math.PI / 180)) * 50,
            y: Math.sin(i * 45 * (Math.PI / 180)) * 50,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
      
      <motion.span
        className="relative z-10 font-semibold text-lg"
        animate={isInView ? {
          opacity: [0.7, 1, 0.7],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.2,
        }}
      >
        {skill.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={isHovered ? {
              y: [0, -10, 0],
              transition: { 
                duration: 0.5, 
                delay: i * 0.05,
                repeat: Infinity,
              }
            } : {}}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={isHovered ? {
          boxShadow: [
            "0 0 0px rgba(255,255,255,0)",
            "0 0 30px rgba(255,255,255,0.3)",
            "0 0 0px rgba(255,255,255,0)",
          ],
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  );
};