import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ImageManagerPage.module.scss';

// Import gallery data
import galeriaData from '@/data/galeria.json';

const ImageManagerPage = () => {
  const navigate = useNavigate();
  const [galeria, setGaleria] = useState(galeriaData);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingImage, setEditingImage] = useState(null);

  const getAllImages = () => {
    return galeria.categories.reduce((acc, category) => {
      return [...acc, ...category.images.map(img => ({ ...img, category: category.id }))];
    }, []);
  };

  const getFilteredImages = () => {
    if (selectedCategory === 'all') {
      return getAllImages();
    }
    const category = galeria.categories.find(cat => cat.id === selectedCategory);
    return category ? category.images.map(img => ({ ...img, category: category.id })) : [];
  };

  const handleSave = () => {
    localStorage.setItem('monte_edited_galeria', JSON.stringify(galeria));
    setHasChanges(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(galeria, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'galeria.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImageUpdate = (categoryId, imageIndex, field, value) => {
    setGaleria((prev) => {
      const newGaleria = JSON.parse(JSON.stringify(prev));
      const categoryIndex = newGaleria.categories.findIndex(cat => cat.id === categoryId);
      newGaleria.categories[categoryIndex].images[imageIndex][field] = value;
      setHasChanges(true);
      return newGaleria;
    });
  };

  const handleImageDelete = (categoryId, imageIndex) => {
    if (!window.confirm('Tem a certeza que deseja eliminar esta imagem?')) return;

    setGaleria((prev) => {
      const newGaleria = JSON.parse(JSON.stringify(prev));
      const categoryIndex = newGaleria.categories.findIndex(cat => cat.id === categoryId);
      newGaleria.categories[categoryIndex].images.splice(imageIndex, 1);
      setHasChanges(true);
      return newGaleria;
    });
    setEditingImage(null);
  };

  const handleImageAdd = (categoryId) => {
    const newImage = {
      src: '/images/placeholder.jpg',
      alt: 'Nova imagem',
      caption: '',
    };

    setGaleria((prev) => {
      const newGaleria = JSON.parse(JSON.stringify(prev));
      const categoryIndex = newGaleria.categories.findIndex(cat => cat.id === categoryId);
      newGaleria.categories[categoryIndex].images.push(newImage);
      setHasChanges(true);
      return newGaleria;
    });
  };

  const filteredImages = getFilteredImages();

  return (
    <div className={styles.managerPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/admin-secreto-montedaestrada/dashboard')}>
          ← Voltar ao Dashboard
        </button>
        <h1>Gerir Galeria de Imagens</h1>
        <div className={styles.actions}>
          <button className={styles.downloadButton} onClick={handleDownload}>
            💾 Descarregar JSON
          </button>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={!hasChanges}
          >
            ✓ Guardar Alterações
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className={styles.successMessage}>
          ✓ Alterações guardadas com sucesso!
        </div>
      )}

      <div className={styles.filterContainer}>
        <button
          className={`${styles.filterButton} ${selectedCategory === 'all' ? styles.active : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          Todas ({getAllImages().length})
        </button>
        {galeria.categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.filterButton} ${selectedCategory === category.id ? styles.active : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name} ({category.images.length})
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.instructions}>
          <h3>📝 Instruções de Uso</h3>
          <ul>
            <li>Clique numa imagem para editar a sua legenda e texto alternativo</li>
            <li>Use URLs completos para as imagens (ex: /images/nome-da-imagem.jpg)</li>
            <li>Pode adicionar novas imagens clicando no botão "Adicionar Imagem"</li>
            <li>Para remover uma imagem, clique no ícone da lixeira</li>
            <li>Não esqueça de guardar as alterações antes de sair</li>
          </ul>
        </div>

        {selectedCategory !== 'all' && (
          <div className={styles.addImageSection}>
            <button
              className={styles.addImageButton}
              onClick={() => handleImageAdd(selectedCategory)}
            >
              + Adicionar Imagem a {galeria.categories.find(c => c.id === selectedCategory)?.name}
            </button>
          </div>
        )}

        <div className={styles.imageGrid}>
          {filteredImages.map((image, index) => {
            const categoryIndex = galeria.categories.findIndex(cat => cat.id === image.category);
            const imageIndex = galeria.categories[categoryIndex].images.findIndex(
              img => img.src === image.src && img.alt === image.alt
            );

            return (
              <div key={`${image.category}-${index}`} className={styles.imageCard}>
                <div className={styles.imageWrapper}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={styles.image}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Imagem+não+encontrada';
                    }}
                  />
                  <div className={styles.imageOverlay}>
                    <button
                      className={styles.editButton}
                      onClick={() => setEditingImage({ category: image.category, index: imageIndex })}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleImageDelete(image.category, imageIndex)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>

                <div className={styles.imageInfo}>
                  <span className={styles.categoryBadge}>
                    {galeria.categories.find(c => c.id === image.category)?.name}
                  </span>
                  <p className={styles.imageCaption}>{image.caption || 'Sem legenda'}</p>
                </div>

                {editingImage?.category === image.category && editingImage?.index === imageIndex && (
                  <div className={styles.editForm}>
                    <div className={styles.field}>
                      <label>URL da Imagem</label>
                      <input
                        type="text"
                        value={image.src}
                        onChange={(e) => handleImageUpdate(image.category, imageIndex, 'src', e.target.value)}
                      />
                    </div>
                    <div className={styles.field}>
                      <label>Texto Alternativo (Alt)</label>
                      <input
                        type="text"
                        value={image.alt}
                        onChange={(e) => handleImageUpdate(image.category, imageIndex, 'alt', e.target.value)}
                      />
                    </div>
                    <div className={styles.field}>
                      <label>Legenda</label>
                      <textarea
                        value={image.caption}
                        onChange={(e) => handleImageUpdate(image.category, imageIndex, 'caption', e.target.value)}
                        rows={2}
                      />
                    </div>
                    <button
                      className={styles.closeEditButton}
                      onClick={() => setEditingImage(null)}
                    >
                      Fechar
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredImages.length === 0 && (
          <div className={styles.emptyState}>
            <p>Nenhuma imagem nesta categoria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageManagerPage;
