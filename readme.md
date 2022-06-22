# Base16384

A unicode-based encoding scheme that presents binary data (sequence of 8-bit bytes) in sequences of 16-bit printable unicode characters. It saves 17% space compared to base64.

Inspired by [fumiama/base16384](https://github.com/fumiama/base16384).

## Description

Base16384 uses 16384 (2^14) Chinese characters (from `\u4E00` to `\u8DFF`) to represent binary data.

If the length of the binary data is not a multiple of 7, we will add a `\u3D0x` (where x is the remainder modulo 7) after the output.

## Usage
