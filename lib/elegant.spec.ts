//@ts-ignore
import { elegant as npElegant } from 'number-pairings';

import bigIntFixtures from '../fixtures/elegant-bigint.json';
import numberFixtures from '../fixtures/elegant-number.json';
import { elegant } from './elegant';

describe('elegant', () => {
  describe('encode()', () => {
    test('throws when any argument is a float number', () => {
      expect(() => elegant.encode(0.123, 321)).toThrow(TypeError);
      expect(() => elegant.encode(123, 0.321)).toThrow(TypeError);
      expect(() => elegant.encode(0.123, 0.321)).toThrow(TypeError);
    });

    test('throws when any argument is a negative integer number', () => {
      expect(() => elegant.encode(-123, 321)).toThrow(TypeError);
      expect(() => elegant.encode(123, -321)).toThrow(TypeError);
      expect(() => elegant.encode(-123, -321)).toThrow(TypeError);
    });

    test('throws when any argument is a negative bigint', () => {
      expect(() => elegant.encode(-123n, 321n)).toThrow(TypeError);
      expect(() => elegant.encode(123n, -321n)).toThrow(TypeError);
      expect(() => elegant.encode(-123n, -321n)).toThrow(TypeError);
    });

    test('throws when any argument is a non-safe integer number', () => {
      expect(() => elegant.encode(Number.MAX_SAFE_INTEGER + 1, 321)).toThrow(
        TypeError
      );
      expect(() => elegant.encode(123, Number.MAX_SAFE_INTEGER + 1)).toThrow(
        TypeError
      );
      expect(() =>
        elegant.encode(Number.MAX_SAFE_INTEGER + 1, Number.MAX_SAFE_INTEGER + 1)
      ).toThrow(TypeError);
    });

    test('throws when any argument is string', () => {
      //@ts-expect-error
      expect(() => elegant.encode('abc', 321)).toThrow(TypeError);
      //@ts-expect-error
      expect(() => elegant.encode(123, 'abc')).toThrow(TypeError);
    });

    test('handles zero(0) corner-case', () => {
      expect(elegant.encode(0, 0)).toEqual(0);
    });

    test('handles largest signed int64 value', () => {
      expect(elegant.encode(3037000499n, 2891526307n)).toEqual(
        9223372036854775807n
      );
    });

    test('successfully encodes safe-integer arguments', () => {
      numberFixtures.forEach(([x, y, expected]) => {
        expect(elegant.encode(x, y)).toEqual(expected);
      });
    });

    test('successfully encodes bigint arguments', () => {
      bigIntFixtures.forEach(([x, y, expected]) => {
        expect(elegant.encode(BigInt(x), BigInt(y))).toEqual(BigInt(expected));
      });

      // plain numbers should work as well
      numberFixtures.forEach(([x, y, expected]) => {
        expect(elegant.encode(BigInt(x), BigInt(y))).toEqual(BigInt(expected));
      });
    });

    describe('compare with number-pairings', () => {
      const pairFunc = npElegant();

      test('yields similar results', () => {
        expect(pairFunc.join(25202, 165032)).toBe(
          elegant.encode(25202, 165032)
        );
      });
    });
  });

  describe('decode()', () => {
    test('throws when argument is a float number', () => {
      expect(() => elegant.decode(0.123)).toThrow(TypeError);
    });

    test('throws when argument is a negative integer number', () => {
      expect(() => elegant.decode(-123)).toThrow(TypeError);
    });

    test('throws when argument is a negative bigint', () => {
      expect(() => elegant.decode(-123n)).toThrow(TypeError);
    });

    test('throws when argument is a non-safe integer number', () => {
      expect(() => elegant.decode(Number.MAX_SAFE_INTEGER + 1)).toThrow(
        TypeError
      );
    });

    test('throws when any argument is string', () => {
      //@ts-expect-error
      expect(() => elegant.spit('abc')).toThrow(TypeError);
    });

    test('handles zero(0) corner-case', () => {
      expect(elegant.decode(0)).toEqual([0, 0]);
    });

    test('handles largest signed int64 value', () => {
      expect(elegant.decode(9223372036854775807n)).toEqual([
        3037000499n,
        2891526307n,
      ]);
    });

    test('successfully decodes safe-integer', () => {
      numberFixtures.forEach(([x, y, expected]) => {
        expect(elegant.decode(expected)).toEqual([x, y]);
      });
    });

    test('successfully decodes bigint', () => {
      bigIntFixtures.forEach(([x, y, expected]) => {
        expect(elegant.decode(BigInt(expected))).toEqual([
          BigInt(x),
          BigInt(y),
        ]);
      });

      // plain numbers should work as well
      numberFixtures.forEach(([x, y, expected]) => {
        expect(elegant.decode(BigInt(expected))).toEqual([
          BigInt(x),
          BigInt(y),
        ]);
      });
    });
  });
});
