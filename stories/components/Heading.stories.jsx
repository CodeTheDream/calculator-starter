import Heading from "../../components/Heading";

export default {
    title: 'Components/Heading',
    component: Heading,
    argTyps: {
        level: { control: "select"},
        children: { control: "text"},
        background: { control: 'color'},
    }
};

const Template = (args) => <Heading {...args} />

export const Default = Template.bind({});
Default.args = {
    children: "Heading (default)",
}

export const H2 = Template.bind({});
H2.decorators = [
    (Story) => (
        <div style={{ margin: '3em'}}>
          <Story />
        </div>
      ),
    ];
