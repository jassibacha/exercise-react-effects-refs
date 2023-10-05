import React from 'react';
import { render } from '@testing-library/react';
import CardButton from './CardButton';

const props = {
    text: 'Test Button',
    className: 'TestButton',
    onClick: jest.fn(),
    disabled: false,
};

it('renders CardButton component without crashing', () => {
    render(<CardButton {...props} />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<CardButton {...props} />);
    expect(asFragment()).toMatchSnapshot();
});
