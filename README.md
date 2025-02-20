# Pairing

Number pairing functions with support for BigInt numbers.

[![Build Status](https://github.com/causaly/pairing/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/causaly/pairing/actions/workflows/ci.yml) [![npm version](https://badge.fury.io/js/pairing.svg)](https://www.npmjs.com/package/pairing)

#### Features

- Simple API;
- Works with plain numbers or BigInt;
- Extensive tests;
- Typescript support.

## Installation

```bash
npm install pairing
```

#### Requirements

- Node.js v.22+

## Quick start

```typescript
import { elegant } from 'pairing';

// encode bigint numbers
const z = elegant.encode(3037000499n, 2891526307n); // returns 9223372036854775807n

// decode bigint number
const [x, y] = elegant.decode(9223372036854775807n); // returns [3037000499n, 2891526307n]
```

## Supported pairing functions

- [Szudzik Pairing](http://szudzik.com/ElegantPairing.pdf), a.k.a. Elegant

## Motivation

[Pairing functions](https://en.wikipedia.org/wiki/Pairing_function) are magic. They encode two natural numbers into a derivative natural. This can be useful in various use-cases, such as optimizing compound numeric indices.

At the time of writing, none of the existing libraries in npm supported BigInt calculations. Types were also missing.

#### We are hiring

Causaly is building the world's largest biomedical knowledge platform, using technologies such as TypeScript, React and Node.js. Find out more about our openings at https://apply.workable.com/causaly/.

## License

MIT
