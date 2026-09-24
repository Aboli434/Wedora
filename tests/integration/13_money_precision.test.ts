import { describe, it, expect } from 'vitest';
import { parsePaise, formatPaiseToRupees, serializeBigInt } from '@/lib/utils/bigint';

describe('Phase 43.13 — Money Precision & BigInt Serialization Tests', () => {
  it('correctly converts decimal rupee strings to exact BigInt paise', () => {
    expect(parsePaise('100')).toBe(10000n);
    expect(parsePaise('100.50')).toBe(10050n);
    expect(parsePaise('0.01')).toBe(1n);
    expect(parsePaise('9999999.99')).toBe(999999999n);
  });

  it('multiplies unitPrice by quantity with zero floating point drift', () => {
    const unitPricePaise = parsePaise('19999.99');
    const quantity = 3;
    const totalPaise = unitPricePaise * BigInt(quantity);

    expect(totalPaise).toBe(5999997n);
    expect(formatPaiseToRupees(totalPaise)).toBe('59999.97');
  });

  it('safely serializes BigInt numbers in object structures for JSON response', () => {
    const data = {
      id: 'test-123',
      amountPaise: 500000n,
      nested: {
        totalPaise: 125050n,
      },
      list: [100n, 200n],
    };

    const serialized = serializeBigInt(data);

    expect(serialized).toEqual({
      id: 'test-123',
      amountPaise: '500000',
      nested: {
        totalPaise: '125050',
      },
      list: ['100', '200'],
    });
  });

  it('formats paise to rupee string representation cleanly', () => {
    expect(formatPaiseToRupees(BigInt(100))).toBe('1.00');
    expect(formatPaiseToRupees(BigInt(125075))).toBe('1250.75');
    expect(formatPaiseToRupees(BigInt(0))).toBe('0.00');
  });
});
