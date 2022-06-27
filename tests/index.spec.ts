import assert from 'assert'
import { decode, encode, toUint16Array, toUint8Array } from '../src'

it('example', () => {
  const buffer = encode('Example')
  assert.equal(new TextDecoder().decode(decode(buffer)), 'Example')
})

it('encode', () => {
  assert.deepEqual(encode(''), toUint16Array('㴀'))
  assert.deepEqual(encode('1'), toUint16Array('婀㴁'))
  assert.deepEqual(encode('12'), toUint16Array('婌渀㴂'))
  assert.deepEqual(encode('123'), toUint16Array('婌焰㴃'))
  assert.deepEqual(encode('1234'), toUint16Array('婌焳帀㴄'))
  assert.deepEqual(encode('12345'), toUint16Array('婌焳廔㴅'))
  assert.deepEqual(encode('123456'), toUint16Array('婌焳廔萀㴆'))
  assert.deepEqual(encode('1234567'), toUint16Array('婌焳廔萷㴀'))
  assert.deepEqual(encode('12345678'), toUint16Array('婌焳廔萷尀㴁'))
  assert.deepEqual(encode('123456789'), toUint16Array('婌焳廔萷導帀㴂'))
})

it('decode', () => {
  assert.deepEqual(decode('㴀'), toUint8Array(''))
  assert.deepEqual(decode('婀㴁'), toUint8Array('1'))
  assert.deepEqual(decode('婌渀㴂'), toUint8Array('12'))
  assert.deepEqual(decode('婌焰㴃'), toUint8Array('123'))
  assert.deepEqual(decode('婌焳帀㴄'), toUint8Array('1234'))
  assert.deepEqual(decode('婌焳廔㴅'), toUint8Array('12345'))
  assert.deepEqual(decode('婌焳廔萀㴆'), toUint8Array('123456'))
  assert.deepEqual(decode('婌焳廔萷㴀'), toUint8Array('1234567'))
  assert.deepEqual(decode('婌焳廔萷尀㴁'), toUint8Array('12345678'))
  assert.deepEqual(decode('婌焳廔萷導帀㴂'), toUint8Array('123456789'))
})
