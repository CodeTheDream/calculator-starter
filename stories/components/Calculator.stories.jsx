import React from "react";
import { rest } from "msw";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { add, subtract, multiply, divide } from "../../utils/calculate";

import Calculator from "../../components/Calculator";

export default {
  title: "Components/Calculator",
  component: Calculator,
  parameters: {
    msw: {
      handlers: [
        rest.get(
    "/api/calculate/:operation/:first/:second",
    async (req, res, ctx) => {
      const params = req.params;
      let result;
      switch (params.operation) {
        case "add":
          result = add(params.first, params.second);
          break;
        case "subtract":
          result = subtract(params.first, params.second);
          break;
        case "multiply":
          result = multiply(params.first, params.second);
          break;
        case "divide":
          result = divide(params.first, params.second);
          break;
        default:
          throw new Error(`Unsupported operation ${params.operation}`);
      }
      return res(
        ctx.status(200),
        ctx.json({
          result
        })
      );
    }
  ),
        // rest.get("/api/calculate/:operation/:first/:second", (req, res, ctx) => {
        //   console.log("here")
          // if (req.params[0] === "//") {
          //   return res(ctx.status(500, "no params"),ctx.json({ message: "no params" }));
          // }

          // const params = req.params[0].split("/");
          // // console.log(params)
          // // if (params.length !== 3 ) {
          // //   return res(
          // //     ctx.status(
          // //       500,
          // //       `didn't receive expected params. got: ${params}`
          // //     ),ctx.json({ message: `didn't receive expected params. got: ${params}` })
          // //   );
          // // }
          
          // if  (isNaN(params[1]) || params[1] === '' || isNaN(params[2]) || params[2] === '') {
          //   return res(
          //     ctx.status(
          //       500,
          //       `didn't receive expected params. got: ${params}`
          //     ),ctx.json({ message: `didn't receive expected params. got: ${params}` })
          //   );
          // }

        //   return res(
        //     ctx.json({
        //       result: "ok",
        //     })
        //   );
        // }),
      ],
    },
  },
};

const Template = (args) => <Calculator />;

export const Default = Template.bind({});

export const passingTest = Template.bind({});
passingTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const form = canvasElement.querySelector("#calculator-form");
  userEvent.type(form.querySelector("#first"), "5");
  userEvent.type(form.querySelector("#second"), "5");
  userEvent.selectOptions(form.querySelector("#operation"), ["add"]);
  userEvent.click(canvas.getByRole("button"));

  await waitFor(() => {
    expect(canvasElement.querySelector("#result").innerText).toBe("10");
  });
}

export const firstEmptyErrorTest = Template.bind({});
firstEmptyErrorTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const form = canvasElement.querySelector("#calculator-form");
  userEvent.type(form.querySelector("#first"), "");
  userEvent.type(form.querySelector("#second"), "5");
  userEvent.selectOptions(form.querySelector("#operation"), ["add"]);
  userEvent.click(canvas.getByRole("button"));

  await waitFor(() => {
    expect(canvas.getByText("first field cannot be empty")).toBeInTheDocument();
  });
}

export const opEmptyErrorTest = Template.bind({});
opEmptyErrorTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const form = canvasElement.querySelector("#calculator-form");
  userEvent.type(form.querySelector("#first"), "1");
  userEvent.type(form.querySelector("#second"), "5");
  userEvent.selectOptions(form.querySelector("#operation"), [""]);
  userEvent.click(canvas.getByRole("button"));

  await waitFor(() => {
    expect(canvas.getByText("must select operation")).toBeInTheDocument();
  });
}

export const secondEmptyErrorTest = Template.bind({});
secondEmptyErrorTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const form = canvasElement.querySelector("#calculator-form");
  userEvent.type(form.querySelector("#first"), "1");
  userEvent.type(form.querySelector("#second"), "");
  userEvent.selectOptions(form.querySelector("#operation"), ["add"]);
  userEvent.click(canvas.getByRole("button"));

  await waitFor(() => {
    expect(canvas.getByText("second field cannot be empty")).toBeInTheDocument();
  });
}

export const allEmptyErrorTest = Template.bind({});
allEmptyErrorTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const form = canvasElement.querySelector("#calculator-form");
  userEvent.type(form.querySelector("#first"), "");
  userEvent.type(form.querySelector("#second"), "");
  userEvent.selectOptions(form.querySelector("#operation"), [""]);
  userEvent.click(canvas.getByRole("button"));

  await waitFor(() => {
    expect(canvas.getByText("first field cannot be empty")).toBeInTheDocument();
    expect(canvas.getByText("must select operation")).toBeInTheDocument();
    expect(canvas.getByText("second field cannot be empty")).toBeInTheDocument();
  });
}

export const symbolErrorTest = Template.bind({});
symbolErrorTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const form = canvasElement.querySelector("#calculator-form");
  userEvent.type(form.querySelector("#first"), "?");
  userEvent.type(form.querySelector("#second"), "3");
  userEvent.selectOptions(form.querySelector("#operation"), ["add"]);
  userEvent.click(canvas.getByRole("button"));

  await waitFor(() => {
    expect(canvas.getByText("first field should be number")).toBeInTheDocument();
  });
}

export const letterErrorTest = Template.bind({});
letterErrorTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const form = canvasElement.querySelector("#calculator-form");
  userEvent.type(form.querySelector("#first"), "a");
  userEvent.type(form.querySelector("#second"), "3");
  userEvent.selectOptions(form.querySelector("#operation"), ["add"]);
  userEvent.click(canvas.getByRole("button"));

  await waitFor(() => {
    expect(canvas.getByText("first field should be number")).toBeInTheDocument();
  });
}


// export const InteractiveTest = Template.bind({});
// InteractiveTest.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   const form = canvasElement.querySelector("#calculator-form");
//   userEvent.type(form.querySelector("#first"), "1");
//   userEvent.type(form.querySelector("#second"), "2");
//   userEvent.selectOptions(form.querySelector("#operation"), ["add"]);
//   userEvent.click(canvas.getByRole("button"));

//   await waitFor(() => {
//     expect(canvasElement.querySelector("#result").innerText).toBe("ok");
//   });
// };

// export const StringErrorTest = Template.bind({});
// StringErrorTest.play = async ({canvasElement}) => {
//     const canvas = within(canvasElement);
//     const firstInput = await canvas.findByRole('textbox', { name: /first number/i });
//     const secondInput = await canvas.findByRole('textbox', { name: /second number/i });
//     userEvent.type(firstInput, 'a');
//     userEvent.selectOptions(canvas.getByRole('combobox'), ["add"]);
//     userEvent.type(secondInput, '2')
//     userEvent.click(canvas.getByRole("button", { name: /calculate/i }))

//     await waitFor(()=> {
//         expect(canvasElement.querySelector('#result').innerText).toBe("didn't receive expected params. got: add,a,2")
//     })
//     await waitFor(()=> {
//         expect(canvas.getByText("didn't receive expected params. got: add,a,2")).toBeInTheDocument();
//     })
// }

// export const NoParams = Template.bind({});
// NoParams.play = async ({canvasElement}) => {
//     const canvas = within(canvasElement);
//     userEvent.click(canvas.getByRole("button", { name: /calculate/i }))

//     await waitFor(()=> {
//         expect(canvasElement.querySelector('#result').innerText).toBe("Must fill out form")
//       })
// }

// export const TwoParams = Template.bind({});
// TwoParams.play = async ({canvasElement}) => {
//     const canvas = within(canvasElement);
//     const secondInput = await canvas.findByRole('textbox', { name: /second number/i });
//     userEvent.selectOptions(canvas.getByRole('combobox'), ["add"]);
//     userEvent.type(secondInput, '2')
//     userEvent.click(canvas.getByRole("button", { name: /calculate/i }))

//     await waitFor(()=> {
//         expect(canvasElement.querySelector('#result').innerText).toBe(`didn't receive expected params. got: add,,2`)
//     })
// }

// export const WrongParams = Template.bind({});
// WrongParams.play = async ({canvasElement}) => {
//     const canvas = within(canvasElement);
//     const firstInput = await canvas.findByRole('textbox', { name: /first number/i });
//     const secondInput = await canvas.findByRole('textbox', { name: /second number/i });
//     userEvent.type(firstInput, '?');
//     userEvent.selectOptions(canvas.getByRole('combobox'), ["add"]);
//     userEvent.type(secondInput, '!')
//     userEvent.click(canvas.getByRole("button", { name: /calculate/i }))

//     await waitFor(()=> {
//         expect(canvasElement.querySelector('#result').innerText).toBe(`didn't receive expected params. got: add,`)
//     })
// }
