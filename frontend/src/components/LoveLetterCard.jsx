import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import sakuraBg from '../assets/anime_sakura_cherry_blossom_night_sky_romantic.jpg';

const HeartIcon = Icons['Heart'] || Icons['HelpCircle'];
const StarIcon = Icons['Sparkles'] || Icons['HelpCircle'];

const SAKURA_PETALS = [
  { id: 1, x: '8%', delay: 0, duration: 7, size: 10, rotate: 25 },
  { id: 2, x: '22%', delay: 1.2, duration: 9, size: 8, rotate: -40 },
  { id: 3, x: '41%', delay: 0.5, duration: 8, size: 12, rotate: 15 },
  { id: 4, x: '63%', delay: 2.1, duration: 10, size: 9, rotate: -20 },
  { id: 5, x: '78%', delay: 0.8, duration: 7.5, size: 11, rotate: 50 },
  { id: 6, x: '90%', delay: 1.7, duration: 8.5, size: 8, rotate: -35 },
  { id: 7, x: '15%', delay: 3.0, duration: 9.5, size: 10, rotate: 30 },
  { id: 8, x: '55%', delay: 2.5, duration: 7.2, size: 7, rotate: -10 },
];

const SPARKLES = [
  { id: 1, x: '5%', y: '15%', delay: 0, size: 5 },
  { id: 2, x: '92%', y: '20%', delay: 0.8, size: 4 },
  { id: 3, x: '12%', y: '75%', delay: 1.5, size: 6 },
  { id: 4, x: '85%', y: '68%', delay: 0.4, size: 5 },
  { id: 5, x: '50%', y: '5%', delay: 1.0, size: 4 },
  { id: 6, x: '70%', y: '90%', delay: 2.0, size: 5 },
  { id: 7, x: '30%', y: '88%', delay: 0.6, size: 3 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.1, ease: 'easeOut' },
  },
};

export default function LoveLetterCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [heartPulse, setHeartPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartPulse((prev) => !prev);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20 px-4"
      aria-label="Love letter section"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={sakuraBg}
          alt="Sakura night sky"
          data-imagine-id="loveletter-bg-image"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/70 via-purple-950/60 to-pink-950/70" />
      </div>

      {SAKURA_PETALS.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-0 z-10 pointer-events-none"
          style={{ left: petal.x }}
          initial={{ y: -30, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '115vh'],
            opacity: [0, 0.85, 0.85, 0],
            rotate: [0, petal.rotate * 3, petal.rotate * 6],
            x: [0, 18, -12, 8],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={petal.size * 2}
            height={petal.size * 2}
            viewBox="0 0 24 24"
            fill="none"
          >
            <ellipse
              cx="12"
              cy="12"
              rx="6"
              ry="10"
              fill="#f9a8d4"
              opacity="0.82"
              transform={`rotate(${petal.rotate}, 12, 12)`}
            />
            <ellipse
              cx="12"
              cy="12"
              rx="6"
              ry="10"
              fill="#fbcfe8"
              opacity="0.5"
              transform={`rotate(${petal.rotate + 60}, 12, 12)`}
            />
          </svg>
        </motion.div>
      ))}

      {SPARKLES.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute z-10 pointer-events-none"
          style={{ left: spark.x, top: spark.y }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 2.5,
            delay: spark.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <StarIcon
            size={spark.size + 6}
            className="text-pink-200 drop-shadow"
            strokeWidth={1.5}
          />
        </motion.div>
      ))}

      <motion.div
        className="relative z-20 w-full max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <motion.div
            animate={{ scale: heartPulse ? 1.22 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="p-3 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(250,89,178,0.35) 0%, rgba(124,58,237,0.10) 80%)',
              boxShadow: '0 0 32px 8px rgba(250,89,178,0.35)',
            }}
          >
            <HeartIcon
              size={36}
              className="text-pink-400"
              fill="rgba(250,89,178,0.7)"
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          data-imagine-id="loveletter-heading"
          className="text-center font-bold tracking-wide mb-2 text-transparent bg-clip-text"
          style={{
            fontFamily: "'Baloo 2', 'Quicksand', cursive, system-ui",
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            backgroundImage:
              'linear-gradient(135deg, #f9a8d4 0%, #c084fc 50%, #7ecbff 100%)',
            textShadow: 'none',
          }}
        >
          A Letter for You, Meera
        </motion.h2>

        <motion.p
          variants={itemVariants}
          data-imagine-id="loveletter-subtitle"
          className="text-center text-pink-200/70 mb-10 tracking-widest uppercase"
          style={{
            fontFamily: "'Quicksand', system-ui",
            fontSize: 'clamp(0.65rem, 2vw, 0.78rem)',
            letterSpacing: '0.22em',
          }}
        >
          Written from every corner of my heart
        </motion.p>

        <motion.div
          variants={cardVariants}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.018, y: -4 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative rounded-3xl p-10 md:p-14 overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(196,181,253,0.08) 50%, rgba(126,203,255,0.07) 100%)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            border: '1.5px solid rgba(249,168,212,0.25)',
            boxShadow: isHovered
              ? '0 0 80px 24px rgba(250,89,178,0.22), 0 0 40px 8px rgba(124,58,237,0.18), inset 0 1px 0 rgba(255,255,255,0.13)'
              : '0 0 48px 12px rgba(250,89,178,0.13), 0 0 24px 4px rgba(124,58,237,0.10), inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
          aria-label="Love letter card"
        >
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{ opacity: isHovered ? 0.18 : 0.07 }}
            transition={{ duration: 0.5 }}
            style={{
              background:
                'radial-gradient(ellipse at 60% 30%, #f597fe 0%, transparent 65%), radial-gradient(ellipse at 30% 80%, #7ecbff 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 space-y-8">
            <motion.p
              variants={itemVariants}
              data-imagine-id="loveletter-paragraph-one"
              className="leading-relaxed text-pink-50/90"
              style={{
                fontFamily: "'Baloo 2', 'Noto Sans JP', system-ui",
                fontSize: 'clamp(1rem, 2.5vw, 1.13rem)',
                lineHeight: '1.95',
              }}
            >
              Meera — every time I think of you, the world quiets down. Like
              those moments in films when the cherry blossoms drift in slow
              motion, and everything feels suspended in something too beautiful
              to name. That is what you do to time. You make it softer. You make
              it worth every second. In a universe of infinite threads and
              timelines, I keep finding you — woven into the very fabric of the
              places I call home.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 justify-center"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="block rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background:
                      'linear-gradient(135deg, #f597fe, #7ecbff)',
                    boxShadow: '0 0 8px 2px rgba(245,151,254,0.5)',
                  }}
                />
              ))}
            </motion.div>

            <motion.p
              variants={itemVariants}
              data-imagine-id="loveletter-paragraph-two"
              className="leading-relaxed text-pink-50/90"
              style={{
                fontFamily: "'Baloo 2', 'Noto Sans JP', system-ui",
                fontSize: 'clamp(1rem, 2.5vw, 1.13rem)',
                lineHeight: '1.95',
              }}
            >
              You are my moonlight through the longest nights, my quiet strength
              when the stars feel far away. Loving you feels like standing at the
              edge of a dream — where the sky melts into pink and the whole world
              smells like rain and sakura petals. Whatever distance separates us,
              I carry you like a constellation — always overhead, always guiding,
              always mine. You are the thread connecting every beautiful moment
              I have ever wished to live twice. I love you, endlessly — Thango.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex justify-end items-center gap-2 pt-4 border-t border-pink-300/15"
            >
              <span
                data-imagine-id="loveletter-signature"
                className="text-pink-300/80 italic"
                style={{
                  fontFamily: "cursive, 'Baloo 2', system-ui",
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                }}
              >
                Always yours, Thango
              </span>
              <HeartIcon
                size={16}
                className="text-pink-400"
                fill="rgba(250,89,178,0.6)"
                strokeWidth={1.5}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
