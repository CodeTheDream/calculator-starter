import Heading from "../../components/Heading";

export default {
    title: 'Components/Heading',
    component: Heading,
    argTyps: {
        level: { control: 'radio'},
        children: { control: "text"},
    }
};

const Template = (args) => <Heading {...args} />

export const Default = Template.bind({});
Default.args = {
    children: "Heading (default)"
}

export const H2 = Template.bind({});
// H2.args = {
//     children: "Heading (default)"
// }