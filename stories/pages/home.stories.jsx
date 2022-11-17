import Home from '../../pages/index'
import { within, userEvent, findByRole, waitFor } from '@storybook/testing-library';
import { rest } from 'msw';
import { expect } from '@storybook/jest';
import {action, actions} from '@storybook/addon-actions'

export default {
    title: "Pages/Home",
    component: Home,
};

const Template = (args) => <Home {...args} />

// export const HomePage = () => <Home/>;
export const HomePage = Template.bind({});
HomePage.parameters = {
    msw: {
        handlers: [
          rest.get('/api/calculate/*', (req, res, ctx) => {
            return res(ctx.status(200),ctx.json({ result: 3 }));
          }),
        ],
      },
};

export const FilledForm = Template.bind({});
FilledForm.parameters = {...HomePage.parameters};
FilledForm.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);

    // first number input
    const firstInput = await canvas.findByRole('textbox', { name: /first number/i });
    // second number input
    const secondInput = await canvas.findByRole('textbox', { name: /second number/i });
    
    // type into first number input
    userEvent.type(firstInput, '1');

    // select +
    userEvent.selectOptions(canvas.getByRole('combobox'), ["add"]);

    // type into second input
     userEvent.type(secondInput, '2')
    userEvent.click(canvas.getByRole("button", { name: /calculate/i }))
    await waitFor(() => {
        expect(canvasElement.querySelector('#result')).toBeInTheDocument();
    })

}