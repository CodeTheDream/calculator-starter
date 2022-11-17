import NonAmaz from '../../pages/nonAmaz'

export default {
    title: 'Pages/NonAmaz',
    component: NonAmaz,
};

const Template = (args) => <NonAmaz {...args} />

export const NonAmazingPage = Template.bind({});
NonAmazingPage.parameters = {};