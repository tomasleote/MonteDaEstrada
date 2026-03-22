import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/contexts/LocaleContext';
import styles from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const threshold = document.documentElement.clientHeight * 0.8;
          setIsVisible(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLang = (lang) => {
    if (lang === locale) return;
    
    // Proactively save to localStorage so the App context naturally persists
    localStorage.setItem('mde-locale', lang);
    setLocale(lang);
    
    const currentPath = location.pathname;
    
    if (lang === 'en') {
      // Append /en to the beginning safely
      navigate('/en' + (currentPath === '/' ? '' : currentPath));
    } else {
      // Strip /en from the beginning
      const newPath = currentPath.replace(/^\/en/, '') || '/';
      navigate(newPath);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.switcherContainer}
          initial={{ x: '-100%', y: '-50%' }}
          animate={{ x: 0, y: '-50%' }}
          exit={{ x: '-100%', y: '-50%' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <button
            className={`${styles.langBtn} ${locale === 'en' ? styles.active : ''}`}
            onClick={() => switchLang('en')}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            className={`${styles.langBtn} ${locale === 'pt' ? styles.active : ''}`}
            onClick={() => switchLang('pt')}
            aria-label="Mudar para Português"
          >
            PT
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
