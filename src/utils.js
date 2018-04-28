import _ from 'lodash';
const type = _.type = obj => Object.prototype.toString.call(obj).replace(/\[object |]/g, '');
_.each([
  'String',
  'Object',
  'PlainObject',
  'Array',
  'Finite',
  'Function',
  'Undefined',
  'RegExp',
], function(type) {
  let check = _['is' + type];

  _['isArrayOf' + type + 's'] = function(arr) {
    // quick shallow check of arrays
    return _.isArray(arr) && _.every(arr.slice(0, arr.length), check);
  };
  _[`isNot${type}`] = obj => (check(obj) === false);
});

export {
  type,
  _ as default };
