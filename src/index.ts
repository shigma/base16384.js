export function encode(input: string | Uint8Array) {
  const output: number[] = []
  function push(code: number, base = 0x4e00) {
    code += base
    output.push(code & 0xff)
    output.push((code >> 8) & 0xff)
  }

  if (typeof input === 'string') {
    input = Buffer.from(input)
  }

  let offset = 0, rest = 0
  for (let i = 0; i < input.length; i++) {
    offset += 8
    if (offset < 14) {
      rest += input[i] << (14 - offset)
      continue
    }
    offset -= 14
    push(rest + (input[i] >> offset))
    rest = (input[i] << (14 - offset)) & 0x3fff
  }
  if (offset) {
    push(rest)
    push(input.length % 7, 0x3d00)
  }

  return Buffer.from(output).toString('utf16le')
}
