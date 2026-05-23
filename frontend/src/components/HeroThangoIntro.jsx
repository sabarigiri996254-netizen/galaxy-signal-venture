import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import sakuraNightImg from '../assets/anime_sakura_cherry_blossom_night_sky_romantic.jpg';

const HeartIcon = Icons['Heart'] || Icons['HelpCircle'];
const ChevronDownIcon = Icons['ChevronDown'] || Icons['HelpCircle'];

const PETAL_COUNT = 18;

const generatePetals = () =>
  Array.from({ length: PETAL_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 7 + Math.random() * 6,
    size: 10 + Math.random() * 14,
    rotate: Math.random() * 360,
    drift: (Math.random() - 0.5) * 120,
  }));

const STARS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: 1.5 + Math.random() * 2.5,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 3,
}));

export default function HeroThangoIntro() {
  const [petals] = useState(generatePetals);
  const [heartPulse, setHeartPulse] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartPulse(prev => !prev);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const handleEnterStory = () => {
    const target = document.getElementById('love-story');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: 'easeOut' },
    },
  };

  const moonVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.4, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={sakuraNightImg}
          alt="Anime sakura night sky"
          data-imagine-id="herothangrointro-bg-image"
          className="w-full h-full object-cover object-center"
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0820]/80 via-[#1a0933]/70 to-[#0a0618]/90" />
      </div>

      {STARS.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white z-10 pointer-events-none"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        className="absolute top-10 right-16 md:top-16 md:right-28 z-10 pointer-events-none"
        variants={moonVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative">
          <div
            className="rounded-full bg-gradient-to-br from-[#fffbe6] to-[#ffd6f0]"
            style={{ width: '110px', height: '110px' }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: '0 0 60px 30px rgba(255, 200, 230, 0.45), 0 0 120px 60px rgba(245, 151, 254, 0.18)',
            }}
          />
        </div>
      </motion.div>

      {petals.map(petal => (
        <motion.div
          key={petal.id}
          className="absolute z-10 pointer-events-none"
          style={{ left: `${petal.left}%`, top: '-5%' }}
          animate={{
            y: ['0vh', '115vh'],
            x: [0, petal.drift],
            rotate: [petal.rotate, petal.rotate + 360],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'easeIn',
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="12" cy="12" rx="7" ry="11" fill="#f9a8d4" opacity="0.88" />
            <ellipse cx="12" cy="12" rx="4" ry="7" fill="#fce7f3" opacity="0.6" transform="rotate(45 12 12)" />
          </svg>
        </motion.div>
      ))}

      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-6 py-16 md:py-24 max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-8 relative"
          variants={itemVariants}
        >
          <div
            className="rounded-3xl px-10 py-12 md:px-14 md:py-16 flex flex-col items-center gap-6"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              border: '1.5px solid rgba(245, 151, 254, 0.25)',
              boxShadow: '0 8px 64px 0 rgba(245, 151, 254, 0.18), 0 2px 24px 0 rgba(126, 203, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.12)',
            }}
          >
            <motion.div
              className="flex items-center justify-center"
              animate={{ scale: heartPulse ? 1.25 : 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <HeartIcon
                size={38}
                className="text-pink-400"
                fill="#f472b6"
                aria-hidden="true"
              />
            </motion.div>

            <motion.h1
              data-imagine-id="herothangrointro-title"
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
              style={{
                fontFamily: "'Baloo 2', 'Quicksand', cursive, system-ui",
                background: 'linear-gradient(135deg, #f9a8d4 0%, #f597fe 40%, #7ecbff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 18px rgba(245,151,254,0.55))',
              }}
              variants={itemVariants}
            >
              For My Meera
            </motion.h1>

            <motion.p
              data-imagine-id="herothangrointro-subtitle"
              className="text-base md:text-lg text-pink-100/85 italic max-w-md leading-relaxed"
              style={{
                fontFamily: "'Quicksand', 'Noto Sans JP', cursive, system-ui",
                textShadow: '0 0 24px rgba(245, 151, 254, 0.35)',
              }}
              variants={itemVariants}
            >
              In a world full of temporary things, you became my forever
            </motion.p>

            <motion.button
              data-imagine-id="herothangrointro-cta"
              onClick={handleEnterStory}
              className="mt-2 flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-white text-base md:text-lg tracking-wide cursor-pointer select-none"
              style={{
                fontFamily: "'Baloo 2', 'Quicksand', system-ui",
                background: 'linear-gradient(135deg, #fa59b2 0%, #f597fe 55%, #7ecbff 100%)',
                boxShadow: '0 0 32px 8px rgba(245, 89, 178, 0.45), 0 4px 20px rgba(245, 151, 254, 0.35)',
              }}
              variants={itemVariants}
              whileHover={{
                scale: 1.07,
                boxShadow: '0 0 52px 16px rgba(245, 89, 178, 0.6), 0 4px 32px rgba(245, 151, 254, 0.5)',
              }}
              whileTap={{ scale: 0.96 }}
              aria-label="Enter Our Story"
            >
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <HeartIcon size={20} fill="white" className="text-white" aria-hidden="true" />
              </motion.span>
              <span data-imagine-id="herothangrointro-cta-label">Enter Our Story</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="mt-4 flex flex-col items-center gap-2"
          variants={itemVariants}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <ChevronDownIcon size={26} className="text-pink-300/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
