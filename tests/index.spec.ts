import assert from 'assert'
import { encode } from '../src'

it('encode', () => {
  assert.equal(encode(''), '')
  assert.equal(encode('1'), '婀㴁')
  assert.equal(encode('12'), '婌渀㴂')
  assert.equal(encode('123'), '婌焰㴃')
  assert.equal(encode('1234'), '婌焳帀㴄')
  assert.equal(encode('12345'), '婌焳廔㴅')
  assert.equal(encode('123456'), '婌焳廔萀㴆')
  assert.equal(encode('1234567'), '婌焳廔萷')
  assert.equal(encode('12345678'), '婌焳廔萷尀㴁')
  assert.equal(encode('123456789'), '婌焳廔萷導帀㴂')
})
