export const add = (first, second) => {
  if (first === '' || first === null || second === '' || second === null) {
    throw new Error('Must enter numbers')
  }
  if (typeof (first) !== 'number' || typeof (second) !== 'number') {
    throw new Error('Enter only numbers')
  }
  return first + second;
};


export const subtract = (first, second) => {
  if (first === '' || first === null || second === '' || second === null) {
    throw new Error('Must enter numbers')
  }
  if (typeof (first) !== 'number' || typeof (second) !== 'number') {
    throw new Error('Enter only numbers')
  }
  return first - second;
};

export const multiply = (first, second) => {
  if (first === '' || first === null || second === '' || second === null) {
    throw new Error('Must enter numbers')
  }
  if (typeof (first) !== 'number' || typeof (second) !== 'number') {
    throw new Error('Enter only numbers')
  }
  return first * second;
};

export const divide = (first, second) => {
  if (first === '' || first === null || second === '' || second === null) {
    throw new Error('Must enter numbers')
  }
  if (typeof (first) !== 'number' || typeof (second) !== 'number') {
    throw new Error('Enter only numbers')
  }
  if (second === 0) {
    throw new Error(`Can't divide by zero`)
  }
  return first / second;
};

