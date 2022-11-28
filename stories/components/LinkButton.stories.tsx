import LinkButton from "../../components/LinkButton";
import { Meta, Story, ComponentMeta, ComponentStory } from "@storybook/react";

export default {
    title: 'Components/LinkButton',
    component: LinkButton,
    argTypes: {
        children: {control: 'text'},
        variant: { 
            options: ['contained', 'outlined', 'none'],
            control: 'select'},
        color: { control: 'radio'},
        //actions: ('onClick', 'onMouseOver'),
        onmouseover: {action: 'mouse over'}
    },
} as ComponentMeta<typeof LinkButton>;

const Template: ComponentStory<typeof LinkButton> = (args) => <LinkButton {...args}/>


//const Template = (args) => <LinkButton {...args}/>

export const Button = Template.bind({});
Button.args = {
    children: 'Button',
    path: '/nonAmaz',
    variant: "contained",
    color: 'primary'
}
// Button.parameters = {
//     nextRouter: {
//         path: "/nonAmaz",
//         asPath: "/nonAmaz",
//         query: {
//           //id: "nonAmaz",
//         },
//       },
// }