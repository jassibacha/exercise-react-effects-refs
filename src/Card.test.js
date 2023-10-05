import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

const props = {
    id: '0',
    value: 'Ace',
    suit: 'Hearts',
    image: 'some-url',
    rotation: 0.5,
    topOffset: 10,
    leftOffset: 10,
    zIndex: 1,
};

it('renders Card component without crashing', () => {
    render(<Card {...props} />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<Card {...props} />);
    expect(asFragment()).toMatchSnapshot();
});
