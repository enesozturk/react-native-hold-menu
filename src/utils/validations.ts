import { IMenuItem } from '../components/menu/types';

function fieldAreSame(obj1: IMenuItem, obj2: IMenuItem) {
  'worklet';
  let areObjectsSame = true;

  const keys = Object.keys(obj1);

  keys.forEach(key => {
    // @ts-ignore
    const val1 = obj1[key];
    // @ts-ignore
    const val2 = obj2[key];

    if (val1 !== val2) {
      if (typeof val1 === 'function' && typeof val2 === 'function')
        areObjectsSame = val1.toString() === val2.toString();
      else areObjectsSame = false;
    }
  });

  return areObjectsSame;
}

function deepEqual(array1: IMenuItem[], array2: IMenuItem[] | null) {
  'worklet';
  let areEqual = true;

  const areArrays = Array.isArray(array1) && Array.isArray(array2);
  const areSameLength = areArrays && array2 && array1.length === array2.length;

  if (areArrays && areSameLength && array2) {
    array1.forEach((menuItem: IMenuItem, index) => {
      const obj1 = menuItem;
      const obj2 = array2[index];

      const isFieldsAreSame = fieldAreSame(obj1, obj2);
      if (!isFieldsAreSame) areEqual = false;
    });
  } else areEqual = false;

  return areEqual;
}

export { deepEqual };
