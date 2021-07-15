'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crcjam = exports.crc32 = exports.crc24 = exports.crc16kermit = exports.crc16xmodem = exports.crc16modbus = exports.crc16ccitt = exports.crc16 = exports.crc81wire = exports.crc8 = exports.crc1 = undefined;

var _crc = require('./crc1');

var _crc2 = _interopRequireDefault(_crc);

var _crc3 = require('./crc8');

var _crc4 = _interopRequireDefault(_crc3);

var _crc81wire = require('./crc81wire');

var _crc81wire2 = _interopRequireDefault(_crc81wire);

var _crc5 = require('./crc16');

var _crc6 = _interopRequireDefault(_crc5);

var _crc16ccitt = require('./crc16ccitt');

var _crc16ccitt2 = _interopRequireDefault(_crc16ccitt);

var _crc16modbus = require('./crc16modbus');

var _crc16modbus2 = _interopRequireDefault(_crc16modbus);

var _crc16xmodem = require('./crc16xmodem');

var _crc16xmodem2 = _interopRequireDefault(_crc16xmodem);

var _crc16kermit = require('./crc16kermit');

var _crc16kermit2 = _interopRequireDefault(_crc16kermit);

var _crc7 = require('./crc24');

var _crc8 = _interopRequireDefault(_crc7);

var _crc9 = require('./crc32');

var _crc10 = _interopRequireDefault(_crc9);

var _crcjam = require('./crcjam');

var _crcjam2 = _interopRequireDefault(_crcjam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.crc1 = _crc2.default;
exports.crc8 = _crc4.default;
exports.crc81wire = _crc81wire2.default;
exports.crc16 = _crc6.default;
exports.crc16ccitt = _crc16ccitt2.default;
exports.crc16modbus = _crc16modbus2.default;
exports.crc16xmodem = _crc16xmodem2.default;
exports.crc16kermit = _crc16kermit2.default;
exports.crc24 = _crc8.default;
exports.crc32 = _crc10.default;
exports.crcjam = _crcjam2.default;
exports.default = {
  crc1: _crc2.default,
  crc8: _crc4.default,
  crc81wire: _crc81wire2.default,
  crc16: _crc6.default,
  crc16ccitt: _crc16ccitt2.default,
  crc16modbus: _crc16modbus2.default,
  crc16xmodem: _crc16xmodem2.default,
  crc16kermit: _crc16kermit2.default,
  crc24: _crc8.default,
  crc32: _crc10.default,
  crcjam: _crcjam2.default
};
