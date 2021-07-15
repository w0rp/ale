/**
 * node-crc32-stream
 *
 * Copyright (c) 2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/archiverjs/node-crc32-stream/blob/master/LICENSE-MIT
 */

'use strict';

const {DeflateRaw} = require('zlib');

const {crc32} = require('crc');

class DeflateCRC32Stream extends DeflateRaw {
  constructor(options) {
    super(options);

    this.checksum = Buffer.allocUnsafe(4);
    this.checksum.writeInt32BE(0, 0);

    this.rawSize = 0;
    this.compressedSize = 0;
  }

  push(chunk, encoding) {
    if (chunk) {
      this.compressedSize += chunk.length;
    }

    return super.push(chunk, encoding);
  }

  write(chunk, enc, cb) {
    if (chunk) {
      this.checksum = crc32(chunk, this.checksum);
      this.rawSize += chunk.length;
    }

    return super.write(chunk, enc, cb);
  }

  digest(encoding) {
    const checksum = Buffer.allocUnsafe(4);
    checksum.writeUInt32BE(this.checksum >>> 0, 0);
    return encoding ? checksum.toString(encoding) : checksum;
  }

  hex() {
    return this.digest('hex').toUpperCase();
  }

  size(compressed = false) {
    if (compressed) {
      return this.compressedSize;
    } else {
      return this.rawSize;
    }
  }
}

module.exports = DeflateCRC32Stream;
