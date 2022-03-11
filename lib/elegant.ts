import { sqrt } from 'extra-bigint';

function encode(x: number, y: number): number;
function encode(x: bigint, y: bigint): bigint;

/**
 * Encodes the supplied natural numbers into a unique derivative integer.
 * @see {@link http://szudzik.com/ElegantPairing.pdf}
 */
function encode(x: unknown, y: unknown): unknown {
  if (typeof x === 'number' && typeof y === 'number') {
    // ensure x and y are integers & within safe-range
    if (!Number.isSafeInteger(x) || !Number.isSafeInteger(y)) {
      throw new TypeError(
        'Invalid arguments; expected integer within safe-range'
      );
    }

    // ensure x and y are non-negative
    if (x < 0 || y < 0) {
      throw new TypeError(
        'Invalid arguments; negative numbers are not allowed'
      );
    }

    // calculate derivative integer
    const z = x >= y ? x * x + x + y : y * y + x;

    // ensure z is within safe-range
    if (!Number.isSafeInteger(z)) {
      throw new TypeError(
        'Derivative number is too large - use bigint instead'
      );
    }

    return z;
  }

  if (typeof x === 'bigint' && typeof y === 'bigint') {
    // ensure x and y are non-negative
    if (x < 0 || y < 0) {
      throw new TypeError(
        'Invalid arguments; negative numbers are not allowed'
      );
    }

    return x >= y ? x * x + x + y : y * y + x;
  }

  throw new TypeError('Invalid arguments; expected safe-integer or bigint');
}

function decode(z: number): [number, number];
function decode(z: bigint): [bigint, bigint];

/**
 * Decodes the supplied natural number into it's unique number pair.
 * @see {@link http://szudzik.com/ElegantPairing.pdf}
 */
function decode(z: unknown): unknown {
  if (typeof z === 'number') {
    // ensure z is integer & within safe-range
    if (!Number.isSafeInteger(z)) {
      throw new TypeError(
        'Invalid argument; expected integer within safe-range'
      );
    }

    // ensure z is non-negative
    if (z < 0) {
      throw new TypeError('Invalid argument; negative numbers are not allowed');
    }

    const zSqrt = Math.sqrt(z);
    const zSqrtFloor = Math.floor(zSqrt);
    const zSqrtFloorSqr = zSqrtFloor * zSqrtFloor;
    const zMinusZSqrtFloorSqr = z - zSqrtFloorSqr;

    // take cases
    if (zMinusZSqrtFloorSqr < zSqrtFloor) {
      return [zMinusZSqrtFloorSqr, zSqrtFloor];
    }

    return [zSqrtFloor, zMinusZSqrtFloorSqr - zSqrtFloor];
  }

  if (typeof z === 'bigint') {
    // ensure z is non-negative
    if (z < 0) {
      throw new TypeError('Invalid argument; negative numbers are not allowed');
    }

    const zSqrt = sqrt(z);
    // note: zSqrt is already floored, bigint does not support floats (dah!)
    const zSqrtSqr = zSqrt * zSqrt;
    const zMinusZSqrtSqr = z - zSqrtSqr;

    // take cases
    if (zMinusZSqrtSqr < zSqrt) {
      return [zMinusZSqrtSqr, zSqrt];
    }

    return [zSqrt, zMinusZSqrtSqr - zSqrt];
  }

  throw new TypeError('Invalid argument; expected safe-integer or bigint');
}

export const elegant = {
  encode,
  decode,
};
