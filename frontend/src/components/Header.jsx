import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const SparkleIcon = Icons['Sparkles'] || Icons['HelpCircle'];

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 w-full"
    >
      <div className="mx-auto max-w-screen-xl px-6 py-3">
        <div
          className="relative flex items-center justify-center rounded-2xl border border-white/20 px-8 py-4 backdrop-blur-xl"
          style={undefined}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-sky-500/10 backdrop-blur-xl" />
          <div className="absolute inset-0 rounded-2xl bg-white/5" />
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-pink-400/20 via-fuchsia-400/10 to-sky-400/20 blur-sm" />

          <motion.div
            className="relative z-10 flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -10, 15, 0], scale: [1, 1.15, 1, 1.1, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
              className="text-pink-300 drop-shadow-[0_0_8px_rgba(245,151,254,0.9)]"
            >
              <SparkleIcon size={20} strokeWidth={1.8} />
            </motion.div>

            <div className="flex flex-col items-center leading-none">
              <motion.span
                data-imagine-id="header-logo-main"
                className="font-['Quicksand',system-ui] text-xl font-bold tracking-wide text-white drop-shadow-[0_0_12px_rgba(245,151,254,0.8)] md:text-2xl"
                animate={{ textShadow: [
                  '0 0 8px rgba(245,151,254,0.6)',
                  '0 0 20px rgba(245,151,254,1)',
                  '0 0 8px rgba(126,203,255,0.6)',
                  '0 0 20px rgba(126,203,255,1)',
                  '0 0 8px rgba(245,151,254,0.6)',
                ] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                Thango&apos;s World
              </motion.span>
              <motion.span
                data-imagine-id="header-logo-subtitle"
                className="font-['Quicksand',system-ui] text-[10px] font-medium tracking-[0.25em] text-pink-200/70 uppercase md:text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                for Meera
              </motion.span>
            </div>

            <motion.div
              animate={{ rotate: [0, -15, 10, -15, 0], scale: [1, 1.15, 1, 1.1, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2, delay: 0.4 }}
              className="text-sky-300 drop-shadow-[0_0_8px_rgba(126,203,255,0.9)]"
            >
              <SparkleIcon size={20} strokeWidth={1.8} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
