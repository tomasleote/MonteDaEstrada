import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuiteAlentejanaSection from '../SuiteAlentejanaSection';

describe('SuiteAlentejanaSection', () => {
  const mockProps = {
    eyebrow: 'Quartos',
    heading: 'A Suite Alentejana',
    tagline: 'Um refúgio onde a luz do Alentejo entra pelas janelas.',
    description: ['Test description line 1', 'Test description line 2'],
    carouselImages: [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ],
    amenities: {
      atmospheric: [{ label: 'Silence', icon: '🌄' }],
      premium: [{ label: 'Premium Linens', icon: '🛏️' }],
    },
    ctaLabel: 'Book Now',
    ctaHref: 'https://booking.com',
  };

  test('renders heading correctly', () => {
    render(<SuiteAlentejanaSection {...mockProps} />);
    expect(screen.getByText('A Suite Alentejana')).toBeInTheDocument();
  });

  test('renders tagline correctly', () => {
    render(<SuiteAlentejanaSection {...mockProps} />);
    expect(screen.getByText('Um refúgio onde a luz do Alentejo entra pelas janelas.')).toBeInTheDocument();
  });

  test('renders description paragraphs', () => {
    render(<SuiteAlentejanaSection {...mockProps} />);
    expect(screen.getByText('Test description line 1')).toBeInTheDocument();
    expect(screen.getByText('Test description line 2')).toBeInTheDocument();
  });

  test('renders CTA button with correct label and href', () => {
    render(<SuiteAlentejanaSection {...mockProps} />);
    const ctaButton = screen.getByRole('link', { name: 'Book Now' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', 'https://booking.com');
  });

  test('renders amenities in grid', () => {
    render(<SuiteAlentejanaSection {...mockProps} />);
    expect(screen.getByText('Silence')).toBeInTheDocument();
    expect(screen.getByText('Premium Linens')).toBeInTheDocument();
  });

  test('renders with default props when not provided', () => {
    render(<SuiteAlentejanaSection carouselImages={mockProps.carouselImages} />);
    expect(screen.getByText('A Suite Alentejana')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Reservar A Suite Alentejana' })).toBeInTheDocument();
  });
});
