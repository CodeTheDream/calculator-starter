import React from "react";
import { rest } from "msw";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import Calculator from "../../components/Calculator";

export default {
  title: "Components/Calculator",
  component: Calculator,
  parameters: {
    msw: {
      handlers: [
        rest.get("/api/calculate/*", (req, res, ctx) => {
          if (!req.params) {
            return res(ctx.status(500, "no params"));
          }

          const params = req.params[0].split("/");

          if (params.length !== 3 || isNaN(params[1]) || isNaN(params[2])) {
            return res(
              ctx.status(
                500,
                `didn't receive expected params. got: ${req.params}`
              )
            );
          }

          return res(
            ctx.json({
              result: "ok",
            })
          );
        }),
      ],
    },
  },
};

const Template = (args) => <Calculator />;

export const Default = Template.bind({});

export const InteractiveTest = Template.bind({});
InteractiveTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const form = canvasElement.querySelector("#calculator-form");
  userEvent.type(form.querySelector("#first"), "1");
  userEvent.type(form.querySelector("#second"), "2");
  userEvent.selectOptions(form.querySelector("#operation"), ["add"]);
  userEvent.click(canvas.getByRole("button"));

  await waitFor(() => {
    expect(canvasElement.querySelector("#result").innerText).toBe("ok");
  });
};

export const ErrorTest = Template.bind({});
ErrorTest.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const firstInput = await canvas.findByRole('textbox', { name: /first number/i });
    const secondInput = await canvas.findByRole('textbox', { name: /second number/i });
    userEvent.type(firstInput, 'a');
    userEvent.selectOptions(canvas.getByRole('combobox'), ["add"]);
    userEvent.type(secondInput, '2')
    userEvent.click(canvas.getByRole("button", { name: /calculate/i }))

    await waitFor(()=> {
        expect(canvasElement.querySelector('#result').innerText).toBe("Cannot convert object to primitive value")
    })
    await waitFor(()=> {
        expect(canvas.getByText("Cannot convert object to primitive value")).toBeInTheDocument();
    })
}