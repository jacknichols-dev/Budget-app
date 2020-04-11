'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _yamljs = require('yamljs');

var _yamljs2 = _interopRequireDefault(_yamljs);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  readdirSync,
  increaseId: id
} = _util2.default;

const list = readdirSync(_config2.default.source);

const db = {
  posts: {},
  categories: {},
  tags: {}
};

while (list.length) {
  const target = list.pop();
  const stat = _fs2.default.statSync(target);

  if (stat.isDirectory()) {
    list.push(...readdirSync(target));
  } else if (stat.isFile()) {
    const targetId = id();
    const categories = _path2.default.dirname(_path2.default.relative(_config2.default.source, target)).split(_path2.default.sep);

    const raw = _fs2.default.readFileSync(target, { encoding: 'utf-8' });
    const items = raw.split(/\n---*\n/);
    const postConfig = _yamljs2.default.parse(items.shift());
    const md = items.join('\n---\n');
    const relativePath = _path2.default.relative(_config2.default.source, target);

    // post
    db.posts[targetId] = {
      url: [_config2.default.url, ...relativePath.split(_path2.default.sep)].join('/'),
      version: (0, _md2.default)(raw),
      config: postConfig,
      relativePath,
      md

      // categories
    };db.categories = categories.reduce((res, cat) => {
      if (cat !== '.') {
        res[cat] = res[cat] || new Set();
        res[cat].add(targetId);
      }
      return res;
    }, db.categories);

    // tags
    db.tags = (postConfig.tags || []).reduce((res, tag) => {
      res[tag] = res[tag] || new Set();
      res[tag].add(targetId);
      return res;
    }, db.tags);
  }
}

Object.values(db.posts).forEach(post => {
  _util2.default.writeFileSync(_path2.default.join(_config2.default.public, post.relativePath), post.md);
  delete post.public;
  delete post.md;
});

_jsonfile2.default.writeFileSync(_path2.default.join(_config2.default.public, 'db.json'), db);