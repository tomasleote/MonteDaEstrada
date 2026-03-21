import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContentEditorPage.module.scss';

// Import all JSON data files
import homeData from '@/data/pt/home.json';
import quartosData from '@/data/pt/quartos.json';
import atividadesData from '@/data/pt/atividades.json';
import descobrirData from '@/data/pt/descobrir.json';
import localizacaoData from '@/data/pt/localizacao.json';
import galeriaData from '@/data/pt/galeria.json';

const ContentEditorPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // State for each page's data
  const [home, setHome] = useState(homeData);
  const [quartos, setQuartos] = useState(quartosData);
  const [atividades, setAtividades] = useState(atividadesData);
  const [descobrir, setDescobrir] = useState(descobrirData);
  const [localizacao, setLocalizacao] = useState(localizacaoData);
  const [galeria, setGaleria] = useState(galeriaData);

  const tabs = [
    { id: 'home', label: 'Início', icon: '🏠' },
    { id: 'quartos', label: 'Quartos', icon: '🛏️' },
    { id: 'atividades', label: 'Atividades', icon: '🎯' },
    { id: 'descobrir', label: 'Descobrir', icon: '🗺️' },
    { id: 'localizacao', label: 'Localização', icon: '📍' },
    { id: 'galeria', label: 'Galeria', icon: '📸' },
  ];

  const handleSave = () => {
    // Store all edited content in localStorage
    const editedContent = {
      home,
      quartos,
      atividades,
      descobrir,
      localizacao,
      galeria,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem('monte_edited_content', JSON.stringify(editedContent));
    setHasChanges(false);
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDownload = () => {
    // Create downloadable JSON files
    const content = {
      home,
      quartos,
      atividades,
      descobrir,
      localizacao,
      galeria,
    };

    Object.entries(content).forEach(([key, data]) => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${key}.json`;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  // Generic update function for nested properties
  const updateValue = (setter, path, value) => {
    setter((prev) => {
      const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
      const keys = path.split('.');
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      setHasChanges(true);
      return newData;
    });
  };

  // Update array items
  const updateArrayItem = (setter, path, index, value) => {
    setter((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newData;

      for (let i = 0; i < keys.length; i++) {
        current = current[keys[i]];
      }

      current[index] = value;
      setHasChanges(true);
      return newData;
    });
  };

  return (
    <div className={styles.editorPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/admin-secreto-montedaestrada/dashboard')}>
          ← Voltar ao Dashboard
        </button>
        <h1>Editar Conteúdo do Website</h1>
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

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'home' && (
          <HomeEditor home={home} updateValue={(path, value) => updateValue(setHome, path, value)} updateArrayItem={(path, index, value) => updateArrayItem(setHome, path, index, value)} />
        )}
        {activeTab === 'quartos' && (
          <QuartosEditor quartos={quartos} updateValue={(path, value) => updateValue(setQuartos, path, value)} updateArrayItem={(path, index, value) => updateArrayItem(setQuartos, path, index, value)} />
        )}
        {activeTab === 'atividades' && (
          <AtividadesEditor atividades={atividades} updateValue={(path, value) => updateValue(setAtividades, path, value)} />
        )}
        {activeTab === 'descobrir' && (
          <DescobrirEditor descobrir={descobrir} updateValue={(path, value) => updateValue(setDescobrir, path, value)} />
        )}
        {activeTab === 'localizacao' && (
          <LocalizacaoEditor localizacao={localizacao} updateValue={(path, value) => updateValue(setLocalizacao, path, value)} />
        )}
        {activeTab === 'galeria' && (
          <GaleriaEditor galeria={galeria} updateValue={(path, value) => updateValue(setGaleria, path, value)} />
        )}
      </div>
    </div>
  );
};

// Home Page Editor Component
const HomeEditor = ({ home, updateValue, updateArrayItem }) => (
  <div className={styles.editorSection}>
    <h2>Página Inicial</h2>

    <div className={styles.section}>
      <h3>Hero Section</h3>
      <div className={styles.field}>
        <label>Título</label>
        <input
          type="text"
          value={home.hero.title}
          onChange={(e) => updateValue('hero.title', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Subtítulo</label>
        <input
          type="text"
          value={home.hero.subtitle}
          onChange={(e) => updateValue('hero.subtitle', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Imagem (URL)</label>
        <input
          type="text"
          value={home.hero.image}
          onChange={(e) => updateValue('hero.image', e.target.value)}
        />
      </div>
    </div>

    <div className={styles.section}>
      <h3>Boas-vindas</h3>
      <div className={styles.field}>
        <label>Título</label>
        <input
          type="text"
          value={home.welcome.title}
          onChange={(e) => updateValue('welcome.title', e.target.value)}
        />
      </div>
      {home.welcome.paragraphs.map((paragraph, index) => (
        <div key={index} className={styles.field}>
          <label>Parágrafo {index + 1}</label>
          <textarea
            value={paragraph}
            onChange={(e) => updateArrayItem('welcome.paragraphs', index, e.target.value)}
            rows={4}
          />
        </div>
      ))}
    </div>

    <div className={styles.section}>
      <h3>Destaques</h3>
      {home.highlights.map((highlight, index) => (
        <div key={index} className={styles.highlightItem}>
          <h4>Destaque {index + 1}</h4>
          <div className={styles.field}>
            <label>Título</label>
            <input
              type="text"
              value={highlight.title}
              onChange={(e) => {
                const newHighlight = { ...highlight, title: e.target.value };
                updateArrayItem('highlights', index, newHighlight);
              }}
            />
          </div>
          <div className={styles.field}>
            <label>Descrição</label>
            <textarea
              value={highlight.description}
              onChange={(e) => {
                const newHighlight = { ...highlight, description: e.target.value };
                updateArrayItem('highlights', index, newHighlight);
              }}
              rows={2}
            />
          </div>
          <div className={styles.field}>
            <label>Ícone (emoji)</label>
            <input
              type="text"
              value={highlight.icon}
              onChange={(e) => {
                const newHighlight = { ...highlight, icon: e.target.value };
                updateArrayItem('highlights', index, newHighlight);
              }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className={styles.section}>
      <h3>Informações Práticas</h3>
      <div className={styles.field}>
        <label>Título</label>
        <input
          type="text"
          value={home.information.title}
          onChange={(e) => updateValue('information.title', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Check-in</label>
        <input
          type="text"
          value={home.information.checkIn}
          onChange={(e) => updateValue('information.checkIn', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Check-out</label>
        <input
          type="text"
          value={home.information.checkOut}
          onChange={(e) => updateValue('information.checkOut', e.target.value)}
        />
      </div>
    </div>
  </div>
);

// Quartos Page Editor Component
const QuartosEditor = ({ quartos, updateValue, updateArrayItem }) => (
  <div className={styles.editorSection}>
    <h2>Página de Quartos</h2>

    <div className={styles.section}>
      <div className={styles.field}>
        <label>Título da Página</label>
        <input
          type="text"
          value={quartos.title}
          onChange={(e) => updateValue('title', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Descrição</label>
        <textarea
          value={quartos.description}
          onChange={(e) => updateValue('description', e.target.value)}
          rows={3}
        />
      </div>
    </div>

    <div className={styles.section}>
      <h3>Preços e Reservas</h3>
      <div className={styles.field}>
        <label>Título</label>
        <input
          type="text"
          value={quartos.pricing.title}
          onChange={(e) => updateValue('pricing.title', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Descrição</label>
        <textarea
          value={quartos.pricing.description}
          onChange={(e) => updateValue('pricing.description', e.target.value)}
          rows={2}
        />
      </div>
    </div>
  </div>
);

// Atividades Page Editor Component
const AtividadesEditor = ({ atividades, updateValue }) => (
  <div className={styles.editorSection}>
    <h2>Página de Atividades</h2>

    <div className={styles.section}>
      <div className={styles.field}>
        <label>Título da Página</label>
        <input
          type="text"
          value={atividades.title}
          onChange={(e) => updateValue('title', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Descrição</label>
        <textarea
          value={atividades.description}
          onChange={(e) => updateValue('description', e.target.value)}
          rows={3}
        />
      </div>
    </div>

    <div className={styles.section}>
      <h3>Comodidades no Monte</h3>
      <div className={styles.field}>
        <label>Título</label>
        <input
          type="text"
          value={atividades.amenities.title}
          onChange={(e) => updateValue('amenities.title', e.target.value)}
        />
      </div>
    </div>
  </div>
);

// Descobrir Page Editor Component
const DescobrirEditor = ({ descobrir, updateValue }) => (
  <div className={styles.editorSection}>
    <h2>Página de Descobrir</h2>

    <div className={styles.section}>
      <div className={styles.field}>
        <label>Título da Página</label>
        <input
          type="text"
          value={descobrir.title}
          onChange={(e) => updateValue('title', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Descrição</label>
        <textarea
          value={descobrir.description}
          onChange={(e) => updateValue('description', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  </div>
);

// Localização Page Editor Component
const LocalizacaoEditor = ({ localizacao, updateValue }) => (
  <div className={styles.editorSection}>
    <h2>Página de Localização</h2>

    <div className={styles.section}>
      <div className={styles.field}>
        <label>Título da Página</label>
        <input
          type="text"
          value={localizacao.title}
          onChange={(e) => updateValue('title', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Descrição</label>
        <textarea
          value={localizacao.description}
          onChange={(e) => updateValue('description', e.target.value)}
          rows={3}
        />
      </div>
    </div>

    <div className={styles.section}>
      <h3>Endereço</h3>
      <div className={styles.field}>
        <label>Rua</label>
        <input
          type="text"
          value={localizacao.address.street}
          onChange={(e) => updateValue('address.street', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Cidade</label>
        <input
          type="text"
          value={localizacao.address.city}
          onChange={(e) => updateValue('address.city', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Código Postal</label>
        <input
          type="text"
          value={localizacao.address.postalCode}
          onChange={(e) => updateValue('address.postalCode', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>País</label>
        <input
          type="text"
          value={localizacao.address.country}
          onChange={(e) => updateValue('address.country', e.target.value)}
        />
      </div>
    </div>

    <div className={styles.section}>
      <h3>Coordenadas GPS</h3>
      <div className={styles.field}>
        <label>Latitude</label>
        <input
          type="text"
          value={localizacao.address.coordinates.latitude}
          onChange={(e) => updateValue('address.coordinates.latitude', parseFloat(e.target.value))}
        />
      </div>
      <div className={styles.field}>
        <label>Longitude</label>
        <input
          type="text"
          value={localizacao.address.coordinates.longitude}
          onChange={(e) => updateValue('address.coordinates.longitude', parseFloat(e.target.value))}
        />
      </div>
    </div>
  </div>
);

// Galeria Page Editor Component
const GaleriaEditor = ({ galeria, updateValue }) => (
  <div className={styles.editorSection}>
    <h2>Página da Galeria</h2>

    <div className={styles.section}>
      <div className={styles.field}>
        <label>Título da Página</label>
        <input
          type="text"
          value={galeria.title}
          onChange={(e) => updateValue('title', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Descrição</label>
        <textarea
          value={galeria.description}
          onChange={(e) => updateValue('description', e.target.value)}
          rows={3}
        />
      </div>
    </div>

    <div className={styles.section}>
      <h3>Hero Section</h3>
      <div className={styles.field}>
        <label>Título</label>
        <input
          type="text"
          value={galeria.hero.title}
          onChange={(e) => updateValue('hero.title', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Subtítulo</label>
        <input
          type="text"
          value={galeria.hero.subtitle}
          onChange={(e) => updateValue('hero.subtitle', e.target.value)}
        />
      </div>
    </div>

    <div className={styles.section}>
      <h3>Informações de Fotografia</h3>
      <div className={styles.field}>
        <label>Título</label>
        <input
          type="text"
          value={galeria.photographyInfo.title}
          onChange={(e) => updateValue('photographyInfo.title', e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Descrição</label>
        <textarea
          value={galeria.photographyInfo.description}
          onChange={(e) => updateValue('photographyInfo.description', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  </div>
);

export default ContentEditorPage;
