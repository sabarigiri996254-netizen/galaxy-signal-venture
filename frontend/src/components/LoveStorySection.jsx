import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import sakuraBg from '../assets/anime_sakura_cherry_blossom_night_sky_romantic.jpg';

const HeartIcon = Icons['Heart'] || Icons['HelpCircle'];

const START_DATE = new Date('2025-04-17T00:00:00');

function calcTimeDiff(from) {
  const now = new Date();
  const totalMs = Math.max(0, now - from);
  const totalSeconds = Math.floor(totalMs / 1000);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const totalDays = Math.floor(totalSeconds / 86400);
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;
  return { years, months, days, hours, minutes, totalDays };
}

const COUNTER_UNITS = [
  { key: 'years', label: 'Years' },
  { key: 'months', label: 'Months' },
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
];

function SakuraCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const petalsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function randomPetal() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: 6 + Math.random() * 8,
        speedY: 0.6 + Math.random() * 1.2,
        speedX: -0.5 + Math.random() * 1.0,
        angle: Math.random() * Math.PI * 2,
        spin: 0.01 + Math.random() * 0.03,
        opacity: 0.5 + Math.random() * 0.5,
        hue: 340 + Math.random() * 20,
      };
    }

    for (let i = 0; i < 38; i++) {
      const p = randomPetal();
      p.y = Math.random() * canvas.height;
      petalsRef.current.push(p);
    }

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      grad.addColorStop(0, `hsla(${p.hue}, 90%, 88%, 1)`);
      grad.addColorStop(1, `hsla(${p.hue}, 80%, 72%, 0.3)`);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petalsRef.current.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.015) * 0.4;
        p.angle += p.spin;
        if (p.y > canvas.height + 20) {
          Object.assign(p, randomPetal());
        }
        drawPetal(p);
      });
      animRef.current = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

function FloatingHeart({ style, delay, size }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, y: 30, scale: 0.6 }}
      animate={{
        opacity: [0, 0.7, 0.4, 0.7, 0],
        y: [30, -80, -160],
        scale: [0.6, 1.1, 0.9, 1.0, 0.7],
        x: [0, 12, -8, 6, 0],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <HeartIcon
        size={size}
        className="text-pink-400 drop-shadow-lg"
        style={{ filter: 'drop-shadow(0 0 8px #fa59b2aa)' }}
      />
    </motion.div>
  );
}

const HEARTS = [
  { left: '8%', top: '60%', delay: 0, size: 14 },
  { left: '18%', top: '75%', delay: 1.5, size: 10 },
  { left: '78%', top: '65%', delay: 0.7, size: 16 },
  { left: '88%', top: '78%', delay: 2.2, size: 11 },
  { left: '50%', top: '80%', delay: 3.1, size: 13 },
  { left: '35%', top: '70%', delay: 4.0, size: 9 },
  { left: '65%', top: '55%', delay: 1.1, size: 12 },
];

function CounterDigit({ value, label, pulse }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={pulse ? { scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <motion.div
        key={value}
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative flex items-center justify-center rounded-2xl
          bg-white/10 backdrop-blur-md border border-white/20
          shadow-lg px-3 py-3 md:px-5 md:py-4 min-w-[54px] md:min-w-[72px]"
        style={{
          boxShadow: '0 0 18px 2px #f597fe44, 0 2px 16px #7ecbff33',
        }}
      >
        <span
          data-imagine-id={`lovestory-counter-value-${label?.toLowerCase()}`}
          className="font-bold text-2xl md:text-4xl text-white tracking-tight"
          style={{
            fontFamily: "'Baloo 2', cursive",
            textShadow: '0 0 16px #f597fecc, 0 0 4px #fff',
          }}
        >
          {String(value)?.padStart(2, '0')}
        </span>
      </motion.div>
      <span
        data-imagine-id={`lovestory-counter-label-${label?.toLowerCase()}`}
        className="mt-2 text-xs md:text-sm font-semibold tracking-widest uppercase"
        style={{
          fontFamily: "'Quicksand', sans-serif",
          color: '#f597fe',
          textShadow: '0 0 8px #f597fe99',
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function LoveStorySection() {
  const [time, setTime] = useState(() => calcTimeDiff(START_DATE));
  const [pulsed, setPulsed] = useState(false);
  const prevMin = useRef(time?.minutes);

  useEffect(() => {
    const id = setInterval(() => {
      const next = calcTimeDiff(START_DATE);
      setTime(next);
      if (next?.minutes !== prevMin.current) {
        prevMin.current = next?.minutes;
        setPulsed(true);
        setTimeout(() => setPulsed(false), 400);
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.13, delayChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '620px' }}
      aria-label="Love Story Section"
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'linear-gradient(160deg, #0b0628 0%, #1a0a3a 30%, #2d1255 55%, #4a1560 75%, #1e0b3c 100%)',
        }}
      />
      <img
        src={sakuraBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none select-none"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 30%, #7ecbff18 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 70%, #f597fe14 0%, transparent 60%)',
        }}
      />

      <SakuraCanvas />

      {HEARTS.map((h, i) => (
        <FloatingHeart
          key={i}
          style={{ left: h?.left, top: h?.top }}
          delay={h?.delay}
          size={h?.size}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-20 md:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="w-full max-w-2xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={childVariants} className="mb-3">
            <span
              data-imagine-id="lovestory-eyebrow"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                fontFamily: "'Quicksand', sans-serif",
                background: 'rgba(245,151,254,0.13)',
                border: '1px solid rgba(245,151,254,0.30)',
                color: '#f597fe',
                backdropFilter: 'blur(8px)',
                textShadow: '0 0 8px #f597fe88',
              }}
            >
              <HeartIcon size={12} className="inline" />
              Our Love Story
            </span>
          </motion.div>

          <motion.h2
            variants={childVariants}
            data-imagine-id="lovestory-title"
            className="text-center text-3xl md:text-5xl font-bold leading-tight mb-2"
            style={{
              fontFamily: "'Baloo 2', cursive",
              background: 'linear-gradient(120deg, #ffd6f0 0%, #f597fe 40%, #7ecbff 80%, #ffd6f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 18px #f597fe88)',
            }}
          >
            Together Since April 17, 2025
          </motion.h2>

          <motion.div variants={childVariants} className="mb-8">
            <span
              data-imagine-id="lovestory-subtitle"
              className="block text-center text-base md:text-lg"
              style={{
                fontFamily: "'Quicksand', sans-serif",
                color: '#ffd6f0cc',
                textShadow: '0 0 12px #f597fe55',
              }}
            >
              Every second with you is a precious memory ✦
            </span>
          </motion.div>

          <motion.div
            variants={childVariants}
            className="w-full"
          >
            <motion.div
              animate={pulsed ? { scale: [1, 1.025, 1] } : {}}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-full rounded-3xl p-8 md:p-12 flex flex-col items-center"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(245,151,254,0.22)',
                boxShadow:
                  '0 0 48px 4px #f597fe22, 0 0 80px 8px #7ecbff11, 0 8px 48px rgba(0,0,0,0.35)',
              }}
            >
              <div className="absolute top-4 right-5 opacity-30 pointer-events-none select-none">
                <HeartIcon size={22} className="text-pink-300" />
              </div>
              <div className="absolute bottom-5 left-5 opacity-20 pointer-events-none select-none">
                <HeartIcon size={16} className="text-sky-300" />
              </div>

              <p
                data-imagine-id="lovestory-counter-heading"
                className="text-sm font-semibold tracking-widest uppercase mb-7 text-center"
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  color: '#7ecbffcc',
                  textShadow: '0 0 8px #7ecbff88',
                  letterSpacing: '0.18em',
                }}
              >
                We have been in love for
              </p>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full">
                {COUNTER_UNITS.map((unit) => (
                  <CounterDigit
                    key={unit?.key}
                    value={time?.[unit?.key] ?? 0}
                    label={unit?.label}
                    pulse={pulsed && unit?.key === 'minutes'}
                  />
                ))}
              </div>

              <motion.div
                className="mt-8 flex items-center gap-2"
                animate={pulsed ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 0.35 }}
              >
                <HeartIcon
                  size={16}
                  className="text-pink-400"
                  style={{ filter: 'drop-shadow(0 0 6px #fa59b2cc)' }}
                />
                <span
                  data-imagine-id="lovestory-days-total"
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: "'Quicksand', sans-serif",
                    color: '#ffd6f0bb',
                    textShadow: '0 0 8px #f597fe66',
                  }}
                >
                  {time?.totalDays ?? 0} beautiful days together
                </span>
                <HeartIcon
                  size={16}
                  className="text-pink-400"
                  style={{ filter: 'drop-shadow(0 0 6px #fa59b2cc)' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.p
            variants={childVariants}
            data-imagine-id="lovestory-closing"
            className="mt-8 text-center text-sm md:text-base max-w-sm"
            style={{
              fontFamily: "'Quicksand', sans-serif",
              color: '#ffd6f099',
              textShadow: '0 0 10px #f597fe44',
              lineHeight: 1.8,
            }}
          >
            Every heartbeat, every breath — counted and cherished, always for you, Meera.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}