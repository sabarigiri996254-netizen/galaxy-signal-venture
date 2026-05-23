import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';
import Header from '../components/Header';
import HeroThangoIntro from '../components/HeroThangoIntro';
import LoveStorySection from '../components/LoveStorySection';
import LoveLetterCard from '../components/LoveLetterCard';
import MemoryGallery from '../components/MemoryGallery';
import EmotionalSceneMoon from '../components/EmotionalSceneMoon';
import FinalSceneMessage from '../components/FinalSceneMessage';
import Footer from '../components/Footer';

const SuspenseFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <motion.div
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className="w-8 h-8 rounded-full border-2 border-t-[#f597fe] border-r-[#7ecbff] border-b-transparent border-l-transparent"
    />
  </div>
);

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-[#0a0416] overflow-x-hidden">
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative w-full"
      >
        <Header />

        <main className="relative w-full">
          <section id="hero" className="relative w-full">
            <HeroThangoIntro />
          </section>

          <section id="love-story" className="relative w-full">
            <Suspense fallback={<SuspenseFallback />}>
              <LoveStorySection />
            </Suspense>
          </section>

          <section id="love-letter" className="relative w-full">
            <Suspense fallback={<SuspenseFallback />}>
              <LoveLetterCard />
            </Suspense>
          </section>

          <section id="memories" className="relative w-full">
            <Suspense fallback={<SuspenseFallback />}>
              <MemoryGallery />
            </Suspense>
          </section>

          <section id="moonlit-scene" className="relative w-full">
            <Suspense fallback={<SuspenseFallback />}>
              <EmotionalSceneMoon />
            </Suspense>
          </section>

          <section id="final-message" className="relative w-full">
            <Suspense fallback={<SuspenseFallback />}>
              <FinalSceneMessage />
            </Suspense>
          </section>
        </main>

        <Footer />
      </motion.div>
    </div>
  );
}
