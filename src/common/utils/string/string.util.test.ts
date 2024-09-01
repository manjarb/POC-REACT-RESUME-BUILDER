import { describe, expect,it } from 'vitest';

import { capitalizeFirstLetter } from './string.util';

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a word', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('should return an empty string if given an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('should capitalize a single character', () => {
    expect(capitalizeFirstLetter('h')).toBe('H');
  });

  it('should not change an already capitalized string', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });

  it('should not change a string starting with a non-letter character', () => {
    expect(capitalizeFirstLetter('1hello')).toBe('1hello');
    expect(capitalizeFirstLetter('!hello')).toBe('!hello');
  });
});
