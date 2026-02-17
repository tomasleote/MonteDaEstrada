/**
 * Custom hook to load content from JSON files
 * Content is managed via Decap CMS which edits the source JSON files directly
 * and triggers automatic rebuilds on Netlify
 *
 * @param {string} contentKey - The key for the content (e.g., 'home', 'quartos', etc.) - Not used but kept for backward compatibility
 * @param {Object} defaultData - The JSON data imported from the data folder
 * @returns {Object} The content data
 */
const useEditableContent = (contentKey, defaultData) => {
  // Decap CMS edits source files directly, which triggers rebuild
  // After rebuild, new JSON is imported at build time
  // No need for localStorage or runtime state management
  return defaultData;
};

export default useEditableContent;
