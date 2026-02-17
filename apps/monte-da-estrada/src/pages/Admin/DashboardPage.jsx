import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Container from '@/components/Container';
import Section from '@/components/Section';
import styles from './DashboardPage.module.scss';

const DashboardPage = () => {
  const { logout } = useAuth();

  const menuItems = [
    {
      icon: '📝',
      title: 'Editar Conteúdo',
      description: 'Editar textos e informações das páginas',
      link: '/admin-secreto-montedaestrada/editor/conteudo',
    },
    {
      icon: '🖼️',
      title: 'Gerir Galeria',
      description: 'Adicionar, remover ou editar imagens',
      link: '/admin-secreto-montedaestrada/editor/galeria',
    },
    {
      icon: '🔗',
      title: 'Gerir Hiperligações',
      description: 'Atualizar links e URLs',
      link: '/admin-secreto-montedaestrada/editor/links',
    },
    {
      icon: 'ℹ️',
      title: 'Informações de Contacto',
      description: 'Editar telefone, email e morada',
      link: '/admin-secreto-montedaestrada/editor/contacto',
    },
    {
      icon: '🔑',
      title: 'Alterar Senha',
      description: 'Mudar credenciais de acesso',
      link: '/admin-secreto-montedaestrada/configuracoes',
    },
  ];

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.header}>
        <Container>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>Painel de Administração</h1>
              <p className={styles.subtitle}>Monte da Estrada</p>
            </div>
            <button onClick={logout} className={styles.logoutButton}>
              🚪 Sair
            </button>
          </div>
        </Container>
      </div>

      <Section padding="large">
        <Container>
          <div className={styles.welcomeMessage}>
            <h2>Bem-vindo ao painel de administração</h2>
            <p>Selecione uma opção abaixo para começar a editar o website.</p>
          </div>

          <div className={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={styles.menuCard}
              >
                <div className={styles.menuIcon}>{item.icon}</div>
                <h3 className={styles.menuTitle}>{item.title}</h3>
                <p className={styles.menuDescription}>{item.description}</p>
                <div className={styles.menuArrow}>→</div>
              </Link>
            ))}
          </div>

          <div className={styles.info}>
            <div className={styles.infoCard}>
              <h3>💡 Dica</h3>
              <p>
                Todas as alterações são guardadas localmente no seu navegador.
                Para publicar as mudanças no website, faça download dos ficheiros
                JSON e envie-os para o servidor.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default DashboardPage;
