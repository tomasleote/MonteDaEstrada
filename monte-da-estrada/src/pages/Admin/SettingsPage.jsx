import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import styles from './SettingsPage.module.scss';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { changePassword } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Senha atual é obrigatória';
    }

    if (!formData.newUsername.trim()) {
      newErrors.newUsername = 'Novo nome de utilizador é obrigatório';
    } else if (formData.newUsername.length < 3) {
      newErrors.newUsername = 'O nome de utilizador deve ter pelo menos 3 caracteres';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Nova senha é obrigatória';
    } else if (formData.newPassword.length < 4) {
      newErrors.newPassword = 'A senha deve ter pelo menos 4 caracteres';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate async operation
    setTimeout(() => {
      const result = changePassword(
        formData.currentPassword,
        formData.newUsername,
        formData.newPassword
      );

      setLoading(false);

      if (result.success) {
        setShowSuccess(true);
        setFormData({
          currentPassword: '',
          newUsername: '',
          newPassword: '',
          confirmPassword: '',
        });
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        setErrors({ currentPassword: result.error });
      }
    }, 500);
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/admin-secreto-montedaestrada/dashboard')}>
          ← Voltar ao Dashboard
        </button>
        <h1>Configurações da Conta</h1>
      </div>

      {showSuccess && (
        <div className={styles.successMessage}>
          ✓ Credenciais alteradas com sucesso! Por favor, utilize as novas credenciais no próximo login.
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.formSection}>
          <h2>Alterar Credenciais de Acesso</h2>
          <p className={styles.description}>
            Utilize este formulário para alterar o seu nome de utilizador e senha. Por razões de segurança,
            necessitará da senha atual para confirmar as alterações.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="currentPassword">Senha Atual *</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={errors.currentPassword ? styles.error : ''}
                placeholder="Introduza a senha atual"
              />
              {errors.currentPassword && (
                <span className={styles.errorMessage}>{errors.currentPassword}</span>
              )}
            </div>

            <div className={styles.divider}></div>

            <div className={styles.field}>
              <label htmlFor="newUsername">Novo Nome de Utilizador *</label>
              <input
                type="text"
                id="newUsername"
                name="newUsername"
                value={formData.newUsername}
                onChange={handleChange}
                className={errors.newUsername ? styles.error : ''}
                placeholder="Introduza o novo nome de utilizador"
              />
              {errors.newUsername && (
                <span className={styles.errorMessage}>{errors.newUsername}</span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="newPassword">Nova Senha *</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={errors.newPassword ? styles.error : ''}
                placeholder="Introduza a nova senha"
              />
              {errors.newPassword && (
                <span className={styles.errorMessage}>{errors.newPassword}</span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmPassword">Confirmar Nova Senha *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? styles.error : ''}
                placeholder="Confirme a nova senha"
              />
              {errors.confirmPassword && (
                <span className={styles.errorMessage}>{errors.confirmPassword}</span>
              )}
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => navigate('/admin-secreto-montedaestrada/dashboard')}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? 'A guardar...' : 'Guardar Alterações'}
              </button>
            </div>
          </form>
        </div>

        <div className={styles.infoSection}>
          <h3>⚠️ Informações Importantes</h3>
          <ul>
            <li>Guarde as suas credenciais num local seguro</li>
            <li>Use uma senha forte com pelo menos 4 caracteres</li>
            <li>Não partilhe as suas credenciais com terceiros</li>
            <li>Após alterar a senha, será necessário fazer login novamente</li>
            <li>As credenciais são guardadas localmente no navegador</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
