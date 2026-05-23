import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import moonlitSky from '../assets/anime_moonlight_purple_blue_dreamy_sky.jpg';

const TYPEWRITER_TEXT = "Loading Thango's World\u2026";

const PETAL_COUNT = 18;
const STAR_COUNT = 60;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const petalsRef = useRef([]);
  const starsRef = useRef([]);
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      r: randomBetween(0.5, 2.2),
      alpha: randomBetween(0.3, 1),
      speed: randomBetween(0.003, 0.012),
      phase: randomBetween(0, Math.PI * 2),
    }));

    petalsRef.current = Array.from({ length: PETAL_COUNT }, () => ({
      x: randomBetween(0, canvas.width),
      y: randomBetween(-canvas.height, 0),
      r: randomBetween(4, 9),
      vx: randomBetween(-0.6, 0.6),
      vy: randomBetween(0.5, 1.6),
      rot: randomBetween(0, Math.PI * 2),
      rotSpeed: randomBetween(-0.02, 0.02),
      alpha: randomBetween(0.55, 0.9),
    }));

    let t = 0;

    function draw() {
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((s) => {
        const a = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed * 60 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 230, 255, ${a})`;
        ctx.shadowColor = '#f597fe';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      petalsRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;
        if (p.y > canvas.height + 20) {
          p.y = randomBetween(-40, -10);
          p.x = randomBetween(0, canvas.width);
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 1.7, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#fa59b2';
        ctx.shadowColor = '#f597fe';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
        ctx.globalAlpha = 1;
      });

      animFrameRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayedText(TYPEWRITER_TEXT.slice(0, i));
      if (i >= TYPEWRITER_TEXT.length) {
        clearInterval(interval);
        setTimeout(() => setTypingDone(true), 900);
      }
    }, 68);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!typingDone) return;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 800);
    }, 600);
    return () => clearTimeout(timer);
  }, [typingDone, onComplete]);

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          <img
            src={moonlitSky}
            alt="moonlit sky background"
            data-imagine-id="loading-screen-bg-image"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0018]/70 via-[#120030]/60 to-[#00091a]/80" />

          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
            className="relative z-10 flex flex-col items-center gap-8 px-6 md:px-12 text-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_40px_8px_rgba(245,151,254,0.25)]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-transparent border-t-[#f597fe] border-r-[#7ecbff]"
              />
            </div>

            <div className="min-h-[3.5rem] md:min-h-[4.5rem] flex items-center justify-center">
              <h1
                data-imagine-id="loading-screen-typewriter-text"
                className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-wide text-white"
                style={{}}
              >
                <span
                  className=""
                  style={{
                    textShadow: '0 0 24px #f597fe, 0 0 48px #fa59b2, 0 0 8px #fff',
                  }}
                >
                  {displayedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.75, ease: 'easeInOut' }}
                    className="inline-block w-[3px] h-[1.1em] align-middle ml-1 bg-[#fa59b2] rounded-sm"
                  />
                </span>
              </h1>
            </div>

            {typingDone && (
              <motion.p
                data-imagine-id="loading-screen-ready-text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="text-sm md:text-base text-white/60 tracking-widest uppercase font-light"
                style={{ textShadow: '0 0 12px #7ecbff88' }}
              >
                Opening your story…
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, #f597fe 0%, transparent 70%)', filter: 'blur(40px)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
