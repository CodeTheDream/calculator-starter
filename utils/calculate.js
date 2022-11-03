export const add = (first, second) => {
  if (typeof (first) !== 'number' || typeof (second) !== 'number') {
    throw new Error('Enter only numbers')
  }
  if (first === '' && null || second === '' && null) {
    throw new Error('Must enter numbers')
  }
  if (first === undefined || second === undefined) {
    throw new Error('value is undefined')
  }
  return first + second;
};

export const subtract = (first, second) => {
  if (typeof (first) !== 'number' || typeof (second) !== 'number') {
    throw new Error('Enter only numbers')
  }
  if (first === '' && null || second === '' && null) {
    throw new Error('Must enter numbers')
  }
  if (first === undefined || second === undefined) {
    throw new Error('value is undefined')
  }
  return first - second;
};

export const multiply = (first, second) => {
  if (typeof (first) !== 'number' || typeof (second) !== 'number') {
    throw new Error('Enter only numbers')
  }
  if (first === '' && null || second === '' && null) {
    throw new Error('Must enter numbers')
  }
  if (first === undefined || second === undefined) {
    throw new Error('value is undefined')
  }
  return first * second;
};

export const divide = (first, second) => {
  if (typeof (first) !== 'number' || typeof (second) !== 'number') {
    throw new Error('Enter only numbers')
  }
  if (first === '' && null || second === '' && null) {
    throw new Error('Must enter numbers')
  }
  if (first === undefined || second === undefined) {
    throw new Error('value is undefined')
  }
  if (second === 0) {
    throw new Error(`Can't divide by zero`)
  }
  return first / second;
};

