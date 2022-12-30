"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepEqual = deepEqual;

function fieldAreSame(obj1, obj2) {
  'worklet';

  const keys = Object.keys(obj1);
  return keys.every(key => {
    // @ts-ignore
    const val1 = obj1[key]; // @ts-ignore

    const val2 = obj2[key];

    if (val1 !== val2) {
      if (typeof val1 === 'function' && typeof val2 === 'function') return val1.toString() === val2.toString();
      return false;
    }

    return true;
  });
}

function deepEqual(array1, array2) {
  'worklet';

  const areArrays = Array.isArray(array1) && Array.isArray(array2);
  const areSameLength = areArrays && array2 && array1.length === array2.length;

  if (areArrays && areSameLength && array2) {
    return array1.every((menuItem, index) => {
      const obj1 = menuItem;
      const obj2 = array2[index];
      return fieldAreSame(obj1, obj2);
    });
  }

  return false;
}
//# sourceMappingURL=validations.js.map