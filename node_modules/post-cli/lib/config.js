'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultConfig = {
  url: '/',
  source: './source',
  public: './public'
};

const cwd = process.cwd();

const configFilePath = _path2.default.join(cwd, './.startrc');

let config = _extends({}, defaultConfig, _jsonfile2.default.readFileSync(configFilePath));

exports.default = _extends({}, config, {
  source: _path2.default.join(cwd, config.source),
  public: _path2.default.join(cwd, config.public)
});