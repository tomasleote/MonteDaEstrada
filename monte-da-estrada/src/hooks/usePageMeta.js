import { useTranslation } from 'react-i18next';

/**
 * Custom hook for managing translated page metadata
 * @param {string} namespace - Translation namespace (e.g., 'home', 'quartos')
 * @param {string} pageKey - Key for page-specific translations (default: 'meta')
 * @returns {Object} Metadata object with title, description, keywords, and language
 */
const usePageMeta = (namespace, pageKey = 'meta') => {
  const { t, i18n } = useTranslation(namespace);

  const title = t(`${pageKey}.title`, { defaultValue: 'Monte da Estrada' });
  const description = t(`${pageKey}.description`, { defaultValue: '' });
  const keywords = t(`${pageKey}.keywords`, { defaultValue: '' });

  return {
    title,
    description,
    keywords,
    lang: i18n.language,
  };
};

export default usePageMeta;
