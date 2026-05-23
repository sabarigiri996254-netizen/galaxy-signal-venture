import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import moonlightBg from '../assets/anime_moonlight_purple_blue_dreamy_sky.jpg';
import starsBg from '../assets/anime_night_stars_purple_galaxy_romantic.jpg';

function EmotionalSceneMoon() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const petalCount = 38;
    const petals = Array.from({ length: petalCount }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 4 + Math.random() * 7,
      speedY: 0.5 + Math.random() * 1.2,
      speedX: -0.4 + Math.random() * 0.8,
      opacity: 0.45 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.04,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.012 + Math.random() * 0.018,
      id: i,
    }));

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.8, p.size * 0.9, 0, 0, p.size * 0.6);
      ctx.bezierCurveTo(-p.size * 0.9, 0, -p.size * 0.6, -p.size * 0.8, 0, -p.size);
      ctx.closePath();
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      grad.addColorStop(0, 'rgba(255, 200, 220, 0.95)');
      grad.addColorStop(0.5, 'rgba(245, 151, 254, 0.7)');
      grad.addColorStop(1, 'rgba(250, 89, 178, 0.2)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    let running = true;
    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.drift += p.driftSpeed;
        p.x += p.speedX + Math.sin(p.drift) * 0.6;
        p.y += p.speedY;
        p.angle += p.spin;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        drawPetal(p);
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const starVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: (i) => ({
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.3, 0.8],
      transition: {
        duration: 2.5 + (i % 5) * 0.7,
        repeat: Infinity,
        delay: (i % 7) * 0.4,
        ease: 'easeInOut',
      },
    }),
  };

  const sparklePositions = [
    { top: '12%', left: '8%' }, { top: '18%', left: '22%' },
    { top: '8%', left: '42%' }, { top: '22%', left: '68%' },
    { top: '14%', left: '85%' }, { top: '35%', left: '5%' },
    { top: '30%', left: '92%' }, { top: '55%', left: '3%' },
    { top: '62%', left: '88%' }, { top: '78%', left: '15%' },
    { top: '80%', left: '72%' }, { top: '48%', left: '95%' },
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src={starsBg}
          alt=""
          className="w-full h-full object-cover opacity-60"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#050a1a] via-[#0c0f2a]/80 to-[#1a0828]/90" />

      <motion.div
        className="absolute inset-0 z-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      >
        <img
          src={moonlightBg}
          alt=""
          className="w-full h-full object-cover opacity-30"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </motion.div>

      <div className="absolute inset-0 z-3 bg-gradient-to-b from-transparent via-[#0c0f2a]/30 to-[#050010]/70" />

      {sparklePositions.map((pos, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={starVariants}
          initial="initial"
          animate="animate"
          className="absolute z-4 rounded-full"
          style={{
            top: pos.top,
            left: pos.left,
            width: i % 3 === 0 ? '5px' : i % 3 === 1 ? '3px' : '4px',
            height: i % 3 === 0 ? '5px' : i % 3 === 1 ? '3px' : '4px',
            background: i % 2 === 0
              ? 'radial-gradient(circle, #fff 0%, #7ecbff 60%, transparent 100%)'
              : 'radial-gradient(circle, #fff 0%, #f597fe 60%, transparent 100%)',
            boxShadow: i % 2 === 0 ? '0 0 8px 2px rgba(126,203,255,0.8)' : '0 0 8px 2px rgba(245,151,254,0.8)',
          }}
        />
      ))}

      <motion.div
        className="absolute z-5"
        style={{ top: '8%', right: '12%' }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: 1,
          scale: [1, 1.04, 1],
        }}
        transition={{
          opacity: { duration: 2.5, ease: 'easeOut' },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: 'clamp(160px, 22vw, 280px)',
            height: 'clamp(160px, 22vw, 280px)',
            background: 'radial-gradient(circle at 38% 38%, #fffbe8 0%, #ffefc2 30%, #e8d5a3 60%, #b8a06a 100%)',
            boxShadow: '0 0 80px 40px rgba(255,230,140,0.22), 0 0 160px 80px rgba(245,151,254,0.13), 0 0 240px 120px rgba(126,203,255,0.08)',
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 32% 32%, rgba(255,255,255,0.18) 0%, transparent 60%)',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: '-40px',
            background: 'radial-gradient(circle, rgba(255,225,100,0.10) 0%, rgba(245,151,254,0.07) 50%, transparent 75%)',
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div
        className="absolute inset-x-0 z-6"
        style={{
          bottom: '28%',
          height: '200px',
          background: 'linear-gradient(to top, rgba(245,151,254,0.06) 0%, transparent 100%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-7 w-full h-full"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 z-8 h-40 bg-gradient-to-t from-[#050010] to-transparent" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 lg:px-20 pb-12 pt-8"
        style={{ marginTop: 'clamp(200px, 28vw, 340px)' }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          <div
            className="mx-auto"
            style={{
              width: 'clamp(48px, 8vw, 80px)',
              height: '2px',
              background: 'linear-gradient(to right, transparent, #f597fe, #7ecbff, transparent)',
              borderRadius: '999px',
              boxShadow: '0 0 12px 4px rgba(245,151,254,0.5)',
            }}
          />
        </motion.div>

        <motion.p
          data-imagine-id="emotionalsceneMoon-eyebrow"
          className="font-quicksand text-xs md:text-sm tracking-[0.35em] uppercase mb-5"
          style={{ color: 'rgba(245,151,254,0.75)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
        >
          — for Meera, always —
        </motion.p>

        <motion.h2
          data-imagine-id="emotionalsceneMoon-headline"
          className="font-baloo2 font-bold leading-tight mb-6"
          style={{
            fontSize: 'clamp(1.9rem, 5.5vw, 3.5rem)',
            background: 'linear-gradient(135deg, #ffe4f7 0%, #f597fe 35%, #7ecbff 70%, #ffe4f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 24px rgba(245,151,254,0.45))',
            maxWidth: '720px',
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.65, ease: 'easeOut' }}
        >
          In every lifetime, across every sky —
          <br />
          I would find you.
        </motion.h2>

        <motion.p
          data-imagine-id="emotionalsceneMoon-subquote"
          className="font-quicksand text-base md:text-lg max-w-lg leading-relaxed mb-10"
          style={{ color: 'rgba(200,220,255,0.72)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.85, ease: 'easeOut' }}
        >
          The moon remembers your name the way my heart does — without trying, without stopping.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 1.05, ease: 'easeOut' }}
        >
          <div
            className="px-8 py-3 rounded-full"
            style={{
              background: 'rgba(245,151,254,0.08)',
              border: '1px solid rgba(245,151,254,0.25)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 32px 8px rgba(245,151,254,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <p
              data-imagine-id="emotionalsceneMoon-attribution"
              className="font-quicksand text-xs tracking-widest uppercase"
              style={{ color: 'rgba(126,203,255,0.65)' }}
            >
              Thango &amp; Meera · Forever Written in Moonlight
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.3, ease: 'easeOut' }}
        >
          <div
            className="mx-auto"
            style={{
              width: 'clamp(48px, 8vw, 80px)',
              height: '2px',
              background: 'linear-gradient(to right, transparent, #7ecbff, #f597fe, transparent)',
              borderRadius: '999px',
              boxShadow: '0 0 12px 4px rgba(126,203,255,0.5)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default EmotionalSceneMoon;
