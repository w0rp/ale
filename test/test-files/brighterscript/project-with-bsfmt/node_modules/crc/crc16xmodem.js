import { Buffer } from 'buffer';
import createBuffer from './create_buffer';
import defineCrc from './define_crc';

const crc16xmodem = defineCrc('xmodem', function(buf, previous) {
  if (!Buffer.isBuffer(buf)) buf = createBuffer(buf);

  let crc = typeof previous !== 'undefined' ? ~~previous : 0x0;

  for (let index = 0; index < buf.length; index++) {
    const byte = buf[index];
    let code = (crc >>> 8) & 0xff;

    code ^= byte & 0xff;
    code ^= code >>> 4;
    crc = (crc << 8) & 0xffff;
    crc ^= code;
    code = (code << 5) & 0xffff;
    crc ^= code;
    code = (code << 7) & 0xffff;
    crc ^= code;
  }

  return crc;
});

export default crc16xmodem;
