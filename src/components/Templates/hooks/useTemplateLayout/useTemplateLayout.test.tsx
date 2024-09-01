import { renderHook } from '@testing-library/react';
import { describe, expect,it } from 'vitest';

import { useTemplateLayout } from './useTemplateLayout';

describe('useTemplateLayout Hook', () => {
  it('calculates header title size with default parameters', () => {
    const { result } = renderHook(() => useTemplateLayout());

    const titleSize = result.current.calculateHeaderTitle();
    expect(titleSize).toBe('24px'); // 16 * 1.5
  });

  it('calculates header title size with custom baseSize and proportion', () => {
    const { result } = renderHook(() => useTemplateLayout());

    const titleSize = result.current.calculateHeaderTitle(20, 2);
    expect(titleSize).toBe('40px'); // 20 * 2
  });

  it('handles very small baseSize values', () => {
    const { result } = renderHook(() => useTemplateLayout());

    const titleSize = result.current.calculateHeaderTitle(0.5, 1.5);
    expect(titleSize).toBe('0.75px'); // 0.5 * 1.5
  });

  it('handles very large baseSize values', () => {
    const { result } = renderHook(() => useTemplateLayout());

    const titleSize = result.current.calculateHeaderTitle(1000, 1.2);
    expect(titleSize).toBe('1200px'); // 1000 * 1.2
  });
});
