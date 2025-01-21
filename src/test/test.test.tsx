import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TestPage from '@/components/TestPage';

describe('Test Component Test Start', () => {
  it('GUI Test - Test 컴포넌트 name props', () => {
    render(<TestPage />);
    const welcomeElement = screen.getByText('TestComponent');
    expect(welcomeElement).toBeInTheDocument();
  });
});
