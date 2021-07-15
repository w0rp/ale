import { Buffer } from 'buffer';

const createBuffer =
  Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow
    ? Buffer.from
    : // support for Node < 5.10
      val => new Buffer(val);

export default createBuffer;
