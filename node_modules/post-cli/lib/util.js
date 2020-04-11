'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const increaseId = () => {
  let count = 0;
  return () => {
    return count++;
  };
};

const readdirSync = (dir, ...param) => {
  return _fs2.default.readdirSync(dir, ...param).map(p => _path2.default.join(dir, p));
};

const mkdirsSync = (dir, ...param) => {
  const dirs = dir.split(_path2.default.sep);
  let currentDir = '';
  while (dirs.length) {
    currentDir = [currentDir, dirs.shift()].join(_path2.default.sep);
    if (!_fs2.default.existsSync(currentDir)) {
      _fs2.default.mkdirSync(currentDir);
    }
  }
};

const writeFileSync = (file, ...param) => {
  mkdirsSync(_path2.default.dirname(file));
  _fs2.default.writeFileSync(file, ...param);
};

exports.default = {
  increaseId: increaseId(),
  readdirSync,
  mkdirsSync,
  writeFileSync
};