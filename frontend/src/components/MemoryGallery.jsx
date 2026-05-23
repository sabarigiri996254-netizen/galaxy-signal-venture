import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import img1 from '../assets/anime_moonlight_purple_blue_dreamy_sky.jpg';
import img2 from '../assets/anime_night_stars_purple_galaxy_romantic.jpg';
import img3 from '../assets/anime_romantic_couple_silhouette_sunset.jpg';
import img4 from '../assets/anime_sakura_cherry_blossom_night_sky_romantic.jpg';
import img5 from '../assets/soft_pink_sakura_petals_bokeh_dreamy.jpg';

const HeartIcon = Icons['Heart'] || Icons['HelpCircle'];
const XIcon = Icons['X'] || Icons['HelpCircle'];
const SparklesIcon = Icons['Sparkles'] || Icons['HelpCircle'];

const MEMORIES = [
  { id: 1, src: img1, label: 'Moonlit Evenings', caption: 'Every night sky reminds me of you', color: 'from-violet-400/40 to-blue-400/40' },
  { id: 2, src: img2, label: 'Starry Galaxy', caption: 'Lost among a thousand stars, found in your eyes', color: 'from-indigo-400/40 to-purple-400/40' },
  { id: 3, src: img3, label: 'Golden Silhouette', caption: 'Two souls painted by the setting sun', color: 'from-rose-400/40 to-orange-300/40' },
  { id: 4, src: img4, label: 'Sakura Nights', caption: 'Petals falling only for us', color: 'from-pink-400/40 to-fuchsia-400/40' },
  { id: 5, src: img5, label: 'Dreamy Bloom', caption: 'Soft like spring, warm like love', color: 'from-pink-300/40 to-rose-300/40' },
];

const PETAL_COUNT = 18;
const PARTICLE_COUNT = 22;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const petalDefs = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  id: i,
  left: randomBetween(0, 100),
  delay: randomBetween(0, 12),
  duration: randomBetween(8, 18),
  size: randomBetween(10, 22),
  rotation: randomBetween(-30, 30),
  drift: randomBetween(-60, 60),
}));

const particleDefs = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: randomBetween(2, 98),
  top: randomBetween(5, 95),
  size: randomBetween(3, 8),
  delay: randomBetween(0, 6),
  duration: randomBetween(3, 7),
}));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 16 },
  },
};

function MemoryCard({ memory, index, onTap }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -14,
        scale: 1.045,
        boxShadow: '0 0 48px 8px rgba(245, 151, 254, 0.55), 0 8px 40px rgba(126, 203, 255, 0.35)',
        transition: { type: 'spring', stiffness: 260, damping: 18 },
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onTap(memory)}
      className="relative flex-shrink-0 w-64 md:w-72 cursor-pointer rounded-3xl overflow-hidden select-none"
      style={{}}
      data-imagine-id={`memorygallery-card-${index}-wrapper`}
    >
      <div className="absolute inset-0 rounded-3xl pointer-events-none z-10" style={{ boxShadow: 'inset 0 0 0 1.5px rgba(245,151,254,0.38), inset 0 0 24px 2px rgba(245,151,254,0.12)' }} />
      <img
        src={memory?.src}
        alt={memory?.label}
        className="w-full h-72 md:h-80 object-cover block"
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/320x360/1a0a2e/f597fe?text=Memory'; }}
        data-imagine-id={`memorygallery-card-${index}-img`}
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${memory?.color} from-black/60 via-transparent to-transparent`} />
      <div className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-sm bg-white/5 border-t border-white/10">
        <p className="text-white font-semibold text-base tracking-wide mb-1" data-imagine-id={`memorygallery-card-${index}-label`}>{memory?.label}</p>
        <p className="text-pink-200 text-xs leading-relaxed" data-imagine-id={`memorygallery-card-${index}-caption`}>{memory?.caption}</p>
      </div>
      <div className="absolute top-4 right-4 z-20">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-pink-300/30"
        >
          <HeartIcon size={13} className="text-pink-300" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function ExpandedCard({ memory, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.75, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl"
        style={{ boxShadow: '0 0 80px 18px rgba(245,151,254,0.45), 0 0 40px 6px rgba(126,203,255,0.3)' }}
      >
        <motion.div
          animate={{ boxShadow: ['0 0 40px 8px rgba(245,151,254,0.4)', '0 0 70px 18px rgba(245,151,254,0.7)', '0 0 40px 8px rgba(245,151,254,0.4)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-3xl overflow-hidden"
        >
          <img
            src={memory?.src}
            alt={memory?.label}
            className="w-full h-80 object-cover block"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x360/1a0a2e/f597fe?text=Memory'; }}
            data-imagine-id="memorygallery-expanded-img"
          />
        </motion.div>
        <div className="bg-gradient-to-b from-[#1a0a2e]/90 to-[#0d0520]/95 backdrop-blur-xl px-7 py-6 border-t border-pink-300/20">
          <p className="text-white text-xl font-bold mb-2 tracking-wide" data-imagine-id="memorygallery-expanded-label">{memory?.label}</p>
          <p className="text-pink-200 text-sm leading-relaxed" data-imagine-id="memorygallery-expanded-caption">{memory?.caption}</p>
          <div className="flex items-center gap-2 mt-4">
            <SparklesIcon size={14} className="text-fuchsia-300" />
            <span className="text-fuchsia-300 text-xs tracking-widest uppercase" data-imagine-id="memorygallery-expanded-badge">A memory with Meera</span>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close memory card"
          className="absolute top-3 right-3 z-20 bg-black/40 hover:bg-pink-500/30 backdrop-blur-md rounded-full p-2 border border-white/20 transition-colors duration-200"
          data-imagine-id="memorygallery-expanded-close"
        >
          <XIcon size={16} className="text-white" />
        </button>
      </motion.div>
    </motion.div>
  );
}

function MemoryGallery() {
  const [selected, setSelected] = useState(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' });
  }, []);

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden" aria-label="Memory Gallery">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0520] via-[#1a0635] to-[#0a1a3a] -z-20" />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {petalDefs.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: `${p.left}%`, top: '-32px', width: p.size, height: p.size }}
            animate={{
              y: ['0px', '110vh'],
              x: [0, p.drift],
              rotate: [p.rotation, p.rotation + 180],
              opacity: [0, 0.85, 0.7, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={p.size} height={p.size}>
              <ellipse cx="12" cy="14" rx="7" ry="10" fill="rgba(245,151,254,0.55)" transform="rotate(-20 12 12)" />
              <ellipse cx="12" cy="14" rx="7" ry="10" fill="rgba(250,89,178,0.35)" transform="rotate(20 12 12)" />
            </svg>
          </motion.div>
        ))}
        {particleDefs.map((pt) => (
          <motion.div
            key={pt.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${pt.left}%`, top: `${pt.top}%`, width: pt.size, height: pt.size, opacity: 0.18 }}
            animate={{ opacity: [0.1, 0.55, 0.1], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: pt.duration, delay: pt.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-pink-400/25 rounded-full px-5 py-2 mb-5">
            <SparklesIcon size={14} className="text-fuchsia-300" />
            <span className="text-fuchsia-300 text-xs tracking-widest uppercase font-semibold" data-imagine-id="memorygallery-section-tag">Our Memories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight" data-imagine-id="memorygallery-heading">
            Frames of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f597fe] via-[#fa59b2] to-[#7ecbff]">Us</span>
          </h2>
          <p className="text-pink-200/70 text-base md:text-lg max-w-md mx-auto" data-imagine-id="memorygallery-subheading">
            Every picture holds a heartbeat, a laugh, a moment frozen just for us.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                key="btn-left"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 bg-white/10 hover:bg-pink-500/25 backdrop-blur-md border border-pink-300/30 rounded-full p-3 transition-all duration-200 shadow-lg hidden md:flex items-center justify-center"
                data-imagine-id="memorygallery-scroll-left"
              >
                {(() => { const ChevronLeft = Icons['ChevronLeft'] || Icons['HelpCircle']; return <ChevronLeft size={18} className="text-white" />; })()}
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {canScrollRight && (
              <motion.button
                key="btn-right"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 bg-white/10 hover:bg-pink-500/25 backdrop-blur-md border border-pink-300/30 rounded-full p-3 transition-all duration-200 shadow-lg hidden md:flex items-center justify-center"
                data-imagine-id="memorygallery-scroll-right"
              >
                {(() => { const ChevronRight = Icons['ChevronRight'] || Icons['HelpCircle']; return <ChevronRight size={18} className="text-white" />; })()}
              </motion.button>
            )}
          </AnimatePresence>

          <div
            ref={scrollRef}
            className="overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <motion.div
              className="flex gap-6 md:gap-8 w-max px-2 md:px-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {MEMORIES.map((memory, index) => (
                <MemoryCard
                  key={memory?.id}
                  memory={memory}
                  index={index}
                  onTap={setSelected}
                />
              ))}
            </motion.div>
          </div>

          <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-[#0d0520] to-transparent pointer-events-none rounded-l-3xl" />
          <div className="absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-[#0a1a3a] to-transparent pointer-events-none rounded-r-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          className="flex justify-center mt-10 gap-2"
        >
          {MEMORIES.map((m, i) => (
            <motion.div
              key={m?.id}
              className="rounded-full bg-pink-400/30 border border-pink-400/40"
              animate={{ scale: selected?.id === m.id ? 1.4 : 1, backgroundColor: selected?.id === m.id ? 'rgba(245,151,254,0.7)' : 'rgba(245,151,254,0.25)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ width: 8, height: 8 }}
              data-imagine-id={`memorygallery-dot-${i}`}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <ExpandedCard memory={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0520] to-transparent pointer-events-none" />
    </section>
  );
}

export default MemoryGallery;
