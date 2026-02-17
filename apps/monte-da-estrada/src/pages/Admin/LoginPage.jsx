import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Container from '@/components/Container';
import Section from '@/components/Section';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      const result = login(username, password);

      if (result.success) {
        navigate('/admin-secreto-montedaestrada/dashboard');
      } else {
        setError(result.error);
        setPassword('');
      }

      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={styles.loginPage}>
      <Section padding="large">
        <Container>
          <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
              <div className={styles.header}>
                <h1 className={styles.title}>Painel Admin</h1>
                <p className={styles.subtitle}>Monte da Estrada</p>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                {error && (
                  <div className={styles.error}>
                    {error}
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label htmlFor="username" className={styles.label}>
                    Nome de utilizador
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                    placeholder="Insira o nome de utilizador"
                    required
                    autoComplete="username"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    placeholder="Insira a senha"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'A entrar...' : 'Entrar'}
                </button>
              </form>

              <div className={styles.footer}>
                <p className={styles.footerText}>
                  🔒 Acesso restrito apenas para administradores
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default LoginPage;
