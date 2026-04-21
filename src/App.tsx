import './App.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Events from './components/Events';
import Footer from './components/Footer';
import Gatefold from './components/Gatefold';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import RSVPForm from './components/RsvpForm';
import Family from './components/Family';

function App() {
  const [isGatefoldOpen, setIsGatefoldOpen] = useState(false);
  const [showGatefold, setShowGatefold] = useState(true);

  useEffect(() => {
    if (!isGatefoldOpen) {
      return;
    }

    const timeout = setTimeout(() => {
      setShowGatefold(false);
    }, 1800);

    return () => {
      clearTimeout(timeout);
    };
  }, [isGatefoldOpen]);

  return (
    <div className="relative">
      {(isGatefoldOpen || !showGatefold) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.8, ease: 'easeOut' }}
          className="wrapper"
        >
          <Hero />
          <Family />
          <Events />
          <RSVPForm />
          <Quiz />
          <Footer />
        </motion.div>
      )}

      {showGatefold && (
        <button
          type="button"
          onClick={() => setIsGatefoldOpen(true)}
          className="fixed inset-0 h-screen w-full overflow-hidden cursor-pointer block border-0 p-0 bg-transparent text-left z-100"
          aria-label="Deschide invitația"
        >
          <Gatefold isOpen={isGatefoldOpen} />
        </button>
      )}
    </div>
  );
}

export default App;
