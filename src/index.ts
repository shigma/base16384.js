export function encode(input: string | Uint8Array) {
  if (typeof input === 'string') {
    input = new TextEncoder().encode(input)
  }

  let offset = 0, rest = 0, output = ''
  for (const byte of input) {
    offset += 8
    if (offset < 14) {
      rest += (byte << (14 - offset)) & 0x3fff
      continue
    }
    offset -= 14
    output += String.fromCharCode(rest + (byte >> offset) + 0x4e00)
    rest = (byte << (14 - offset)) & 0x3fff
  }

  if (offset) {
    output += String.fromCharCode(rest + 0x4e00)
    output += String.fromCharCode(input.length % 7 + 0x3d00)
  }

  return output
}
