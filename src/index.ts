type TypedArray = Uint8Array | Uint16Array

function align(input: TypedArray, output: TypedArray, sWidth: number, tWidth: number, sOffset: number, tOffset: number) {
  let offset = 0
  let rest = 0
  let i = 0, j = 0
  const mask = (1 << tWidth) - 1
  while (i < input.length) {
    const char = input[i] - sOffset
    offset += sWidth
    while (offset >= tWidth) {
      offset -= tWidth
      output[j++] = rest + (char >> offset) + tOffset
      if (j === output.length) return
      rest = 0
    }
    rest += (char << (tWidth - offset)) & mask
    i++
  }
  if (offset) {
    output[j++] = rest + tOffset
  }
}

export function toUint8Array(source: string) {
  return new TextEncoder().encode(source)
}

export function encode(input: string | Uint8Array) {
  if (typeof input === 'string') {
    input = toUint8Array(input)
  }

  const output = new Uint16Array(Math.ceil(input.length * 4 / 7) + 1)
  align(input, output, 8, 14, 0, 0x4e00)
  output[output.length - 1] = input.length % 7 + 0x3d00
  return output
}

export function toUint16Array(source: string) {
  const input = new Uint16Array(source.length)
  for (let i = 0; i < source.length; i++) {
    input[i] = source.charCodeAt(i)
  }
  return input
}

export function decode(input: string | Uint16Array) {
  if (typeof input === 'string') {
    input = toUint16Array(input)
  }

  const length = input.length - 1
  const residue = (input[length] - 0x3d00) || 7
  const output = new Uint8Array(Math.floor((length - 1) / 4) * 7 + residue)
  align(input, output, 14, 8, 0x4e00, 0)
  return output
}
