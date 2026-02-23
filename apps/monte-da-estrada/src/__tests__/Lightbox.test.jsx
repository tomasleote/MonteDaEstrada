// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Lightbox from '../components/Lightbox/Lightbox';

afterEach(cleanup);

const mockImages = [
  { src: '/img1.jpg', alt: 'Image 1', title: 'First' },
  { src: '/img2.jpg', alt: 'Image 2', title: 'Second' },
];

describe('Lightbox', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Lightbox images={mockImages} isOpen={false} onClose={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders current image when isOpen is true', () => {
    const { container } = render(
      <Lightbox images={mockImages} isOpen={true} initialIndex={0} onClose={() => {}} />
    );
    expect(within(container).getByAltText('Image 1')).toBeTruthy();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const { container } = render(
      <Lightbox images={mockImages} isOpen={true} onClose={onClose} />
    );
    const closeBtn = within(container).getByRole('button', { name: /close lightbox/i });
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('shows image counter for multiple images', () => {
    const { container } = render(
      <Lightbox images={mockImages} isOpen={true} initialIndex={0} onClose={() => {}} />
    );
    expect(within(container).getByText('1 / 2')).toBeTruthy();
  });
});
