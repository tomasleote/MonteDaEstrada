import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './LanguageSwitcher.module.scss';

const LANGUAGES = [
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

/**
 * Language Switcher component for multi-language support
 * Features:
 * - Dropdown with all supported languages
 * - Visual indicator for current language
 * - Persistent language selection via localStorage
 * - Accessible keyboard navigation
 */
const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language.select')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
        <span className={styles.currentLang}>{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="menu">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              className={`${styles.option} ${
                i18n.language === language.code ? styles.active : ''
              }`}
              onClick={() => changeLanguage(language.code)}
              role="menuitem"
            >
              <span className={styles.flag}>{language.flag}</span>
              <span className={styles.name}>{language.name}</span>
              {i18n.language === language.code && (
                <FontAwesomeIcon icon={faCheck} className={styles.checkmark} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
