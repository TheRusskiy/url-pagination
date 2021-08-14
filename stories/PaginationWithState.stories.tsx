import { Meta, Story } from '@storybook/react';
import PaginationWithState, { Props } from './PaginationWithState';

const meta: Meta = {
  title: 'PaginationWithState',
  component: PaginationWithState,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = args => <PaginationWithState {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  total: 100
};
