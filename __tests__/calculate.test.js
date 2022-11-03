import { add, subtract, multiply, divide } from '../utils/calculate'

describe("Calculator - add", () => {
    test('adds two numbers together and returns the sum', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('adds two float numbers', () => {
        expect(add(0.5, 0.5)).toBe(1);
    });

    test('adds one number and one float', () => {
        expect(add(1, 0.5)).toBe(1.5);
    })

    test('Throws an error if input is not a number', () => {
        expect(() => {
            add('a', 'b');
        }).toThrow();
    })

    test('Throws an error if input is null', () => {
        expect(() => {
            add(null, ''); // empty string or null?
        }).toThrow();
    })

    test('Throws an error if input is undefined', () => {
        expect(() => {
            add(undefined, undefined);
        }).toThrow();
    })

})

describe("Calculator - subtract", () => {
    test('subtracts two numbers', () => {
        expect(subtract(2, 1)).toBe(1);
    });

    test('subtracts two float numbers', () => {
        expect(subtract(1.5, 0.5)).toBe(1);
    });

    test('subtracts a number and a float number', () => {
        expect(subtract(1, 0.5)).toBe(0.5);
    });

    test('subtracts greater number from smaller number and returns negative number', () => {
        expect(subtract(5, 10)).toBe(-5);
    });

    test('subtracts negative number', () => {
        expect(subtract(-1, 2)).toBe(-3);
    });

    test('Throws an error if input is not a number', () => {
        expect(() => {
            subtract('a', 'b');
        }).toThrow();
    })

    test('Throws an error if input is null', () => {
        expect(() => {
            subtract('', '');
        }).toThrow();
    })

    test('Throws an error if input is undefined', () => {
        expect(() => {
            subtract(undefined, undefined);
        }).toThrow();
    })

})

describe("Calculator - multiply", () => {
    test('multiplies two numbers', () => {
        expect(multiply(2, 2)).toBe(4);
    });

    test('multiplies a number and a zero and returns zero', () => {
        expect(multiply(8, 0)).toBe(0);
    });

    test('multiplies two negative numbers and returns positive number', () => {
        expect(multiply(-5, -5)).toBe(25);
    });

    test('multiplies one negative and positive number and returns negative number', () => {
        expect(multiply(-5, 2)).toBe(-10);
    });

    test('mulitiplies float numbers', () => {
        expect(multiply(1.5, 0.5)).toBe(0.75);
    });

    test('Throws an error if input is not a number', () => {
        expect(() => {
            multiply('a', 'b');
        }).toThrow();
    })

    test('Throws an error if input is null', () => {
        expect(() => {
            multiply('', '');
        }).toThrow();
    })

    test('Throws an error if input is undefined', () => {
        expect(() => {
            multiply(undefined, undefined);
        }).toThrow();
    })

})

describe("Calculator - divide", () => {
    test('divides two numbers', () => {
        expect(divide(2, 2)).toBe(1);
    });

    test('divides two float numbers', () => {
        expect(divide(7.4, .2)).toBe(37);
    });

    test('divides two negative numbers', () => {
        expect(divide(-2, -2)).toBe(1);
    });

    test('throws error is dividing by zero', () => {
        expect(() => {
            divide(2, 0);
        }).toThrow();
    });

    test('Throws an error if input is not a number', () => {
        expect(() => {
            divide('a', 'b');
        }).toThrow();
    })

    test('Throws an error if input is null', () => {
        expect(() => {
            multiply('', '');
        }).toThrow();
    })

    test('Throws an error if input is undefined', () => {
        expect(() => {
            divide(undefined, undefined);
        }).toThrow();
    })
})