import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';

const HeartIcon = Icons['Heart'] || Icons['HelpCircle'];

const PETAL_COUNT = 8;

const PETALS = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  id: i,
  left: `${10 + (i * 11) % 85}%`,
  delay: i * 0.4,
  duration: 4 + (i % 3),
  size: 6 + (i % 4),
  opacity: 0.18 + (i % 5) * 0.06,
}));

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden"
      aria-label="Site footer"
    >
      <div className="absolute inset-0 pointer-events-none">
        {PETALS.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute rounded-full"
            style={{
              left: petal.left,
              width: petal.size,
              height: petal.size,
              background: 'radial-gradient(circle, #f597fe 60%, #fa59b2 100%)',
              filter: 'blur(1px)',
              opacity: petal.opacity,
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={isInView ? {
              y: [0, 18, 0],
              opacity: [petal.opacity, petal.opacity * 1.4, petal.opacity],
              x: [0, 6, -4, 0],
            } : { y: -20, opacity: 0 }}
            transition={{
              delay: petal.delay,
              duration: petal.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        className="relative z-10 mx-auto max-w-3xl px-6 py-6 md:py-8"
      >
        <div
          className="
            rounded-2xl
            border border-white/20
            bg-white/5
            backdrop-blur-xl
            shadow-lg
            px-6 py-5 md:px-10 md:py-6
            flex flex-col items-center gap-3
          "
          style={{
            boxShadow: '0 4px 32px 0 rgba(245,151,254,0.10), 0 1.5px 8px 0 rgba(126,203,255,0.08)',
            borderTop: '1.5px solid rgba(245,151,254,0.22)',
          }}
        >
          <motion.div
            className="flex items-center gap-2"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
          >
            <motion.div
              animate={{ scale: [1, 1.22, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <HeartIcon
                size={15}
                className="text-pink-400"
                fill="currentColor"
                aria-hidden="true"
              />
            </motion.div>
            <p
              data-imagine-id="footer-credit-text"
              className="text-xs md:text-sm font-light tracking-wide text-white/70 font-nunito select-none"
            >
              Made with love for{' '}
              <span
                data-imagine-id="footer-name-highlight"
                className="font-semibold text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #f597fe 0%, #fa59b2 60%, #7ecbff 100%)',
                }}
              >
                Meera (Thango)
              </span>
            </p>
            <motion.div
              animate={{ scale: [1, 1.22, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >
              <HeartIcon
                size={15}
                className="text-violet-300"
                fill="currentColor"
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>

          <motion.p
            data-imagine-id="footer-copyright"
            className="text-xs text-white/35 tracking-widest font-light font-nunito select-none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
          >
            © {year} · pixel-quantum-base
          </motion.p>
        </div>
      </motion.div>
    </footer>
  );
}
