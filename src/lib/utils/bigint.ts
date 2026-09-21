/**
 * Safely converts BigInt values within any data structure (objects, arrays, primitives)
 * to string representation for JSON API responses.
 * Preserves precise financial numbers without converting to floating-point JavaScript Numbers.
 */
export function serializeBigInt<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'bigint') {
    return data.toString() as unknown as T;
  }

  if (data instanceof Date) {
    return data as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => serializeBigInt(item)) as unknown as T;
  }

  if (typeof data === 'object') {
    const serializedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      serializedObj[key] = serializeBigInt(value);
    }
    return serializedObj as T;
  }

  return data;
}

/**
 * Parses a decimal string/number rupees into BigInt paise representation.
 * Example: "35000.50" -> 3500050n
 */
export function parsePaise(amountInRupees: string | number): bigint {
  const numStr = typeof amountInRupees === 'number' ? amountInRupees.toString() : amountInRupees;
  const parts = numStr.trim().split('.');

  if (parts.length > 2) {
    throw new Error('Invalid monetary format');
  }

  const rupeesStr = parts[0] || '0';
  const paiseStr = (parts[1] || '00').padEnd(2, '0').slice(0, 2);

  const totalPaiseStr = rupeesStr + paiseStr;
  return BigInt(totalPaiseStr);
}

/**
 * Formats BigInt paise into standard string representation.
 * Example: 3500050n -> "35000.50"
 */
export function formatPaiseToRupees(paise: bigint | string): string {
  const paiseBigInt = typeof paise === 'string' ? BigInt(paise) : paise;
  const isNegative = paiseBigInt < BigInt(0);
  const absPaise = isNegative ? -paiseBigInt : paiseBigInt;

  const rupees = absPaise / BigInt(100);
  const remainderPaise = absPaise % BigInt(100);
  const paddedPaise = remainderPaise.toString().padStart(2, '0');

  const formatted = `${rupees.toString()}.${paddedPaise}`;
  return isNegative ? `-${formatted}` : formatted;
}
