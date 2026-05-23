import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const HeartIcon = Icons['Heart'] || Icons['HelpCircle'];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 5 + Math.random() * 6,
  size: 10 + Math.random() * 18,
  opacity: 0.3 + Math.random() * 0.5,
}));

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 7 + Math.random() * 8,
  size: 8 + Math.random() * 14,
  drift: -40 + Math.random() * 80,
}));

export default function FinalSceneMessage() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.22, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: 'easeOut' } },
  };

  const glowPulse = {
    animate: {
      textShadow: [
        '0 0 30px #f597fe, 0 0 60px #fa59b2, 0 0 100px #f597fe',
        '0 0 60px #fa59b2, 0 0 120px #f597fe, 0 0 180px #7ecbff',
        '0 0 30px #f597fe, 0 0 60px #fa59b2, 0 0 100px #f597fe',
      ],
      transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const sectionPulse = {
    animate: {
      boxShadow: [
        'inset 0 0 120px 0px rgba(245,151,254,0.08)',
        'inset 0 0 220px 40px rgba(126,203,255,0.13)',
        'inset 0 0 120px 0px rgba(245,151,254,0.08)',
      ],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      variants={sectionPulse}
      animate="animate"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 pb-40 pt-20"
      style={{}}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0620] via-[#170930] to-[#0a0416] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(245,151,254,0.18)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(126,203,255,0.12)_0%,transparent_60%)] pointer-events-none" />

      {PETALS.map((petal) => (
        <motion.div
          key={`petal-${petal.id}`}
          className="absolute top-0 pointer-events-none select-none"
          style={{ left: `${petal.x}%` }}
          initial={{ y: -40, opacity: 0, rotate: 0, x: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, petal.opacity ?? 0.7, 0.6, 0],
            rotate: [0, 180, 360],
            x: [0, petal.drift ?? 20, -(petal.drift ?? 20), 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <span
            className="block rounded-full"
            style={{
              width: petal.size,
              height: petal.size,
              background:
                'radial-gradient(circle, rgba(250,89,178,0.85) 0%, rgba(245,151,254,0.5) 60%, transparent 100%)',
              filter: 'blur(1.5px)',
            }}
          />
        </motion.div>
      ))}

      {PARTICLES.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute pointer-events-none"
          style={{ left: `${p.x}%`, top: '50%' }}
          animate={{
            y: [-60, -200 - Math.random() * 120],
            opacity: [0, p.opacity ?? 0.6, 0],
            scale: [0.6, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <HeartIcon
            size={p.size}
            style={{
              color: p.id % 2 === 0 ? '#fa59b2' : '#f597fe',
              filter: `drop-shadow(0 0 ${p.size * 0.5}px #fa59b2)`,
              opacity: p.opacity ?? 0.7,
            }}
          />
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 flex flex-col items-center gap-10 max-w-3xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
      >
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`top-heart-${i}`}
              animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.8 + i * 0.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            >
              <HeartIcon
                size={28 + i * 6}
                style={{
                  color: i === 1 ? '#fa59b2' : '#f597fe',
                  filter: `drop-shadow(0 0 ${14 + i * 6}px #fa59b2)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="relative">
          <motion.div
            className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
            animate={{
              background: [
                'radial-gradient(ellipse,#f597fe 0%,#fa59b2 40%,transparent 80%)',
                'radial-gradient(ellipse,#7ecbff 0%,#f597fe 40%,transparent 80%)',
                'radial-gradient(ellipse,#f597fe 0%,#fa59b2 40%,transparent 80%)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.h1
            data-imagine-id="finalscene-main-title"
            className="relative font-extrabold tracking-wide leading-tight text-transparent bg-clip-text"
            style={{
              fontFamily: "'Baloo 2', cursive, system-ui",
              fontSize: 'clamp(2rem, 7vw, 4.5rem)',
              backgroundImage: 'linear-gradient(135deg, #fff5ff 0%, #f597fe 30%, #fa59b2 60%, #7ecbff 100%)',
            }}
            variants={glowPulse}
            animate="animate"
          >
            I LOVE YOU FOREVER DI THANGAMEYY 💖
          </motion.h1>
        </motion.div>

        <motion.p
          data-imagine-id="finalscene-subtitle"
          variants={fadeUp}
          className="text-lg md:text-2xl font-semibold leading-relaxed"
          style={{
            fontFamily: "'Quicksand', cursive, system-ui",
            color: 'rgba(255,230,255,0.92)',
            textShadow: '0 0 18px #f597fe, 0 0 40px #fa59b2',
          }}
        >
          No matter how many lifetimes exist… I will always choose you, Meera 🌸
        </motion.p>

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mt-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={`bottom-heart-${i}`}
              animate={{ scale: [1, 1.4, 1], y: [0, -8, 0] }}
              transition={{ duration: 2 + i * 0.35, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            >
              <HeartIcon
                size={18 + (i === 2 ? 12 : i % 2 === 0 ? 6 : 0)}
                style={{
                  color: i % 3 === 0 ? '#7ecbff' : i % 2 === 0 ? '#fa59b2' : '#f597fe',
                  filter: `drop-shadow(0 0 8px #fa59b2)`,
                  opacity: 0.85,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-4 px-8 py-5 rounded-3xl border border-white/10 backdrop-blur-md"
          style={{
            background: 'rgba(245,151,254,0.07)',
            boxShadow: '0 0 60px 10px rgba(245,151,254,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <motion.p
            data-imagine-id="finalscene-closing-verse"
            className="text-base md:text-lg text-center leading-relaxed"
            style={{
              fontFamily: "'Quicksand', cursive, system-ui",
              color: 'rgba(255,220,255,0.82)',
              textShadow: '0 0 12px #f597fe',
            }}
            animate={{
              opacity: [0.75, 1, 0.75],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            Like stars find the sky and sakura finds the wind —
            <br />
            my heart finds only you, Meera. Always. 🌸✨
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 mt-6"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HeartIcon
            size={16}
            style={{ color: '#fa59b2', filter: 'drop-shadow(0 0 6px #fa59b2)' }}
          />
          <span
            data-imagine-id="finalscene-signature"
            className="text-sm tracking-widest uppercase"
            style={{
              fontFamily: "'Baloo 2', cursive, system-ui",
              color: 'rgba(245,151,254,0.65)',
              textShadow: '0 0 10px #f597fe',
              letterSpacing: '0.25em',
            }}
          >
            always yours · forever
          </span>
          <HeartIcon
            size={16}
            style={{ color: '#fa59b2', filter: 'drop-shadow(0 0 6px #fa59b2)' }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
