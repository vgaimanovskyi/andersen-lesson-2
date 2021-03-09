// task 1
function makeObjectDeepCopy(obj) {
  if (obj === null) {
    return null;
  } else if (Array.isArray(obj)) {
    return obj.map(makeObjectDeepCopy);
  } else if (isObject(obj)) {
    const copyObj = {};
    Object.keys(obj).forEach(key => {
      copyObj[key] = makeObjectDeepCopy(obj[key]);
    });
    return copyObj;
  } else {
    return obj;
  }
}

function isObject(obj) {
  return typeof obj === 'object';
}


// task 2
function selectFromInterval(array, num1, num2) {
  if (!Array.isArray(array)) {
    throw new Error(`Data ${array} is not an array!`);
  } else if (isNumberArray(array)) {
    throw new Error(`Params in array are not a number!`);
  } else if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    throw new Error(`Params are not a number!`);
  }
  const min = Math.min(num1, num2);
  const max = Math.max(num1, num2);
  array.sort();
  const startIndex = array.findIndex(el => el >= min);
  const result = array.slice(startIndex);
  const endIndex = result.findIndex(el => el > max) === max ? result.findIndex(el => el > max) + 1 : result.findIndex(el => el > max);
  result.splice(endIndex);

  return result;
}

function isNumberArray(array) {
  return !!array.find(el => typeof el !== 'number');
}


// task 3
const myIterable = { from: 1, to: 4 };

if (objValid(myIterable)) {
  myIterable[Symbol.iterator] = function () {
    return {
      current: this.from,
      end: this.to,
      next() {
        if (this.current <= this.end) {
          return {
            done: false,
            value: this.current++
          }
        } else {
          return { done: true }
        }
      }
    }
  }
} else {
  throw new Error('Invalid data');
}

function objValid(obj) {
  const { from, to } = obj;
  if (typeof from === 'number' && typeof to === 'number') {
    if (!isNaN(from) && !isNaN(to)) {
      if (to > from) {
        return true;
      }
    };
  }
  return false;
}