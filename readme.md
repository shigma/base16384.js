# Base16384

[![Codecov](https://img.shields.io/codecov/c/github/shigma/base16384?style=flat-square)](https://codecov.io/gh/shigma/base16384)
[![downloads](https://img.shields.io/npm/dm/base16384?style=flat-square)](https://www.npmjs.com/package/base16384)
[![npm](https://img.shields.io/npm/v/base16384?style=flat-square)](https://www.npmjs.com/package/base16384)
[![GitHub](https://img.shields.io/github/license/shigma/base16384?style=flat-square)](https://github.com/shigma/base16384/blob/master/LICENSE)

A unicode-based encoding scheme that presents binary data (sequence of 8-bit bytes) in sequences of 14-bit printable Chinese characters. It saves 17% space compared to base64.

Inspired by [fumiama/base16384](https://github.com/fumiama/base16384).

## Description

Base16384 uses 16384 (2<sup>14</sup>) Chinese characters (from `\u4E00` to `\u8DFF`) to represent binary data.

If the length of the binary data is not a multiple of 7, we will add a `\u3D0x` (where x is the remainder modulo 7) after the output.

## Comparison

|           | Base64          | Base16384         |
| --------- |:---------------:|:-----------------:|
| Overhead  | 33%             | 14%               |
| Charset   | `[0-9a-zA-Z+/]` | `[\u4E00-\u8DFF]` |
| Example   | `RXhhbXBsZQ==`  | `彞吖菁穥㴀`        |

## Usage

```ts
import { decode, encode } from 'base16384'

const buffer = encode('Example') // Uint16Array
new TextDecoder().decode(decode(buffer)) // 'Example'
```

## API

### encode(data)

- data: `string | Uint8Array` original binary data
- returns: `Uint16Array` base16384-encoded data

Encode binary data to base16384.

### decode(data)

- data: `string | Uint16Array` base16384-encoded data
- returns: `Uint8Array` original binary data

Decode base16384 to binary data.
