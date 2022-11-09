import { add, subtract, multiply, divide } from '../../utils/calculate'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Calculate from '../../components/Calculator'

/**
 * @jest-environment jsdom
 */

describe('Calculate Component', () => {
    it('renders calculate button', () => {
        render(<Calculate />)
    })
})

describe("Calculator - add", () => {
    test('adds two numbers together and returns the sum', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('adds two float numbers together', () => {
        expect(add(0.2, 0.1)).toBeCloseTo(0.3);
    });

    test('adds one number and one float', () => {
        expect(add(1, 0.5)).toBeCloseTo(1.5);
    })

    test('Throws an error if input is not a number', () => {
        expect(() => {
            add('a', 'b');
        }).toThrow('Enter only numbers');
    })

    test('Throws an error if input is null', () => {
        expect(() => {
            add('', ''); // empty string or null?
        }).toThrow('Must enter numbers');
    })

    test('Throws an error if input is undefined', () => {
        expect(() => {
            add(undefined, undefined);
        }).toThrow('Enter only numbers');
    })

})

describe("Calculator - subtract", () => {
    test('subtracts two numbers', () => {
        expect(subtract(2, 1)).toBe(1);
    });

    test('subtracts two float numbers', () => {
        expect(subtract(1.5, 0.5)).toBeCloseTo(1);
    });

    test('subtracts a number and a float number', () => {
        expect(subtract(1, 0.5)).toBeCloseTo(0.5);
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
        }).toThrow('Enter only numbers');
    })

    test('Throws an error if input is null', () => {
        expect(() => {
            subtract('', '');
        }).toThrow('Must enter numbers');
    })

    test('Throws an error if input is undefined', () => {
        expect(() => {
            subtract(undefined, undefined);
        }).toThrow('Enter only numbers');
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
        expect(multiply(1.5, 0.5)).toBeCloseTo(0.75);
    });

    test('Throws an error if input is not a number', () => {
        expect(() => {
            multiply('a', 'b');
        }).toThrow('Enter only numbers');
    })

    test('Throws an error if input is null', () => {
        expect(() => {
            multiply('', '');
        }).toThrow('Must enter numbers');
    })

    test('Throws an error if input is undefined', () => {
        expect(() => {
            multiply(undefined, undefined);
        }).toThrow('Enter only numbers');
    })

})

describe("Calculator - divide", () => {
    test('divides two numbers', () => {
        expect(divide(2, 2)).toBe(1);
    });

    test('divides two float numbers', () => {
        expect(divide(7.4, .2)).toBeCloseTo(37);
    });

    test('divides two negative numbers', () => {
        expect(divide(-2, -2)).toBe(1);
    });

    test('throws error is dividing by zero', () => {
        expect(() => {
            divide(2, 0);
        }).toThrow(`Can't divide by zero`);
    });

    test('Throws an error if input is not a number', () => {
        expect(() => {
            divide('a', 'b');
        }).toThrow('Enter only numbers');
    })

    test('Throws an error if input is null', () => {
        expect(() => {
            multiply('', '');
        }).toThrow('Must enter numbers');
    })

    test('Throws an error if input is undefined', () => {
        expect(() => {
            divide(undefined, undefined);
        }).toThrow('Enter only numbers');
    })
})