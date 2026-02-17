import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styles from './ContactForm.module.scss';

/**
 * Contact form component with validation
 * Uses React Hook Form for form state management
 * Features:
 * - Client-side validation
 * - Success/error states
 * - Accessible form labels
 * - Loading state during submission
 */
const ContactForm = ({ onSubmit }) => {
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Form data:', data);
      }

      setSubmitStatus('success');
      reset(); // Clear form on success
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      {/* Name Field */}
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Nome <span className={styles.required}>*</span>
        </label>
        <input
          id="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.error : ''}`}
          {...register('name', {
            required: 'O nome é obrigatório',
            minLength: {
              value: 2,
              message: 'O nome deve ter pelo menos 2 caracteres',
            },
          })}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className={styles.errorMessage} role="alert">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email <span className={styles.required}>*</span>
        </label>
        <input
          id="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.error : ''}`}
          {...register('email', {
            required: 'O email é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido',
            },
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className={styles.errorMessage} role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Phone Field (Optional) */}
      <div className={styles.field}>
        <label htmlFor="phone" className={styles.label}>
          Telefone
        </label>
        <input
          id="phone"
          type="tel"
          className={styles.input}
          {...register('phone')}
        />
      </div>

      {/* Message Field */}
      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Mensagem <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
          {...register('message', {
            required: 'A mensagem é obrigatória',
            minLength: {
              value: 10,
              message: 'A mensagem deve ter pelo menos 10 caracteres',
            },
          })}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span id="message-error" className={styles.errorMessage} role="alert">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'A enviar...' : 'Enviar Mensagem'}
      </button>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className={styles.successMessage} role="status">
          Mensagem enviada com sucesso! Entraremos em contacto em breve.
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className={styles.errorMessageBox} role="alert">
          Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.
        </div>
      )}
    </form>
  );
};

ContactForm.propTypes = {
  /** Optional custom submit handler */
  onSubmit: PropTypes.func,
};

export default ContactForm;
