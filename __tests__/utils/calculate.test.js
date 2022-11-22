import { add, subtract, multiply, divide } from '../../utils/calculate'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Calculator from '../../components/Calculator'
import userEvent from "@testing-library/user-event"
import { rest } from 'msw'
import { setupServer } from "msw/node"

// Jest 

const server = setupServer(
    rest.get("http://localhost/api/calculate/*", async (req, res, ctx) => {
        return res(ctx.json({ result: 3 }))
        //needs mock axios to pass
    })
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders result when fetched successfully', async () => {

    render(<Calculator />);

    await userEvent.click(screen.getByRole("button", { name: /calculate/i }))
    setTimeout(() => {
        expect(screen.getByRole("heading").textContent).toBe("3")
    }, 1000)
})


describe('Calculate Component', () => {
    it('renders calculate button', () => {
        render(<Calculator />);
        const button = screen.getByRole('button', { name: 'Calculate' });
        expect(button).toBeInTheDocument();
    });

    it('should correctly set default option', () => {
        render(<Calculator />)
        expect(screen.getByRole('option', { name: 'Op' }).selected).toBe(true)
    })


    it('select op +', async () => {
        render(<Calculator />);
        await userEvent.selectOptions(
            //Find the select element
            screen.getByRole('combobox'), ["add"]
        )
        expect(screen.getByRole('option', { name: '+' }).selected).toBe(true);
    });

    // it('fill form', async () => {
    //     render(<Calculator />);

    //     userEvent.type(screen.getByRole('textbox', { name: /first number/i })), 1;

    //     userEvent.selectOptions(
    //         screen.getByRole('combobox'), ["add"]
    //     )
    //     userEvent.type(screen.getByRole('textbox', { name: /second number/i })), 1;
    //     userEvent.click(screen.getByRole('button', { name: /calculate/i }))

    //     //const result = await screen.findByRole('heading', {  name: /2/i})
    //     expect(await screen.findByRole('heading', { name: /2/i })).toBeVisible();
        

    // })
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
        }).toThrow('Enter only numbers');
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
        }).toThrow('Enter only numbers');
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
        }).toThrow('Enter only numbers');
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
        }).toThrow('Enter only numbers');
    })

    test('Throws an error if input is undefined', () => {
        expect(() => {
            divide(undefined, undefined);
        }).toThrow('Enter only numbers');
    })
})