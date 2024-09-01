import { describe, expect,it } from 'vitest';

import { arrayMove } from './array.util';

describe('arrayMove', () => {
  it('should move an element from one index to another within bounds', () => {
    const arr = [1, 2, 3, 4, 5];
    arrayMove(arr, 1, 3);
    expect(arr).toEqual([1, 3, 4, 2, 5]);
  });

  it('should extend the array and move the element if the new index is out of bounds', () => {
    const arr = [1, 2, 3];
    arrayMove(arr, 0, 5);
    expect(arr).toEqual([2, 3, undefined, undefined, undefined, 1]);
  });

  it('should not change the array if the element is moved to the same index', () => {
    const arr = [1, 2, 3];
    arrayMove(arr, 1, 1);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('should handle an empty array without errors', () => {
    const arr: unknown[] = [];
    arrayMove(arr, 0, 1);
    expect(arr).toEqual([undefined, undefined]);
  });

  it('should handle negative indices correctly', () => {
    const arr = [1, 2, 3, 4];
    arrayMove(arr, -1, 1);
    expect(arr).toEqual([1, 4, 2, 3]);
  });
});
